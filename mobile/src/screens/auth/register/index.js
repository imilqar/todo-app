import { View } from 'react-native'
import React from 'react'
import * as Yup from 'yup'
import { register } from 'context/auth'
import RegisterForm from './register-form'

const registerValidationSchema = Yup.object({
  user: Yup.object({
    name: Yup.string().min(3).max(60).trim().required(),
    email: Yup.string().email().required()
  }),
  password: Yup.string().min(8).required()
})

const initialValues = {
  user: {
    name: '',
    email: ''
  },
  password: ''
}

function Register ({ navigation }) {
  const handleSubmit = async ({ user, password }) => {
    await register(user, password)
    navigation.navigate('Login')
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <RegisterForm
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        />
    </View>
  )
}

export default Register
