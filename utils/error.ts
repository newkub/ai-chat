export function formatError(error: any): string {
  if (typeof error === 'string') return error
  
  if (error.response?.data?.error) {
    return error.response.data.error
  }
  
  return error.message || 'An unexpected error occurred'
}