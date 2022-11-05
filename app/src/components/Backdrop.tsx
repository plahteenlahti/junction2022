import { Box, useColorMode } from '@chakra-ui/react'
import React from 'react'

export const Backdrop: React.FC<React.PropsWithChildren> = () => {
  const { colorMode } = useColorMode()

  const gradient =
    colorMode === 'light'
      ? 'linear(to-br, brandWhite.100, brandWhite.100, gray.200, brandWhite.100, gray.200)'
      : 'linear(to-br, brand.100, brand.100, gray.900, brand.100, gray.900)'

  return (
    <>
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient={gradient}
        zIndex={-999}
        backdropFilter="auto"
        backdropBlur="50px"
        blur="10px"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex={-998}
        backdropFilter="auto"
        backdropBlur="999px"
        backgroundColor="whiteAlpha.50"
      />
    </>
  )
}
