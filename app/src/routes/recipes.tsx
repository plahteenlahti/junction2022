import { Box, Container, Heading, Text } from '@chakra-ui/react'
import ramen from '../assets/ramen.jpg'

export const Recipes = () => {
  return (
    <Container maxW="7xl">
      <Heading marginBottom="12">Explore Recipes</Heading>

      <Box
        height="sm"
        backgroundImage={ramen}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        paddingBottom="3"
        rounded="2xl">
        <Box
          backdropFilter="auto"
          rounded="xl"
          padding="12px"
          backdropBlur="md">
          <Text>Spicy Ramen with Mixin Sea Food</Text>
          <Text size="">Order now you dirty peasant</Text>
        </Box>
      </Box>
    </Container>
  )
}
