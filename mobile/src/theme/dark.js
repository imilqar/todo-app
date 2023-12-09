import { DefaultTheme } from 'react-native-paper'

export const darkTheme = {
  ...DefaultTheme,
  myOwnProperty: true,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
    secondary: '#fff',
    tertiary: '#000',
    background: '#000'
  }
}
