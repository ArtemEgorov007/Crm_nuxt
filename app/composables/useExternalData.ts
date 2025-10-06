import { ref } from 'vue'
import type { Ref } from 'vue'

// Define types for external data
export interface ExternalDeal {
  id: number
  name: string
  value: number
  [key: string]: any // Allow for additional properties
}

export interface ExternalDataResponse {
  success: boolean
  data: {
    message: string
    timestamp: string
    exampleData: ExternalDeal[]
  }
}

// Composable for managing external data
export function useExternalData() {
  const externalData: Ref<ExternalDeal[] | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)

  const fetchExternalData = async () => {
    isLoading.value = true
    error.value = null

    try {
      // In a real application, this would be your actual API endpoint
      const response = await fetch('/api/external-data')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result: ExternalDataResponse = await response.json()
      
      if (result.success) {
        externalData.value = result.data.exampleData
      } else {
        throw new Error('Failed to fetch external data')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred'
      console.error('Error fetching external data:', err)
    } finally {
      isLoading.value = false
    }
  }

  const clearData = () => {
    externalData.value = null
    error.value = null
  }

  return {
    externalData,
    isLoading,
    error,
    fetchExternalData,
    clearData
  }
}