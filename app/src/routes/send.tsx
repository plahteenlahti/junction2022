import { AtSignIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { DocumentData, where } from 'firebase/firestore'
import { useState } from 'react'
import { ParticipantCard } from '../components/ParticipantCard'
import { FirebaseCollection } from '../db/collections'
import { useCollection } from '../db/useCollection'

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

const userFound = (data: DocumentData[]): Participant | null => {
  if (!!data && data.length !== 0) {
    return data[0] as Participant
  }
  return null
}

export const Send = () => {
  const [userID, setUserID] = useState('')

  const { data, status } = useCollection(
    FirebaseCollection.Users,
    where('phone', '==', userID)
  )
  const user = userFound(data)

  console.log(user)

  return (
    <Container maxW="7xl">
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
            address={{
              city: 'Pori',
              country: 'asd',
              line1: 'as',
              line2: 'asd',
              postcode: 'asd'
            }}
          />
        </Box>

        <Box minWidth="sm" paddingX={3} marginTop={6}>
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
              address={user.address}
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
          justifyContent="center">
          <Checkbox colorScheme={useColorModeValue('brand', 'brandWhite')}>
            Receiver is paying for the delivery
          </Checkbox>
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
