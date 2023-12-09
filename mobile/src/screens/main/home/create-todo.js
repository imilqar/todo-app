import { View } from 'react-native'
import { Button, TextInput, useTheme } from 'react-native-paper'
import React from 'react'
import { useTodoStore } from 'context/todo'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  title: ''
}

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(120).required(),
  body: Yup.string()
})

function AddTodo ({ navigation }) {
  const theme = useTheme()
  const { addTodo } = useTodoStore()

  const {
    values,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await addTodo(values)
      navigation.navigate('Home')
    }
  })

  return (
        <View style={{ flex: 1, padding: 10, gap: 10, backgroundColor: theme.colors.background }}>
            <TextInput
            value={values.title}
            label='Title'
            onChangeText={handleChange('title')}
            />
            <TextInput
            multiline
            numberOfLines={10}
            value={values.body}
            onChangeText={handleChange('body')}
            />
            <Button
                mode='contained'
                onPress={handleSubmit}
            >
                Add
            </Button>
        </View>
  )
}

export default AddTodo
