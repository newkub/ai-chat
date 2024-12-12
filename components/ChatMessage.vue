<template>
  <div :class="[
    'p-4 rounded-lg mb-4',
    message.role === 'user' ? 'bg-blue-50' : 'bg-gray-50'
  ]">
    <div class="flex items-start gap-3">
      <div class="w-8 h-8 rounded-full flex items-center justify-center"
           :class="message.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'">
        <div :class="message.role === 'user' ? 'i-carbon-user' : 'i-carbon-bot'" />
      </div>
      <div class="flex-1">
        <div class="font-medium mb-1">
          {{ message.role === 'user' ? 'You' : 'Assistant' }}
        </div>
        <div class="message-content prose" v-html="formattedContent" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '~/composables/useChat'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return ''
  }
})

const props = defineProps<{
  message: Message
}>()

const formattedContent = computed(() => {
  return md.render(props.message.content)
})
</script>