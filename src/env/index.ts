import 'dotenv/config'
import { z } from 'zod'

// formato do objeto da process.env: { NODE_ENV: 'dev', ...}

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test','production']).default('dev'),
    PORT: z.coerce.number(),
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
    console.error('❌ Invalid environment variable', _env.error.format())

    throw new Error('Invalid environment variables.')
}

export const env = _env.data

