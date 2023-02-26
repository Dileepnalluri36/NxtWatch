import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import {SiYoutubegaming} from 'react-icons/si'
import {useState} from 'react'
import ThemeContext from '../context/ThemeContext'

const DesktopMenuBar = () => {
  const [activeMenu, setActiveMenu] = useState('Home')
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isLight} = value

        const linksThemeClass = isLight ? 'linksLight' : 'linksDark'
        const DesktoplinksThemeClass = isLight
          ? 'desktopThemeLight'
          : 'desktopThemeDark'

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
                <li>
                  <AiFillHome
                    className={`linkIcons ${
                      activeMenu === 'Home' ? 'active-link' : ''
                    }`}
                  />
                  <p className={linksThemeClass}>Home</p>
                </li>
              </Link>
              <Link
                to="/"
                className={`link_item ${
                  activeMenu === 'Trending' ? 'active-link' : ''
                }`}
                onClick={() => setActiveMenu('Trending')}
              >
                <li>
                  <AiFillFire
                    className={`linkIcons ${
                      activeMenu === 'Trending' ? 'active-link' : ''
                    }`}
                  />
                  <p className={linksThemeClass}>Trending</p>
                </li>
              </Link>
              <Link
                to="/"
                className={`link_item ${
                  activeMenu === 'Gaming' ? 'active-link' : ''
                }`}
                onClick={() => setActiveMenu('Gaming')}
              >
                <li>
                  <SiYoutubegaming
                    className={`linkIcons ${
                      activeMenu === 'Gaming' ? 'active-link' : ''
                    }`}
                  />
                  <p className={linksThemeClass}>Gaming</p>
                </li>
              </Link>
              <Link
                to="/"
                className={`link_item ${
                  activeMenu === 'Saved' ? 'active-link' : ''
                }`}
                onClick={() => setActiveMenu('Saved')}
              >
                <li>
                  <BiListPlus
                    className={`linkIcons ${
                      activeMenu === 'Saved' ? 'active-link' : ''
                    }`}
                  />
                  <p className={linksThemeClass}>Saved Videos</p>
                </li>
              </Link>
            </ul>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(DesktopMenuBar)
