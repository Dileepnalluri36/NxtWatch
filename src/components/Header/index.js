import './index.css'
import {BiSun, BiListPlus} from 'react-icons/bi'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {useState} from 'react'
import ThemeContext from '../context/ThemeContext'

const Header = props => {
  const [isOpen, setHamburgerButton] = useState(false)
  const [activeMenu, setActiveMenu] = useState('Home')

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isLight, changeTheme} = value

        const logoUrl = isLight
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        const headerThemeClass = isLight ? 'headerLight' : 'headerDark'
        const linksThemeClass = isLight ? 'linksLight' : 'linksDark'

        return (
          <div className={`header_container ${headerThemeClass}`}>
            <div className="mobile_container">
              <img className="logoImg" src={logoUrl} alt="logoImg" />
              <div className="links_mobile_bar">
                <button className="hamburgerIcon" type="button">
                  {isLight ? (
                    <FaMoon
                      className={`${headerThemeClass} icons`}
                      onClick={changeTheme}
                    />
                  ) : (
                    <BiSun
                      className={`${headerThemeClass} icons`}
                      onClick={changeTheme}
                    />
                  )}
                </button>
                <button
                  onClick={() => setHamburgerButton(!isOpen)}
                  className="hamburgerIcon"
                  type="button"
                >
                  <GiHamburgerMenu className={`${headerThemeClass} icons`} />
                </button>

                <button
                  onClick={onClickLogout}
                  type="button"
                  className="logout_button"
                >
                  <FiLogOut className={`${headerThemeClass} icons`} />
                </button>
              </div>
            </div>
            {isOpen && (
              <ul className={`menu_bar ${linksThemeClass}`}>
                <li
                  className={activeMenu === 'Home' ? 'active-link' : ''}
                  onClick={() => setActiveMenu('Home')}
                >
                  <AiFillHome className="linkIcons" />
                  <p>Home</p>
                </li>
                <li
                  className={activeMenu === 'Trending' ? 'active-link' : ''}
                  onClick={() => setActiveMenu('Trending')}
                >
                  <AiFillFire className="linkIcons" />
                  <p>Trending</p>
                </li>
                <li
                  className={activeMenu === 'Gaming' ? 'active-link' : ''}
                  onClick={() => setActiveMenu('Gaming')}
                >
                  <SiYoutubegaming className="linkIcons" />
                  <p>Gaming</p>
                </li>
                <li
                  className={activeMenu === 'Saved' ? 'active-link' : ''}
                  onClick={() => setActiveMenu('Saved')}
                >
                  <BiListPlus className="linkIcons" />
                  <p>Saved Videos</p>
                </li>
              </ul>
            )}
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(Header)
