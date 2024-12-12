<template>
  <div class="w-8 h-8 rounded-full flex items-center justify-center"
       :class="roleClass">
    <div :class="iconClass" />
  </div>
</template>

<script setup lang="ts">
import type { Message } from '~/types/chat'

const props = defineProps<{
  role: Message['role']
}>()

const roleClass = computed(() => 
  props.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'
)

const iconClass = computed(() => 
  props.role === 'user' ? 'i-carbon-user' : 'i-carbon-bot'
)
</script>