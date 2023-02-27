import './index.css'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
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
        const logoutThemeClass = isLight ? 'logoutLight' : 'logoutDark'

        return (
          <div className={`header_container ${headerThemeClass}`}>
            <div className="mobile_container">
              <img className="logoImg" src={logoUrl} alt="logoImg" />
              <div className="links_mobile_bar">
                <button
                  data-testid="theme"
                  className="hamburgerIcon"
                  type="button"
                  onClick={changeTheme}
                >
                  {isLight ? (
                    <FaMoon className={`${headerThemeClass} icons`} />
                  ) : (
                    <BiSun className={`${headerThemeClass} icons`} />
                  )}
                </button>
                <button
                  onClick={() => setHamburgerButton(!isOpen)}
                  className="hamburgerIcon"
                  type="button"
                >
                  <GiHamburgerMenu className={`${headerThemeClass} icons`} />
                </button>

                <div className="popup-container">
                  <Popup
                    modal
                    trigger={
                      <button type="button" className="logout_button">
                        <FiLogOut className={`${headerThemeClass} icons`} />
                      </button>
                    }
                  >
                    {close => (
                      <>
                        <div>
                          <p>Are you sure you want to logout ?</p>
                        </div>
                        <div className="pop-up-button_div">
                          <button
                            type="button"
                            className="cancel-button"
                            onClick={() => close()}
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="logout-button"
                            onClick={onClickLogout}
                          >
                            Logout
                          </button>
                        </div>
                      </>
                    )}
                  </Popup>
                </div>
              </div>
            </div>
            {isOpen && (
              <ul className={`menu_bar ${linksThemeClass}`}>
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
            )}

            <div className="desktop_container">
              <img className="logoImg" src={logoUrl} alt="logoImg" />

              <div className="links_mobile_bar">
                <button
                  data-testid="theme"
                  onClick={changeTheme}
                  className="hamburgerIcon"
                  type="button"
                >
                  {isLight ? (
                    <FaMoon className={`${headerThemeClass} icons`} />
                  ) : (
                    <BiSun className={`${headerThemeClass} icons`} />
                  )}
                </button>
                <button className="hamburgerIcon" type="button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profile_img"
                  />
                </button>
                <div className="popup-container">
                  <Popup
                    modal
                    trigger={
                      <button
                        type="button"
                        className={`logout_button ${logoutThemeClass}`}
                      >
                        Logout
                      </button>
                    }
                  >
                    {close => (
                      <>
                        <div>
                          <p>Are you sure you want to logout ?</p>
                        </div>
                        <div className="pop-up-button_div">
                          <button
                            type="button"
                            className="cancel-button"
                            onClick={() => close()}
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="logout-button"
                            onClick={onClickLogout}
                          >
                            Logout
                          </button>
                        </div>
                      </>
                    )}
                  </Popup>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(Header)
