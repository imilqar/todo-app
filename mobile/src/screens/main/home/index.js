import { View, StyleSheet, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconButton, useTheme, List, Portal, Dialog, Text, Button } from 'react-native-paper'
import { useTodoStore } from 'context/todo'

function Home ({ navigation }) {
  const theme = useTheme()
  const { todos, fetchTodos, completeTodo, removeTodo } = useTodoStore()
  const [refreshing, setRefreshing] = useState(false)
  const [visible, setVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    fetchTodos()
    setRefreshing(false)
  }, [refreshing])

  const handleRefresh = () => setRefreshing(true)
  const hideDialog = () => setVisible(false)

  const handleComplete = async (item) => {
    if (item.isCompleted) return
    await completeTodo(item.slug)
  }

  const handleDelete = async () => {
    await removeTodo(selectedItem.slug)
    hideDialog()
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <FlatList
      data={todos}
      keyExtractor={(item) => item._id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      renderItem={({ item }) => (
            <List.Item
              title={item.title}
              description={item.body}
              left={props => <List.Icon {...props} icon={item.isCompleted ? 'check' : 'clock'} />}
              onPress={() => handleComplete(item)}
              // onLongPress={() => navigation.navigate('TodoDetails', {
              //   slug: item.slug
              // })}
              onLongPress={() => {
                setVisible(true)
                setSelectedItem(item)
              }}
            />
      )}
      />

      <IconButton
        style={styles.plusBtn}
        theme={theme}
        containerColor={theme.colors.primary}
        icon="plus"
        iconColor={theme.colors.secondary}
        size={48}
        onPress={() => navigation.navigate('AddTodo')}
      />

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Remove</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">:(</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={handleDelete}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  plusBtn: {
    position: 'absolute',
    bottom: 5,
    right: 5
  }
})

export default Home
