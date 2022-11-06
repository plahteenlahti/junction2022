import { EditIcon, QuestionIcon } from '@chakra-ui/icons'
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'

type Props = {
  address?: {
    city?: string | null
    country?: string | null
    line1?: string | null
    line2?: string | null
    postcode?: string | null
  } | null
  email?: string | null
  phone?: string | null
  onEdit?: () => void
  editable?: boolean
}

export const ParticipantCard = ({
  address,
  phone,
  onEdit,
  editable = false
}: Props) => {
  const fontColor = useColorModeValue('blackAlpha.700', 'whiteAlpha.600')
  const fontColor2 = useColorModeValue('blackAlpha.600', 'whiteAlpha.600')

  return (
    <Box boxShadow="md" padding={3} rounded="md">
      <Flex flexDirection="row" alignItems="center">
        <QuestionIcon color="gray.300" marginRight="2.5" />
        <Box>
          <Text
            fontSize="sm"
            color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}>
            {phone}
          </Text>
          {address && (
            <>
              <Text fontSize="sm" color={fontColor}>
                {address.city}, {address.postcode}
              </Text>
              <Text fontSize="sm" color={fontColor}>
                {address.line1}, {address.line2}
              </Text>
              <Text fontSize="xs" color={fontColor2} marginBottom="2">
                {address.country}
              </Text>
            </>
          )}
        </Box>
        {editable && (
          <EditIcon
            onClick={() => onEdit?.()}
            color="gray.300"
            marginRight="2.5"
          />
        )}
      </Flex>
    </Box>
  )
}
