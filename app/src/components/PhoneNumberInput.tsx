import React, { useState } from 'react'
import {
  Box,
  Flex,
  Input,
  Select,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'
import Flag from 'react-world-flags'
import { getCountryTelCode, getCountryIsoCode, codes } from '../countries'
import { ChevronDownIcon, PhoneIcon } from '@chakra-ui/icons'

type Props = {
  value: string
  // eslint-disable-next-line no-unused-vars
  onChange: (_: string) => void
  placeholder: string
}

export default function PhoneNumberInput({
  value,
  onChange,
  placeholder
}: Props) {
  const [number, setNumber] = useState(value || '+358')
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    'FIN'
  )

  const onCountryChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    const value = e.target.value
    setSelectedCountry(value)
    const telCode = getCountryTelCode(value)
    telCode && setNumber('+' + telCode)
    onChange(value)
  }

  const onPhoneNumberChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const value = e.target.value
    setNumber(value)
    setSelectedCountry(getCountryIsoCode(value))
    onChange(value)
  }

  return (
    <InputGroup>
      <InputLeftElement width="4rem" height="100%">
        <Select
          opacity={0}
          icon={<></>}
          position="absolute"
          value={selectedCountry}
          onChange={onCountryChange}>
          <option value="" />
          {codes.map(country => (
            <option key={country.isoCode3} value={country.isoCode3}>
              {country.country}
            </option>
          ))}
        </Select>
        <Flex pl={2} width="100%" alignItems="center">
          <Box mr="4px" width="100%" flex={1}>
            <Flag
              code={selectedCountry}
              fallback={<PhoneIcon width="100%" height="1.25em" pb={1} />}
            />
          </Box>

          <ChevronDownIcon />
        </Flex>
      </InputLeftElement>
      <Input
        pl="4rem"
        type="text"
        value={number}
        placeholder={placeholder}
        onChange={onPhoneNumberChange}
      />
    </InputGroup>
  )
}
