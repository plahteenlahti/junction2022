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
}

const userFound = (data: User[] | undefined): Participant | null => {
  if (!!data && data.length !== 0) {
    return data[0] as Participant
  }
  return null
}

export const Send = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/')
    }
  }, [])

  // userID to search
  const [userID, setUserID] = useState('')
  const { data, status } = useCollection<User>(
    FirebaseCollection.Users,
    where('phone', '==', userID)
  )
  const user = userFound(data)

  const { ref }: { ref: RefObject<HTMLInputElement> } = usePlacesWidget({
    apiKey: 'AIzaSyBQzFH-bsHHN7xZWQC0f-vp2XRqN8mEY0U',
    onPlaceSelected: place => {
      setSourceAddressComponents(
        place.address_components.map((x: { long_name: string }) => x.long_name)
      )
    },
    options: {
      types: ['address']
    }
  })

  const [sourceAddressSearch, setSourceAddressSearch] = useState('')
  const [sourceAddressComponents, setSourceAddressComponents] = useState<
    string[] | undefined
  >()

  return (
    <Container maxW="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column">
        <Box minWidth="sm" paddingX={3} marginTop={6}>
          <Text
            marginBottom={2}
            fontSize="xs"
            color={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}>
            Sending from
          </Text>

          <ParticipantCard
            email="perttu@lahteenlahti.com"
            phone="0503134326"
            address={
              sourceAddressComponents
                ? {
                    city: sourceAddressComponents[2],
                    country: sourceAddressComponents[3],
                    line1: sourceAddressComponents[0],
                    line2: sourceAddressComponents[1],
                    postcode: sourceAddressComponents[4]
                  }
                : undefined
            }
            editable={sourceAddressComponents ? true : false}
            onEdit={() => setSourceAddressComponents(undefined)}
          />

          <InputGroup
            style={
              sourceAddressComponents
                ? { visibility: 'hidden' }
                : {} /** Need to keep this rendered because we can't lose the ref */
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
          <Text
            marginBottom={2}
            fontSize="xs"
            color={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}>
            Deliver to
          </Text>

          {!user ? (
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
            <ParticipantCard
              email={user.email}
              phone={user.phone}
              // address={user.address}
            />
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
          width="100%">
          Send
        </Button>
      </Box>
    </Container>
  )
}
