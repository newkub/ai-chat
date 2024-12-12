import { createMarkdownRenderer } from '~/utils/markdown'

export function useMarkdown() {
  const md = createMarkdownRenderer()
  
  const renderMarkdown = (content: string) => {
    return md.render(content)
  }

  return {
    renderMarkdown
  }
}