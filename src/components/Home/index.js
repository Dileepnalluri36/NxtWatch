import {Component} from 'react'
import Header from '../Header'
import DesktopMenuBar from '../DesktopMenuBar'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home_main_container">
          <DesktopMenuBar />
          <div className="home_container">
            <img
              src="https://res.cloudinary.com/dziwdneks/image/upload/v1675418435/login_img_poyp5d.png"
              className="login-website-desktop-img"
              alt="website login"
            />
            <img
              src="https://res.cloudinary.com/dziwdneks/image/upload/v1675418435/login_img_poyp5d.png"
              className="login-website-desktop-img"
              alt="website login"
            />
            <img
              src="https://res.cloudinary.com/dziwdneks/image/upload/v1675418435/login_img_poyp5d.png"
              className="login-website-desktop-img"
              alt="website login"
            />
            <img
              src="https://res.cloudinary.com/dziwdneks/image/upload/v1675418435/login_img_poyp5d.png"
              className="login-website-desktop-img"
              alt="website login"
            />
            <img
              src="https://res.cloudinary.com/dziwdneks/image/upload/v1675418435/login_img_poyp5d.png"
              className="login-website-desktop-img"
              alt="website login"
            />
          </div>
        </div>
      </>
    )
  }
}
export default Home
