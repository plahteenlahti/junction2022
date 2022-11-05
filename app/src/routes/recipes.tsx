import { Box, Container, Heading, Text } from '@chakra-ui/react'
import ramen from '../assets/ramen.jpg'
import { Recipe } from '../components/Recipe'

export const Recipes = () => {
  return (
    <Container maxW="7xl">
      <Heading marginTop="12" marginBottom="12">
        Explore Recipes
      </Heading>
      <Box rounded="xl" padding="3" backgroundColor="blackAlpha.800">
        <Text color="whiteAlpha.800">I want to ship my self instead</Text>
        <Text>I want to ship my self instead</Text>
      </Box>
      <Recipe />
      <Recipe />
      <Recipe />
    </Container>
  )
}
