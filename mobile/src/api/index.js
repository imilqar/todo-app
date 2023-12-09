import axios from 'axios'

export const api = axios.create({
  baseURL: 'YOUR_API_URL',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})
