import { QuestionIcon } from '@chakra-ui/icons'
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'

type Props = {
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

export const ParticipantCard = ({
  address: { city, country, line1, line2, postcode },
  phone
}: Props) => {
  return (
    <Box boxShadow="md" padding={3} rounded="md">
      <Text
        fontSize="xs"
        color={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}
        marginBottom="2">
        {country}
      </Text>
      <Flex flexDirection="row" alignItems="center">
        <QuestionIcon color="gray.300" marginRight="2.5" />
        <Box>
          <Text
            fontSize="sm"
            color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}>
            {phone}
          </Text>
          <Text
            fontSize="sm"
            color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}>
            {city},{postcode}
          </Text>
          <Text
            fontSize="sm"
            color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}>
            {line1},{line2}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}
