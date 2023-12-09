import { View, Text } from 'react-native'
import React from 'react'
import { Button, TextInput, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'

function LoginForm ({
  initialValues,
  validationSchema,
  onSubmit
}) {
  const theme = useTheme()
  const navigation = useNavigation()

  const {
    values,
    touched,
    errors,
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
          keyboardType='email-address'
          value={values.email}
          label='Email'
          onChangeText={handleChange('email')}
          error={touched.email && errors.email}
        />
        <TextInput
          secureTextEntry={true}
          value={values.password}
          label='Password'
          onChangeText={handleChange('password')}
          error={touched.password && errors.password}
        />

     <Button mode='contained' theme={theme} onPress={handleSubmit}>
      <Text style={{ color: theme.colors.secondary }}>Login</Text>
      </Button>
      <Button theme={theme} onPress={() => navigation.navigate('Register')}>
      <Text style={{ color: theme.colors.tertiary }}>Register</Text>
      </Button>
    </View>
  )
}

export default LoginForm
