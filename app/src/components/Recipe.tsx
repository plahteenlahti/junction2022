import React from 'react'
import { Box, Container, Heading, Text } from '@chakra-ui/react'
import ramen from '../assets/ramen.jpg'

export const Recipe = () => {
  return (
    <Box
      height="sm"
      maxWidth="sm"
      width="100%"
      backgroundImage={ramen}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      padding="4"
      marginBottom="4"
      rounded="2xl"
      display="flex"
      alignItems="end">
      <Box
        backgroundColor="whiteAlpha.50"
        backdropFilter="auto"
        rounded="xl"
        padding="12px"
        backdropBlur="xl"
        width="100%">
        <Text fontSize="sm" marginBottom="1" color="white">
          Spicy Ramen with Mixin Sea Food
        </Text>
        <Text color="whiteAlpha.700" fontSize="xs">
          Order now you dirty peasant
        </Text>
      </Box>
    </Box>
  )
}
