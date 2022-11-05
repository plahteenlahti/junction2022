import { Box, Container, Heading, Text } from '@chakra-ui/react'
import ramen from '../assets/ramen.jpg'
import { Recipe } from '../components/Recipe'

export const Recipes = () => {
  return (
    <Container maxW="7xl">
      <Heading marginTop="12" marginBottom="12">
        Explore Recipes
      </Heading>
      <Recipe />
      <Recipe />
      <Recipe />
    </Container>
  )
}
