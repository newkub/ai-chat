import type { RequestBody } from '../chat.post'
import type { ChatResponse } from '~/types/chat'

export async function handleOpenRouter(body: RequestBody): Promise<ChatResponse> {
  const response = await $fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${body.config.apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://your-site.com',
      'X-Title': 'AI Chat App'
    },
    body: {
      model: body.config.model || 'openai/gpt-3.5-turbo',
      messages: body.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    }
  })

  return {
    content: response.choices[0].message.content
  }
}