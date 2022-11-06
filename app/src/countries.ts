import codes from 'country-calling-code'

export const countryOptions = codes.map(({ country, isoCode3 }) => ({
  label: country,
  value: isoCode3
}))

export const getCountryTelCode = (countryIsoCode: string) =>
  codes.find(({ isoCode3 }) => isoCode3 === countryIsoCode)?.countryCodes[0]

export const getCountryIsoCode = (telephoneNumber: string) => {
  const fiveNumberTelCode = telephoneNumber.slice(1, 6)
  const fourNumberTelCode = telephoneNumber.slice(1, 5)
  const threeNumberTelCode = telephoneNumber.slice(1, 4)
  const twoNumberTelCode = telephoneNumber.slice(1, 3)

  const country = codes.find(
    ({ countryCodes }) =>
      countryCodes.includes(fiveNumberTelCode) ||
      countryCodes.includes(fourNumberTelCode) ||
      countryCodes.includes(threeNumberTelCode) ||
      countryCodes.includes(twoNumberTelCode)
  )

  return country?.isoCode3
}

export { codes }
