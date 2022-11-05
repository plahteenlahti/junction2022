import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { getAuth } from 'firebase/auth'
import { where } from 'firebase/firestore'
import React from 'react'
import { FirebaseCollection } from '../db/collections'
import { useCollection } from '../db/useCollection'
import { ParticipantCard } from './ParticipantCard'

export const DeliveryNotification = () => {
  const auth = getAuth()
  const { onClose } = useDisclosure()
  const [sendingUser, setSendingUser] = useState()

  console.log('current user ', auth.currentUser?.uid)

  const { data, status } = useCollection(
    FirebaseCollection.Deliveries,
    where('status', '==', 'requested'),
    where('receiver_id', '==', auth.currentUser?.uid)
  )

  const onAcceptDelivery = () => {
    console.log('Accept')
  }

  return (
    <Modal
      blockScrollOnMount={false}
      closeOnOverlayClick={false}
      isOpen={true}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>You received a new delivery</ModalHeader>
        <ModalBody>
          You received a new delivery from:
          {/* <ParticipantCard /> */}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
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
