import { Box } from '@chakra-ui/react'
import Map from 'react-map-gl'

export const OrderConfirmed = () => {
  return (
    <Box>
      <Map
        initialViewState={{
          longitude: 24.9384,
          latitude: 60.1699,
          zoom: 12
        }}
        style={{ width: '100%', height: '78vh' }}
        mapStyle="mapbox://styles/tobiashelsing/cla3wco0e00ep15s21gh789s8"
        mapboxAccessToken="pk.eyJ1IjoidG9iaWFzaGVsc2luZyIsImEiOiJjbGEzdnF0em8wZWZrM25vN2xqdWZmb3ZwIn0.x2U0j5Pj8eted4WW7XazEA"
      />
    </Box>
  )
}
