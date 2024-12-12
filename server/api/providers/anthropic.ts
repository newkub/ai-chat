import type { RequestBody } from '../chat.post'
import type { ChatResponse } from '~/types/chat'

export async function handleAnthropic(body: RequestBody): Promise<ChatResponse> {
  const response = await $fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': body.config.apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json'
    },
    body: {
      model: body.config.model || 'claude-3-opus-20240229',
      messages: body.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    }
  })

  return {
    content: response.content[0].text
  }
}