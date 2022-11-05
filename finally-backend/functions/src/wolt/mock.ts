import { previewDelivery } from '.'
import { WoltSecrets } from './types'

const TO_ADDRESS = 'Otakaari 24, 02150 Espoo'
const FROM_ADDRESS = 'Veturitallinkuja, 00520 Helsinki'

export const mockPreviewDelivery = async (secrets: WoltSecrets) => {
  const response = await previewDelivery(
    secrets,
    FROM_ADDRESS,
    TO_ADDRESS,
    new Date(Date.now() + 62 * 60 * 1000)
  )
  console.log(response)
}
