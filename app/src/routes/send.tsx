import { AtSignIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Switch,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { where } from 'firebase/firestore'
import { ParticipantCard } from '../components/ParticipantCard'
import { FirebaseCollection } from '../db/collections'
import { useCollection } from '../db/useCollection'
import { User } from '../types'
import { getAuth } from 'firebase/auth'
import { RefObject, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlacesWidget } from 'react-google-autocomplete'
import { useWriteData } from '../db/useWriteData'
import { useDoc } from '../db/useDoc'

type Participant = {
  address: {
    city: string
    country: string
    line1: string
    line2: string
    postcode: string
  }
  email: string
  phone: string
  id: string
}

const receiverFound = (data: User[] | undefined): Participant | null => {
  if (!!data && data.length !== 0) {
    return data[0] as Participant
  }
  return null
}

type AddressType =
  | 'country'
  | 'street_number'
  | 'route'
  | 'locality'
  | 'postal_code'
type AddressComponent = {
  long_name: string
  short_name: string
  types: AddressType[]
}

const parseAddress = (array: AddressComponent[]) => {
  return {
    country: array.find(f => f.types?.find(t => t === 'country'))?.long_name,
    street_number: array.find(f => f.types?.find(t => t === 'street_number'))
      ?.long_name,
    route: array.find(f => f.types?.find(t => t === 'route'))?.long_name,
    locality: array.find(f => f.types?.find(t => t === 'locality'))?.long_name,
    postal_code: array.find(f => f.types?.find(t => t === 'postal_code'))
      ?.long_name
  }
}

export const Send = () => {
  const auth = getAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/')
    }
  }, [])

  // receiverID to search
  const [receiverID, setUserID] = useState('')
  const { data, status } = useCollection<User>(
    FirebaseCollection.Users,
    where('phone', '==', receiverID)
  )
  const receiver = receiverFound(data)

  const user = useDoc<User>(
    FirebaseCollection.Users,
    `${auth.currentUser?.uid}`
  )

  const writeData = useWriteData<User>(FirebaseCollection.Users)

  const { ref }: { ref: RefObject<HTMLInputElement> } = usePlacesWidget({
    apiKey: 'AIzaSyBQzFH-bsHHN7xZWQC0f-vp2XRqN8mEY0U',
    onPlaceSelected: place => {
      const address = parseAddress(place.address_components)
      writeData(`${auth.currentUser?.uid}`, {
        phone: auth.currentUser?.phoneNumber,
        address: {
          country: address.country ?? '',
          city: address.locality ?? '',
          postcode: address.postal_code ?? '',
          line1: `${address.route ?? ''} ${address.street_number ?? ''}`
        }
      })
      setEditMode(false)
    },
    options: {
      types: ['address']
    }
  })

  const [sourceAddressSearch, setSourceAddressSearch] = useState('')
  const [editMode, setEditMode] = useState(false)
  const lightTextColor = useColorModeValue('blackAlpha.600', 'whiteAlpha.600')

  const onSend = () => {
    if (!receiver) return
    navigate(`/send/confirm?receiver_id=${receiver.id}`)
  }

  return (
    <Container maxW="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column">
        <Box minWidth="sm" paddingX={3} marginTop={6}>
          <Text marginBottom={2} fontSize="xs" color={lightTextColor}>
            Sending from
          </Text>

          {user.data?.address && !editMode && (
            <ParticipantCard
              email="perttu@lahteenlahti.com"
              phone="0503134326"
              address={{
                country: user.data?.address?.country ?? '',
                city: user.data?.address?.city ?? '',
                postcode: user.data?.address?.postcode ?? '',
                line1: user.data?.address?.line1 ?? '',
                line2: user.data?.address?.line2 ?? ''
              }}
              editable={!!user.data?.address}
              onEdit={() => setEditMode(!editMode)}
            />
          )}

          <InputGroup
            style={
              !user.data?.address || editMode
                ? {}
                : {
                    visibility: 'hidden'
                  } /** Need to keep this rendered because we can't lose the ref */
            }>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              value={sourceAddressSearch}
              ref={ref}
              onChange={e => setSourceAddressSearch(e.target.value)}
              type="text"
              placeholder="Pickup address"
            />
          </InputGroup>
        </Box>

        <Box minWidth="sm" maxW="" paddingX={3} marginTop={6}>
          <Text marginBottom={2} fontSize="xs" color={lightTextColor}>
            Deliver to
          </Text>

          {!receiver ? (
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={
                  status === 'loading' ? (
                    <Spinner size="xs" />
                  ) : (
                    <AtSignIcon color="gray.300" />
                  )
                }
              />
              <Input
                type="text"
                placeholder="Phone number"
                onChange={e => setUserID(e.target.value)}
              />
            </InputGroup>
          ) : (
            <ParticipantCard email={receiver.email} phone={receiver.phone} />
          )}
        </Box>
      </Box>

      <Box
        marginTop={32}
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end">
        <Box
          flexDirection="row"
          display="flex"
          marginBottom={4}
          alignItems="center"
          justifyContent="center">
          <Switch colorScheme={useColorModeValue('brand', 'brandWhite')}>
            Receiver is paying for the delivery
          </Switch>
        </Box>
        <Button
          size="lg"
          colorScheme={useColorModeValue('brand', 'brandWhite')}
          width="100%"
          onClick={onSend}>
          Send
        </Button>
      </Box>
    </Container>
  )
}
