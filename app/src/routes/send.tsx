import { AtSignIcon, QuestionIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

export const Send = () => {
  return (
    <Container maxW="7xl" height="60%">
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

          <Box boxShadow="md" padding={3} rounded="md">
            <Text
              fontSize="xs"
              color={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}
              marginBottom="2">
              Home
            </Text>
            <Flex flexDirection="row" alignItems="center">
              <QuestionIcon color="gray.300" marginRight="2.5" />
              <Text
                color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}>
                Otakaari 24, 02150 Espoo
              </Text>
            </Flex>
          </Box>
        </Box>

        <Box minWidth="sm" paddingX={3} marginTop={6}>
          <Text
            marginBottom={2}
            fontSize="xs"
            color={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}>
            Deliver to
          </Text>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AtSignIcon color="gray.300" />}
            />
            <Input type="text" placeholder="Phone number" />
          </InputGroup>
        </Box>
      </Box>

      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end">
        <Box flexDirection="row" display="flex" marginBottom={2}>
          <Checkbox colorScheme="brand" defaultChecked>
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
