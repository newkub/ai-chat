<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <header class="mb-6">
        <h1 class="text-3xl font-bold mb-2">AI Chat</h1>
        <button @click="openConfig" 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Configure LLM
        </button>
      </header>

      <main class="bg-white rounded-lg shadow-sm p-4">
        <div v-if="chat.error" class="mb-4 p-4 bg-red-50 text-red-700 rounded">
          {{ chat.error }}
        </div>

        <MessageList :messages="chat.messages" />

        <div class="border-t pt-4">
          <ChatInput 
            :is-loading="chat.isLoading"
            :has-config="!!chat.config"
            @send="sendMessage"
          />
        </div>
      </main>
    </div>

    <ChatConfigModal ref="configModal" @update="updateConfig" />
  </div>
</template>

<script setup lang="ts">
import { useChat } from '~/composables/useChat'
import type { LLMConfig } from '~/types/chat'
import MessageList from '~/components/chat/MessageList.vue'
import ChatInput from '~/components/chat/Input.vue'
import ChatConfigModal from '~/components/chat/ConfigModal.vue'

const chat = useChat()
const configModal = ref()

const openConfig = () => {
  configModal.value.modelOpen = true
}

const updateConfig = (config: LLMConfig) => {
  chat.setConfig(config)
}

const sendMessage = async (message: string) => {
  try {
    await chat.sendMessage(message)
  } catch (error) {
    // Error is handled in useChat composable
  }
}
</script>