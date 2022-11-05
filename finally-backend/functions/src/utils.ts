import { Address } from './types'

export const stringifyAddress = (address: Address): string =>
  [
    address.line1,
    address.line2,
    address.postcode,
    address.city,
    address.country,
  ].join(' ')
