import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { fetchBySlug, useTodoStore } from 'context/todo'
import { useTheme, IconButton } from 'react-native-paper'

function TodoDetails ({ route, navigation }) {
  const { slug } = route.params
  const [todo, setTodo] = useState(null)
  const theme = useTheme()
  const { removeTodo } = useTodoStore()

  useEffect(() => {
    fetchBySlug(slug)
      .then(setTodo)
  }, [slug])

  const handleDelete = async () => {
    await removeTodo(slug)
    navigation.navigate('Home')
  }

  if (!todo) return null

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, padding: 10, gap: 10 }}>
        <IconButton icon='delete' iconColor={theme.colors.primary} onPress={handleDelete} />
    </View>
  )
}

export default TodoDetails
