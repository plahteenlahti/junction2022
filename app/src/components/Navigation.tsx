import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Stack,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'

export const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Box bg={useColorModeValue('white.100', 'brand')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex>
            <Stack direction={'row'}>
              {/* <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}>
                  <Avatar size={'sm'} name="Perttu Lähteenlahti" />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar size={'2xl'} name="Perttu Lähteenlahti" />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu> */}
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
