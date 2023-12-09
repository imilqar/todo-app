import { View } from 'react-native'
import React from 'react'
import { useAuthStore } from 'context/auth'
import { Button, Text, useTheme } from 'react-native-paper'

function Profile () {
  const theme = useTheme()
  const { user, logout } = useAuthStore()

  return (
    <View style={{ flex: 1, padding: 10, gap: 10, backgroundColor: theme.colors.background, alignItems: 'flex-start' }}>
        <Text variant='titleMedium'>{user.name}</Text>
        <Text variant='bodyMedium'>{user.email}</Text>
        <Button mode='outlined' onPress={logout}>
          Logout
        </Button>
    </View>
  )
}

export default Profile
