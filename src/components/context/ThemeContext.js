import React from 'react'

const ThemeContext = React.createContext({
  isLight: true,
  changeTheme: () => {},
})

export default ThemeContext
