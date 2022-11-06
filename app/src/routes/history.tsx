import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import {
  Container,
  Heading,
  HStack,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
  Link
} from '@chakra-ui/react'
import { getAuth } from 'firebase/auth'
import { where } from 'firebase/firestore'
import { DateTime } from 'luxon'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FirebaseCollection } from '../db/collections'
import { useCollection } from '../db/useCollection'
import { Delivery, DeliveryStatus } from '../types'

type DeliveryType = 'sending' | 'receiving'
const getDeliveryStatusText = (
  status: DeliveryStatus,
  type: DeliveryType,
  etaPickup?: string,
  etaDelivery?: string
): string => {
  switch (status) {
    case 'created':
      return 'Pending acceptance'
    case 'accepted':
      return 'Accepted'
    case 'ordered':
      if (type === 'sending')
        return `Estimated pickup ${etaPickup ?? 'at an unknown time'}`
      return 'Pending shipment'
    case 'shipped':
      if (type === 'receiving')
        return `Estimated delivery ${etaDelivery ?? 'at an unknown time'}`
      return 'Shipped'
    case 'delivered':
      return `Delivered ${etaDelivery ?? 'at an unknown time'}`
    case 'rejected':
      return 'Rejected'
    case 'error':
      return 'Error'
    default:
      return 'Unknown status'
  }
}

const formatTime = (timeString: string) => {
  const time = DateTime.fromISO(timeString.split('Z')[0])
  if (DateTime.now().diff(time).days >= -1)
    return time.toLocaleString(DateTime.DATE_SHORT)
  return time.toLocaleString(DateTime.TIME_SIMPLE)
}

const getItem = (d: Delivery, userId: string) => {
  const sent = d.sender_id === userId
  const pickupEta = d.pickup_eta ? formatTime(d.pickup_eta) : undefined
  const dropoffEta = d.deliver_eta ? formatTime(d.deliver_eta) : undefined
  const trackingUrl = d.woltDetails?.trackingUrl

  const contents = (
    <HStack
      key={d.deliver_eta}
      _hover={trackingUrl ? { cursor: 'pointer' } : undefined}
      p={2}
      py={4}
      borderWidth={1}
      borderRadius={3}
      borderColor={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}>
      {sent ? <ArrowUpIcon /> : <ArrowDownIcon />}
      <Text fontSize="sm">{d.description}</Text>
      <Text
        flex={1}
        textAlign="end"
        fontSize="xs"
        color={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}>
        {getDeliveryStatusText(
          d.status,
          sent ? 'sending' : 'receiving',
          pickupEta,
          dropoffEta
        )}
      </Text>
    </HStack>
  )

  return trackingUrl ? (
    <Link href={trackingUrl} isExternal>
      {contents}
    </Link>
  ) : (
    contents
  )
}

export const History = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/')
    }
  }, [])

  const userId = auth.currentUser?.uid ?? ''

  const { data: received } = useCollection<Delivery>(
    FirebaseCollection.Deliveries,
    where('receiver_id', '==', userId)
  )

  const { data: sent } = useCollection<Delivery>(
    FirebaseCollection.Deliveries,
    where('sender_id', '==', userId)
  )

  const loading = !sent || !received

  const allData = (received ?? []).concat(sent ?? [])

  return (
    <Container maxW="7xl">
      <Heading marginBottom={2}>Deliveries</Heading>
      <Text
        fontSize="sm"
        color={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}
        marginBottom={'20px'}>
        Packages {`you've`} sent and received
      </Text>

      {!!loading && <Skeleton height="400px" />}

      {!loading && !!allData.length && (
        <Stack>{allData.map(d => getItem(d, userId))}</Stack>
      )}

      {!loading && !allData.length && (
        <Text fontSize="m" marginTop="50px">
          Nothing here yet
        </Text>
      )}

      {/* {received?.map((item, key) => (
        <Box key={`${item.receiver_id}_${item.pickup_eta}_${key}`}>
          <Code whiteSpace="pre">{JSON.stringify(item, undefined, 4)}</Code>
        </Box>
      ))} */}
    </Container>
  )
}
