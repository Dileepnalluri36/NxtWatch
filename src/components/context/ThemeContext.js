import React from 'react'

const ThemeContext = React.createContext({
  isLight: true,
  changeTheme: () => {},
  updateSavedVideo: () => {},
  savedVideo: [],
})

export default ThemeContext
