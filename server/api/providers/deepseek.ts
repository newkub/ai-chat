import type { RequestBody } from '../chat.post'
import type { ChatResponse } from '~/types/chat'

export async function handleDeepseek(body: RequestBody): Promise<ChatResponse> {
  const response = await $fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${body.config.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: {
      model: body.config.model || 'deepseek-chat',
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