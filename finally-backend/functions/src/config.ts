import { Static, Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import envSchema from 'env-schema'

const schema = Type.Object({
  WOLT_API_TOKEN: Type.String(),
  WOLT_MERCHANT_ID: Type.String(),
})

type Config = Static<typeof schema>

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  allowUnionTypes: true,
})

// Order of priorities for the config is (lowest to highest):
// .env file < initial process.env (eg. supplied on console, or in the image) < ALL_ENV parsed as JSON
// The ALL_ENV variable itself has to come from the environment, not from the .env file.
// This allows us to use .env for comfortable development and also use ALL_ENV on production for delivering secrets.
const config = envSchema<Config>({
  schema: Type.Strict(schema),
  dotenv: true,
  data: JSON.parse(process.env.ALL_ENV || '{}'),
  ajv,
})

export default config
