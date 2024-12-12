<template>
  <div :class="[
    'p-4 rounded-lg mb-4',
    message.role === 'user' ? 'bg-blue-50' : 'bg-gray-50'
  ]">
    <div class="flex items-start gap-3">
      <MessageAvatar :role="message.role" />
      <div class="flex-1">
        <div class="font-medium mb-1">
          {{ message.role === 'user' ? 'You' : 'Assistant' }}
        </div>
        <MessageContent :content="message.content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '~/types/chat'
import MessageAvatar from './MessageAvatar.vue'
import MessageContent from './MessageContent.vue'

defineProps<{
  message: Message
}>()
</script>