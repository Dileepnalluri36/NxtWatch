import {Switch, Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import './App.css'
import VideoItemDetails from './components/VideoItemDetails'
import ThemeContext from './components/context/ThemeContext'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'

// Replace your code here
class App extends Component {
  state = {isLight: true, savedVideo: []}

  changeTheme = () => {
    this.setState(prevState => ({isLight: !prevState.isLight}))
  }

  updateSavedVideo = videoData => {
    const {savedVideo} = this.state
    const idExists = savedVideo.map(obj => obj.id).includes(videoData.id)

    if (!idExists) {
      this.setState(prevState => ({
        savedVideo: [...prevState.savedVideo, videoData],
      }))
    } else {
      const updatedData = savedVideo.filter(
        eachVideo => eachVideo.id !== videoData.id,
      )
      this.setState({savedVideo: updatedData})
    }
  }

  render() {
    const {isLight, savedVideo} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isLight,
          changeTheme: this.changeTheme,
          updateSavedVideo: this.updateSavedVideo,
          savedVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
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
