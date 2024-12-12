import { ref } from 'vue'
import type { Message, LLMConfig, ChatResponse } from '~/types/chat'
import { formatError } from '~/utils/error'

export const useChat = () => {
  const messages = ref<Message[]>([])
  const isLoading = ref(false)
  const config = ref<LLMConfig | null>(null)
  const error = ref<string | null>(null)

  const setConfig = (newConfig: LLMConfig) => {
    config.value = newConfig
    error.value = null
  }

  const addMessage = (message: Message) => {
    messages.value.push(message)
  }

  const sendMessage = async (content: string) => {
    if (!config.value?.apiKey) {
      error.value = 'Please configure API key first'
      return
    }

    addMessage({ role: 'user', content })
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<ChatResponse>('/api/chat', {
        method: 'POST',
        body: {
          messages: messages.value,
          config: config.value
        }
      })

      if (response?.content) {
        addMessage({ role: 'assistant', content: response.content })
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (err: any) {
      error.value = formatError(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    messages,
    isLoading,
    config,
    error,
    setConfig,
    sendMessage
  }
}