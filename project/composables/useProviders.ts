import type { LLMConfig } from '~/types/chat'

interface Provider {
  name: string
  value: LLMConfig['provider']
  defaultModel: string
}

export const useProviders = () => {
  const providers: Provider[] = [
    { name: 'OpenAI', value: 'openai', defaultModel: 'gpt-3.5-turbo' },
    { name: 'Anthropic', value: 'anthropic', defaultModel: 'claude-3-opus-20240229' },
    { name: 'Deepseek', value: 'deepseek', defaultModel: 'deepseek-chat' },
    { name: 'OpenRouter', value: 'openrouter', defaultModel: 'openai/gpt-3.5-turbo' }
  ]

  const getDefaultModel = (provider: LLMConfig['provider']) => {
    return providers.find(p => p.value === provider)?.defaultModel || ''
  }

  return {
    providers,
    getDefaultModel
  }
}