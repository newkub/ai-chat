<template>
  <div class="chat-container overflow-y-auto mb-4">
    <Message v-for="(message, index) in messages" 
            :key="index" 
            :message="message" />
  </div>
</template>

<script setup lang="ts">
import type { Message } from '~/types/chat'
import Message from './Message.vue'

defineProps<{
  messages: Message[]
}>()
</script>