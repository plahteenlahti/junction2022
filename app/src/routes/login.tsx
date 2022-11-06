import { PhoneIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react'
import {
  browserSessionPersistence,
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  setPersistence,
  signInWithPhoneNumber
} from 'firebase/auth'
import { FormEventHandler, useEffect, useState } from 'react'
import AnimatedCheckmark, { MODES } from 'react-animated-checkmark'
import { useNavigate } from 'react-router-dom'
import PhoneNumberInput from '../components/PhoneNumberInput'

declare global {
  const grecaptcha: any // Amazing
}

export const Login = () => {
  const auth = getAuth()
  setPersistence(auth, browserSessionPersistence)

  const [authStageInfo, setAuthStageInfo] = useState<
    | { step: 'init' }
    | { step: 'phone'; verifier: RecaptchaVerifier }
    | { step: 'code'; confirmationCallback: ConfirmationResult }
    | { step: 'success' }
  >({ step: 'init' })
  const navigate = useNavigate()

  const [phoneNumber, setPhoneNumber] = useState('+421940837792')
  const [phoneNumberLoading, setPhoneNumberLoading] = useState(false)
  const [loaderState, setLoaderState] = useState(MODES.LOADING)
  useEffect(() => {
    let timeout: null | NodeJS.Timeout = null
    if (authStageInfo.step === 'success') {
      timeout = setTimeout(() => {
        setLoaderState(MODES.SUCCESS)
        setTimeout(() => {
          navigate('/send')
        }, 2000)
      }, 2000)
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [authStageInfo])

  const el = document.getElementById('sign-in-button')
  useEffect(() => {
    if (!el) return
    console.log('el', 'setting')
    setAuthStageInfo({
      step: 'phone',
      verifier: new RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'invisible'
        },
        auth
      )
    })
  }, [el])

  const sendCode: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if (authStageInfo.step !== 'phone') {
      return
    }
    setPhoneNumberLoading(true)
    signInWithPhoneNumber(auth, phoneNumber, authStageInfo.verifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        setAuthStageInfo({
          step: 'code',
          confirmationCallback: confirmationResult
        })
      })
      .catch(error => {
        authStageInfo.verifier.render().then(widgetId => {
          // eslint-disable-next-line no-undef
          grecaptcha.reset(widgetId)
        })
        console.log(error)
        // Error; SMS not sent
      })
      .finally(() => {
        setPhoneNumberLoading(false)
      })
  }

  const loginWithCode = async (verificationCode: string) => {
    if (authStageInfo.step !== 'code') {
      return
    }

    authStageInfo.confirmationCallback
      .confirm(verificationCode)
      .then(() => {
        setAuthStageInfo({ step: 'success' })
      })
      .catch(error => {
        // User couldn't sign in (bad verification code?)
        console.log(error)
      })
  }

  if (authStageInfo.step === 'init' || authStageInfo.step === 'phone') {
    return (
      <Container maxW="7xl" height="100%">
        <form onSubmit={sendCode}>
          <Heading marginY={6}>Ship My Pants</Heading>
          <Box width="100%">
            <Text
              marginBottom={2}
              fontSize="xs"
              color={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}>
              Login using your phone number
            </Text>
            <PhoneNumberInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              disabled={phoneNumberLoading}
              placeholder="Phone number"
            />
            <Button
              id="sign-in-button"
              marginTop={6}
              size="lg"
              colorScheme={useColorModeValue('brand', 'brandWhite')}
              width="100%"
              visibility={!phoneNumberLoading ? 'visible' : 'hidden'}
              disabled={phoneNumberLoading}
              type="submit">
              Login
            </Button>
          </Box>
        </form>
        {phoneNumberLoading && (
          <Container
            maxW="7xl"
            height="3xl"
            alignContent="center"
            display="flex"
            justifyContent="center">
            <AnimatedCheckmark mode={loaderState} />
          </Container>
        )}
      </Container>
    )
  }

  if (authStageInfo.step === 'code') {
    return (
      <Container maxW="7xl">
        <VStack spacing={4}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<PhoneIcon color="gray.300" />}
            />
            <Input
              value={phoneNumber}
              disabled
              type="text"
              placeholder="Phone number"
            />
          </InputGroup>

          <FormControl id="code" isRequired mb={2}>
            <Stack align="center">
              <HStack>
                <PinInput otp size="lg" onComplete={loginWithCode} autoFocus>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>

              <Text variant="body">
                Use the code received on your phone to sign in.
              </Text>
            </Stack>
          </FormControl>
        </VStack>
      </Container>
    )
  }

  return (
    <Container
      maxW="7xl"
      height="3xl"
      alignContent="center"
      display="flex"
      justifyContent="center">
      <AnimatedCheckmark mode={loaderState} />
    </Container>
  )
}
