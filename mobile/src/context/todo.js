import { create } from 'zustand'
import { api } from 'api'

export const fetchBySlug = (slug) => {
  return new Promise((resolve, reject) => {
    api.get(`/todos/${slug}`)
      .then(res => resolve(res.data))
      .catch(reject)
  })
}

export const useTodoStore = create((set) => ({
  total: 0,
  todos: [],
  fetchTodos: async () => {
    const response = await api.get('/todos')
    const { todos, total } = response.data

    set({ todos, total })
  },
  fetchOnlyCompletedTodos: async () => {
    const response = await api.get('/todos/completed')
    const { todos, total } = response.data

    set({ todos, total })
  },
  addTodo: async (todo) => {
    await api.post('/todos', { todo })
    await set((state) => state.fetchTodos())
  },
  updateTodo: async (slug, todo) => {
    api.put(`/todos/${slug}`, { todo })
    await set((state) => state.fetchTodos())
  },
  completeTodo: async (slug) => {
    await api.patch(`/todos/complete/${slug}`)
    await set((state) => state.fetchTodos())
  },
  removeTodo: async (slug) => {
    await api.delete(`/todos/${slug}`)
    await set((state) => state.fetchTodos())
  }
}))
