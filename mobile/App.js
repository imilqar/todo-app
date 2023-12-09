import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './src/navigation'
import { PaperProvider } from 'react-native-paper'
import { lightTheme, darkTheme } from './src/theme'
import { useThemeStore } from 'context/theme'
import { useAuthStore } from 'context/auth'

export default function App () {
  const { currentTheme } = useThemeStore()
  const theme = currentTheme === 'light' ? lightTheme : darkTheme

  const { loadUser } = useAuthStore()

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <StatusBar style="auto" />
        <Navigation />
      </View>
    </PaperProvider>
  )
}
