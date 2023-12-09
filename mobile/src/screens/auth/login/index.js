import { View } from 'react-native'
import React from 'react'
import * as Yup from 'yup'
import { useAuthStore } from 'context/auth'
import LoginForm from './login-form'
import { useTheme } from 'react-native-paper'

const loginValidationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required()
})

const initialValues = {
  email: '',
  password: ''
}

function Login ({ navigation }) {
  const { login } = useAuthStore()
  const theme = useTheme()

  const handleSubmit = async ({ email, password }) => {
    await login(email, password)
    // navigation.navigate('Home')
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <LoginForm
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        />
    </View>
  )
}

export default Login
