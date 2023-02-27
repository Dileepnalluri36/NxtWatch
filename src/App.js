import {Switch, Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import './App.css'
import VideoItemDetails from './components/VideoItemDetails'
import ThemeContext from './components/context/ThemeContext'

// Replace your code here
class App extends Component {
  state = {isLight: true}

  changeTheme = () => {
    this.setState(prevState => ({isLight: !prevState.isLight}))
  }

  render() {
    const {isLight} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isLight,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
