import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('themer', () => {

  const preferredTheme = ref('light')
  const isDark = ref(false)

  watch(preferredTheme, (newTheme, oldTheme) => {
    isDark.value = 'dark' === newTheme
  })

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      preferredTheme.value = storedTheme
      return storedTheme
    }

    preferredTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    return preferredTheme.value
  }

  const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
      preferredTheme.value = 'dark'
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
      preferredTheme.value = theme
    }
  }

  return {
    preferredTheme,
    isDark,
    getStoredTheme,
    setStoredTheme,
    getPreferredTheme,
    setTheme,
  }

})
