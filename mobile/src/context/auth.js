import { create } from 'zustand'
import { api } from 'api'
import * as SecureStore from 'expo-secure-store'

export const register = (user, password) => {
  return api.post('/auth/register', { user, password })
}

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loadUser: async () => {
    const userData = await SecureStore.getItemAsync('user')
    const isAuthenticated = await SecureStore.getItemAsync('isAuthenticated')

    set({
      user: userData,
      isAuthenticated
    })
  },
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const userData = response.data

      await SecureStore.setItemAsync('user', JSON.stringify(userData))
      await SecureStore.setItemAsync('isAuthenticated', JSON.stringify(true))

      set({
        user: userData,
        isAuthenticated: true
      })
    } catch (err) {
      console.log(err.message)
      console.log(err.response.data.message)
    }
  },
  logout: async () => {
    await api.post('/auth/logout')

    await SecureStore.deleteItemAsync('user')
    await SecureStore.deleteItemAsync('isAuthenticated')

    set({
      user: null,
      isAuthenticated: false
    })
  }
}))
