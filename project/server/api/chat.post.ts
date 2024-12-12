import type { Message, LLMConfig, ChatResponse } from '~/types/chat'
import { handleOpenAI } from './providers/openai'
import { handleAnthropic } from './providers/anthropic'
import { handleDeepseek } from './providers/deepseek'
import { handleOpenRouter } from './providers/openrouter'

export interface RequestBody {
  messages: Message[]
  config: LLMConfig
}

const providers = {
  openai: handleOpenAI,
  anthropic: handleAnthropic,
  deepseek: handleDeepseek,
  openrouter: handleOpenRouter
} as const

export default defineEventHandler(async (event) => {
  const body = await readBody<RequestBody>(event)
  
  if (!body?.config?.apiKey) {
    throw createError({
      statusCode: 400,
      message: 'API key is required'
    })
  }

  const provider = providers[body.config.provider]
  if (!provider) {
    throw createError({
      statusCode: 400,
      message: 'Invalid provider'
    })
  }

  try {
    return await provider(body)
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'An error occurred'
    })
  }
})