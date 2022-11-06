import { ChatIcon } from '@chakra-ui/icons'
import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { getAuth } from 'firebase/auth'
import { Link, useLocation } from 'react-router-dom'

export const TabBar = () => {
  const { pathname } = useLocation()
  const auth = getAuth()

  if (!auth.currentUser) return null

  return (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      paddingX={3}
      paddingY={6}
      borderTop="1px"
      borderColor={useColorModeValue('gray.100', 'gray.900')}
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
            <ChatIcon
              color={pathname === '/' ? 'gray.500' : 'CaptionText'}
              marginBottom="1"
            />
            <Text
              fontSize="xs"
              color={pathname === '/' ? 'gray.500' : 'CaptionText'}>
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
            <ChatIcon
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
