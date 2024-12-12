export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface LLMConfig {
  provider: 'openai' | 'anthropic' | 'deepseek' | 'openrouter'
  apiKey: string
  model?: string
}

export interface ChatResponse {
  content: string
}