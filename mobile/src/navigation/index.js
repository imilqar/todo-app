import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Button, Text } from 'react-native-paper'
import { Feather } from '@expo/vector-icons'
import { useAuthStore } from 'context/auth'
import { useThemeStore } from 'context/theme'

import Login from '../screens/auth/login'
import Register from 'screens/auth/register'

import Home from 'screens/main/home'
import Profile from 'screens/main/profile'
import AddTodo from 'screens/main/home/create-todo'
import TodoDetails from 'screens/main/home/todo-details'

const AuthStack = createStackNavigator()
const MainStack = createStackNavigator()

function AuthStackNavigation () {
  return (
        <AuthStack.Navigator initialRouteName='Login'>
            <AuthStack.Screen name='Login' component={Login} />
            <AuthStack.Screen name='Register' component={Register} />
        </AuthStack.Navigator>
  )
}

function MainStackNavigation () {
  const navigation = useNavigation()
  const { currentTheme, toggleTheme } = useThemeStore()
  const themeIconName = currentTheme === 'light' ? 'sun' : 'moon'

  return (
          <MainStack.Navigator initialRouteName='Home'>
              <MainStack.Screen name='Home' component={Home} options={{
                headerTitle: 'To.Do',
                headerRight: () => (
                  <Button
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => navigation.navigate('Profile')}
                  >
                    <Text style={{ fontSize: 16 }}>Profile</Text>
                    <Feather name='chevron-right' size={16} color='#000' />
                  </Button>
                )
              }} />
              <MainStack.Screen name='Profile' component={Profile} options={{
                headerRight: () => (
                  <Button
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    onPress={toggleTheme}
                  >
                    <Feather name={themeIconName} size={18} color='#000' />
                  </Button>
                )
              }} />
              <MainStack.Screen name='AddTodo' component={AddTodo} options={{
                headerTitle: 'New Todo',
                presentation: 'modal',
                animation: 'slide_from_right',
                animationTypeForReplace: 'push'
              }} />
                 <MainStack.Screen name='TodoDetails' component={TodoDetails} />
          </MainStack.Navigator>
  )
}

export default function Navigation () {
  const { isAuthenticated } = useAuthStore()

  const renderNavigation = () => {
    if (!isAuthenticated) return <AuthStackNavigation />
    return <MainStackNavigation />
  }

  return (
        <NavigationContainer>
            {renderNavigation()}
        </NavigationContainer>
  )
}
