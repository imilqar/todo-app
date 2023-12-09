import { DefaultTheme } from 'react-native-paper'

export const lightTheme = {
  ...DefaultTheme,
  myOwnProperty: true,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#bf4342',
    secondary: '#fff',
    tertiary: '#000',
    background: '#fff'
  }
}
