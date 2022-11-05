import { Container, Heading, Text, useColorModeValue } from '@chakra-ui/react'

export const History = () => {
  return (
    <Container maxW="7xl">
      <Heading>History</Heading>
      <Text
        fontSize="xs"
        color={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}>
        Packages {`you've`} sent and received
      </Text>
    </Container>
  )
}
