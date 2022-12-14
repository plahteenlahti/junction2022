import { RepeatClockIcon, StarIcon } from '@chakra-ui/icons'
import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { useFBAuth } from './BehindAuth'

export const TabBar = () => {
  const { pathname } = useLocation()
  const { isSignedIn } = useFBAuth()

  const borderColor = useColorModeValue('gray.100', 'gray.900')
  const background = useColorModeValue('brandWhite.100', 'brand.100')
  if (!isSignedIn) return null

  return (
    <Box
      position="fixed"
      backgroundColor={background}
      bottom={0}
      left={0}
      right={0}
      paddingX={3}
      paddingY={6}
      borderTop="1px"
      borderColor={borderColor}
      display="flex"
      flexDirection="row">
      <Box flex="1">
        <Link to="/send">
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            <StarIcon
              color={
                pathname === '/' || pathname === '/send'
                  ? 'gray.500'
                  : 'CaptionText'
              }
              marginBottom="1"
            />
            <Text
              fontSize="xs"
              color={
                pathname === '/' || pathname === '/send'
                  ? 'gray.500'
                  : 'CaptionText'
              }>
              Send
            </Text>
          </Box>
        </Link>
      </Box>
      <Box flex="1">
        <Link to="/history">
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            <RepeatClockIcon
              color={pathname === '/history' ? 'gray.500' : 'CaptionText'}
              marginBottom="1"
            />
            <Text
              fontSize="xs"
              color={pathname === '/history' ? 'gray.500' : 'CaptionText'}>
              History
            </Text>
          </Box>
        </Link>
      </Box>
    </Box>
  )
}
