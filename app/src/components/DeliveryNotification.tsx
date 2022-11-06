import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { getAuth } from 'firebase/auth'
import { doc, getDoc, updateDoc, where } from 'firebase/firestore'
import ky from 'ky'
import { useEffect, useState } from 'react'
import { useFirestore } from 'reactfire'
import { FirebaseCollection } from '../db/collections'
import { useCollection } from '../db/useCollection'
import { Delivery, User } from '../types'
import { ParticipantCard } from './ParticipantCard'

type DeliveryRequest = {
  id: string
  description: string
  estTimeOfArrival: string
  isPaying: boolean
  cost: number
  currency: string
}

export const DeliveryNotification = () => {
  const auth = getAuth()
  const firestore = useFirestore()
  const { onClose, onOpen, isOpen } = useDisclosure()
  const [sendingUser, setSendingUser] = useState<User>()
  const [deliveryRequest, setDeliveryRequest] = useState<DeliveryRequest>()

  const { data } = useCollection<Delivery>(
    FirebaseCollection.Deliveries,
    where('status', '==', 'created'),
    where('receiver_id', '==', `${auth.currentUser?.uid}`)
  )

  useEffect(() => {
    if (!data?.length) return

    const delivery = data[0]
    const estTimeOfArrival = delivery.pickup_eta
      ? new Date(delivery.pickup_eta).toLocaleString()
      : 'TBA'
    const isPaying = delivery.paying_user_id === auth.currentUser?.uid

    setDeliveryRequest({
      id: delivery.id,
      description: delivery.description,
      estTimeOfArrival,
      isPaying,
      cost: (delivery.woltDetails?.feeAmount || 0) / 1000,
      currency: delivery.woltDetails?.feeCurrency || ''
    })

    const sendingUserDocRef = doc(
      firestore,
      FirebaseCollection.Users,
      delivery.sender_id
    )

    getDoc(sendingUserDocRef).then(doc => {
      setSendingUser(doc.data() as User)
    })

    onOpen()
  }, [data])

  const onAcceptDelivery = () => {
    if (!deliveryRequest) return

    updateDoc(
      doc(firestore, FirebaseCollection.Deliveries, deliveryRequest.id),
      {
        status: 'accepted'
      }
    ).then(() => {
      console.log('Posting to wolt')
      ky.post(
        'https://europe-west3-ship-me-fresh.cloudfunctions.net/orders/confirm/' +
          deliveryRequest.id
      )
    })

    onClose()
  }

  const onDeclineDelivery = () => {
    if (!deliveryRequest) return

    updateDoc(
      doc(firestore, FirebaseCollection.Deliveries, deliveryRequest.id),
      {
        status: 'rejected'
      }
    )
    onClose()
  }

  return (
    <Modal
      blockScrollOnMount={false}
      closeOnOverlayClick={false}
      isCentered
      isOpen={isOpen}
      onClose={onDeclineDelivery}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>You received a new delivery request</ModalHeader>
        <ModalBody>
          <>
            <Box marginBottom={4}>
              <Text fontSize="sm" opacity={0.5}>
                You received a new delivery from:
              </Text>
              {sendingUser && <ParticipantCard {...sendingUser} />}
            </Box>
            <Box marginBottom={4}>
              <Text fontSize="sm" opacity={0.5}>
                Estimated time of arrival:
              </Text>
              <Text>{deliveryRequest?.estTimeOfArrival}</Text>
            </Box>
            {deliveryRequest?.isPaying && (
              <Box marginBottom={4}>
                <Text fontSize="sm" opacity={0.5}>
                  You were requested to pay for the delivery:
                </Text>
                <Text>
                  {deliveryRequest?.cost} {deliveryRequest.currency}
                </Text>
              </Box>
            )}
            <Box>
              <Text fontSize="sm" opacity={0.5}>
                Description:
              </Text>
              <Text>{deliveryRequest?.description}</Text>
            </Box>
          </>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onDeclineDelivery} marginRight={4}>
            Decline delivery
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onAcceptDelivery}>
            Accept delivery
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
