import {Link} from 'react-router-dom'
import ThemeContext from '../context/ThemeContext'
import DesktopMenuBar from '../DesktopMenuBar'
import {NotFoundContainer} from './styledComponents'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isLight} = value
      const notFoundUrl = isLight
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      return (
        <>
          <Header />
          <DesktopMenuBar />
          <NotFoundContainer isLight={isLight} className="not-found-container">
            <img
              src={notFoundUrl}
              alt="page not found"
              className="not-found-img"
            />
            <h1 className="not-found-heading">Page Not Found</h1>
            <p className="not-found-para">
              We are sorry, the page you requested could not be found.Please go
              back to the homepage.
            </p>
            <Link to="/">
              <button type="button" className="not-found-button">
                Home Page
              </button>
            </Link>
          </NotFoundContainer>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
