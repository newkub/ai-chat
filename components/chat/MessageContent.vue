<template>
  <div class="message-content prose" v-html="renderedContent" />
</template>

<script setup lang="ts">
import { useMarkdown } from '~/composables/useMarkdown'

const props = defineProps<{
  content: string
}>()

const { renderMarkdown } = useMarkdown()
const renderedContent = computed(() => renderMarkdown(props.content))
</script>