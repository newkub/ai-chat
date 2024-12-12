<template>
  <form @submit.prevent="handleSubmit" class="flex gap-2">
    <input type="text" 
           v-model="input" 
           placeholder="Type your message..." 
           class="flex-1 p-2 border rounded"
           :disabled="isLoading">
    <button type="submit" 
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            :disabled="isLoading || !hasConfig">
      <span v-if="isLoading">Sending...</span>
      <span v-else>Send</span>
    </button>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean
  hasConfig: boolean
}>()

const emit = defineEmits<{
  (e: 'send', message: string): void
}>()

const input = ref('')

const handleSubmit = () => {
  if (!input.value.trim() || props.isLoading) return
  emit('send', input.value)
  input.value = ''
}
</script>