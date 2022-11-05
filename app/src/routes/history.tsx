import {
  Box,
  Code,
  Container,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { where } from 'firebase/firestore'
import { FirebaseCollection } from '../db/collections'
import { useCollection } from '../db/useCollection'
import { Delivery } from '../types'

type Status = 'loading' | 'error' | 'success'

export const History = () => {
  const { data: received, status: receivedStatus } = useCollection<Delivery>(
    FirebaseCollection.Deliveries,
    where('receiver_id', '==', 'receiver-user-id')
  )

  const { data: sent, status: sentStatus } = useCollection<Delivery>(
    FirebaseCollection.Deliveries,
    where('sender_id', '==', 'receiver-user-id')
  )

  console.log(received)

  return (
    <Container maxW="7xl">
      <Heading marginBottom={2}>History</Heading>
      <Text
        fontSize="sm"
        color={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}>
        Packages {`you've`} sent and received
      </Text>

      {received?.map((item, key) => (
        <Box
          key={`${item.receiver_id}_${item.deliver_time}_${item.est_deliver_time}_${key}`}>
          <Code whiteSpace="pre">{JSON.stringify(item, undefined, 4)}</Code>
        </Box>
      ))}
    </Container>
  )
}
