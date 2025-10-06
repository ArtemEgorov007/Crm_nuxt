import { ref, watch, onMounted } from 'vue'
import type { Ref } from 'vue'

type Theme = 'light' | 'dark'

export function useTheme() {
  const theme: Ref<Theme> = ref('light')

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  const initTheme = () => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme') as Theme | null
    
    // Check system preference
    const systemPrefersDark = window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // Set initial theme
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (systemPrefersDark) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  onMounted(() => {
    initTheme()
    
    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light')
          }
        })
    }
  })

  return {
    theme,
    setTheme,
    toggleTheme,
    initTheme
  }
}