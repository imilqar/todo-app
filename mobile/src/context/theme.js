import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  currentTheme: 'light',
  toggleTheme: () => set(state => ({
    currentTheme: state.currentTheme === 'light' ? 'dark' : 'light'
  }))
}))
