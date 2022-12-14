import { Wolt, WoltSecrets } from './types'
import got, { HTTPError } from 'got'

const BASE_URL = `https://daas-public-api.development.dev.woltapi.com/merchants`

export const getDeliveryFee = async (
  secrets: WoltSecrets,
  pickupAddress: string,
  dropoffAddress: string,
  dropoffTime?: string
) => {
  const body: Wolt.DeliveryFeeRequestPayload = {
    pickup: {
      location: {
        formatted_address: pickupAddress,
      },
    },
    dropoff: {
      location: {
        formatted_address: dropoffAddress,
      },
    },
    scheduled_dropoff_time: dropoffTime,
  }

  try {
    const response = await got.post(
      `${BASE_URL}/${secrets.merchantId}/delivery-fee`,
      {
        headers: { Authorization: `Bearer ${secrets.apiToken}` },
        json: body,
      }
    )
    return {
      status: 'ok' as const,
      response: JSON.parse(response.body) as Wolt.DeliveryFeeResponse,
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      return {
        status: 'error' as const,
        response: JSON.parse(
          error.response.body as string
        ) as Wolt.VenuelessDeliveryPublicApiErrorResponse,
      }
    }
    throw error
  }
}

export const createDeliveryOrder = async (
  secrets: WoltSecrets,
  pickupAddress: string,
  dropoffAddress: string,
  pickupContact: Wolt.ContactDetails,
  dropoffContact: Wolt.ContactDetails,
  customerSupport: Wolt.CustomerSupport,
  contents: Wolt.Content[],
  dropoffTime?: string
  // eslint-disable-next-line max-params
) => {
  const body: Wolt.DeliveryOrderRequestPayload = {
    pickup: {
      location: {
        formatted_address: pickupAddress,
      },
      contact_details: pickupContact,
    },
    dropoff: {
      location: {
        formatted_address: dropoffAddress,
      },
      contact_details: dropoffContact,
    },
    customer_support: customerSupport,
    scheduled_dropoff_time: dropoffTime,
    contents,

    tips: [],
    is_no_contact: false,
    min_preparation_time_minutes: 0,
  }

  try {
    const response = await got.post(
      `${BASE_URL}/${secrets.merchantId}/delivery-order`,
      {
        headers: { Authorization: `Bearer ${secrets.apiToken}` },
        json: body,
      }
    )
    return {
      status: 'ok' as const,
      response: JSON.parse(response.body) as Wolt.DeliveryOrderResponse,
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      return {
        status: 'error' as const,
        response: JSON.parse(
          error.response.body as string
        ) as Wolt.VenuelessDeliveryPublicApiErrorResponse,
      }
    }
    throw error
  }
}
