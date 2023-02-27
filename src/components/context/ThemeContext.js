import React from 'react'

const ThemeContext = React.createContext({
  isLight: true,
  changeTheme: () => {},
  updateSavedVideo: () => {},
})

export default ThemeContext
