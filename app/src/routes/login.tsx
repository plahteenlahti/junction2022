import { PhoneIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  FormControl,
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
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth'
import { FormEventHandler, useEffect, useState } from 'react'
import AnimatedCheckmark, { MODES } from 'react-animated-checkmark'
import { useNavigate } from 'react-router-dom'

declare global {
  const grecaptcha: any // Amazing
}

export const Login = () => {
  const auth = getAuth()

  const [authStageInfo, setAuthStageInfo] = useState<
    | { step: 'init' }
    | { step: 'phone'; verifier: RecaptchaVerifier }
    | { step: 'code'; confirmationCallback: ConfirmationResult }
    | { step: 'success' }
  >({ step: 'init' })
  const navigate = useNavigate()

  const [phoneNumber, setPhoneNumber] = useState('+358')
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
    signInWithPhoneNumber(auth, phoneNumber, authStageInfo.verifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        setAuthStageInfo({
          step: 'code',
          confirmationCallback: confirmationResult
        })
      })
      .catch(() => {
        authStageInfo.verifier.render().then(widgetId => {
          // eslint-disable-next-line no-undef
          grecaptcha.reset(widgetId)
        })
        // Error; SMS not sent
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
      <form onSubmit={sendCode}>
        <Container maxW="7xl">
          <Box minWidth="sm" padding={6}>
            <Text
              marginBottom={2}
              fontSize="xs"
              color={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}>
              Login using your phone number
            </Text>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<PhoneIcon color="gray.300" />}
              />
              <Input
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                type="text"
                placeholder="Phone number"
              />
            </InputGroup>
            <Button
              id="sign-in-button"
              marginTop={2}
              colorScheme="blue"
              variant="solid"
              type="submit">
              Send
            </Button>
          </Box>
        </Container>
      </form>
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
    <Container maxW="7xl" alignContent={'center'}>
      <AnimatedCheckmark mode={loaderState} />
    </Container>
  )
}