<template>
  <div v-if="modelOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">LLM Configuration</h2>
      
      <div class="space-y-4">
        <div>
          <label class="block mb-2">Provider</label>
          <select v-model="form.provider" class="w-full p-2 border rounded">
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="deepseek">Deepseek</option>
            <option value="openrouter">OpenRouter</option>
          </select>
        </div>

        <div>
          <label class="block mb-2">API Key</label>
          <input type="password" v-model="form.apiKey" class="w-full p-2 border rounded" 
                 placeholder="Enter your API key">
        </div>

        <div>
          <label class="block mb-2">Model (Optional)</label>
          <input type="text" v-model="form.model" class="w-full p-2 border rounded" 
                 placeholder="Enter model name">
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-3">
        <button @click="modelOpen = false" 
                class="px-4 py-2 border rounded hover:bg-gray-50">
          Cancel
        </button>
        <button @click="saveConfig" 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LLMConfig } from '~/composables/useChat'

const modelOpen = ref(false)
const form = ref<LLMConfig>({
  provider: 'openai',
  apiKey: '',
  model: ''
})

const emit = defineEmits<{
  (e: 'update', config: LLMConfig): void
}>()

const saveConfig = () => {
  emit('update', { ...form.value })
  modelOpen.value = false
}

defineExpose({ modelOpen })
</script>