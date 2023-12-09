import { View, Text } from 'react-native'
import React from 'react'
import { Button, TextInput, useTheme } from 'react-native-paper'
import { useFormik } from 'formik'

function RegisterForm ({
  initialValues,
  validationSchema,
  onSubmit
}) {
  const theme = useTheme()

  const {
    values,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <View style={{ padding: 10, gap: 10 }}>
        <TextInput
          value={values.user.name}
          placeholder='Fullname'
          onChangeText={handleChange('user.name')}
        />
         <TextInput
          keyboardType='email-address'
          value={values.user.email}
          placeholder='Email'
          onChangeText={handleChange('user.email')}
        />
          <TextInput
          secureTextEntry={true}
          value={values.user.password}
          placeholder='Password'
          onChangeText={handleChange('password')}
        />

     <Button
     mode='contained'
      theme={theme}
      onPress={handleSubmit}
      >
      <Text style={{ color: '#fff' }}>Register</Text>
        </Button>
    </View>
  )
}

export default RegisterForm
