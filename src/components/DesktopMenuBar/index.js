import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import {SiYoutubegaming} from 'react-icons/si'
import {useState} from 'react'
import ThemeContext from '../context/ThemeContext'

const DesktopMenuBar = () => {
  const [activeMenu, setActiveMenu] = useState('')
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isLight} = value

        const linksThemeClass = isLight ? 'linksLight' : 'linksDark'
        const DesktoplinksThemeClass = isLight
          ? 'desktopThemeLight'
          : 'desktopThemeDark'

        const desktopMenuStyles = isLight
          ? 'desktopMenuLight'
          : 'desktopMenuDark'

        return (
          <div className={`desktop-menu ${DesktoplinksThemeClass}`}>
            <ul className="menu_bar">
              <Link
                to="/"
                className={`link_item ${
                  activeMenu === 'Home' ? 'active-link' : ''
                }`}
                onClick={() => setActiveMenu('Home')}
              >
                <li id="home">
                  <AiFillHome
                    className={`linkIcons ${
                      activeMenu === 'Home' ? 'active-link' : ''
                    }`}
                  />
                  <p className={linksThemeClass}>Home</p>
                </li>
              </Link>
              <Link
                to="/trending"
                className={`link_item ${
                  activeMenu === 'Trending' ? 'active-link' : ''
                }`}
                onClick={() => setActiveMenu('Trending')}
              >
                <li id="trending">
                  <AiFillFire
                    className={`linkIcons ${
                      activeMenu === 'Trending' ? 'active-link' : ''
                    }`}
                  />
                  <p className={linksThemeClass}>Trending</p>
                </li>
              </Link>
              <Link
                to="/gaming"
                className={`link_item ${
                  activeMenu === 'Gaming' ? 'active-link' : ''
                }`}
                onClick={() => setActiveMenu('Gaming')}
              >
                <li id="gaming">
                  <SiYoutubegaming
                    className={`linkIcons ${
                      activeMenu === 'Gaming' ? 'active-link' : ''
                    }`}
                  />
                  <p className={linksThemeClass}>Gaming</p>
                </li>
              </Link>
              <Link
                to="/saved-videos"
                className={`link_item ${
                  activeMenu === 'Saved' ? 'active-link' : ''
                }`}
                onClick={() => setActiveMenu('Saved')}
              >
                <li id="save">
                  <BiListPlus
                    className={`linkIcons ${
                      activeMenu === 'Saved' ? 'active-link' : ''
                    }`}
                  />
                  <p className={linksThemeClass}>Saved Videos</p>
                </li>
              </Link>
            </ul>

            <div className={`contacts_div ${desktopMenuStyles}`}>
              <p className="contactUs">CONTACT US</p>
              <div className="logo_div">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </div>
              <p className="tagline">
                Enjoy! Now to see your channels and recommendations!
              </p>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(DesktopMenuBar)
