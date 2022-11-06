import React, { useState } from 'react'
import {
  Button,
  Container,
  Text,
  Textarea,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import { useQueryParams } from '../utils/useQueryParams'
import { useDoc } from '../db/useDoc'
import { FirebaseCollection } from '../db/collections'
import { Delivery, User } from '../types'
import { nanoid } from 'nanoid/non-secure'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { useWriteData } from '../db/useWriteData'

export default function SendConfirm() {
  const queryParams = useQueryParams()
  const auth = getAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const receiverId = queryParams.get('receiver_id') ?? ''
  const { data: receivingUser } = useDoc<User>(
    FirebaseCollection.Users,
    receiverId
  )
  const [productDescription, setProductDescription] = useState('')
  const createDelivery = useWriteData(FirebaseCollection.Deliveries)

  const onSend = () => {
    const userId = auth.currentUser?.uid
    const delivery: Partial<Delivery> = {
      description: productDescription,
      receiver_id: receiverId,
      sender_id: userId,
      paying_user_id: userId,
      status: 'created'
    }

    createDelivery(nanoid(), delivery).then(() => {
      navigate('/send')
      toast({
        title: 'Delivery request sent!',
        description: 'Please hold on while the recipient reviews your request.',
        status: 'success',
        duration: 8000,
        isClosable: true
      })
    })
  }

  return (
    <Container maxW="sm">
      <Text fontSize="xl" marginBottom={4}>
        Create new order for {receivingUser?.phone}
      </Text>
      <Text fontStyle="sm" opacity={0.5} marginBottom={2}>
        Describe what you are delivering
      </Text>
      <Textarea
        marginBottom={4}
        placeholder="Board games"
        onChange={e => setProductDescription(e.target.value)}
      />
      <Button
        size="lg"
        colorScheme={useColorModeValue('brand', 'brandWhite')}
        width="100%"
        onClick={onSend}>
        Send
      </Button>
    </Container>
  )
}
