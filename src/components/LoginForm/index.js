import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import ThemeContext from '../context/ThemeContext'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state
    const inputType = showPassword ? 'text' : 'password'
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type={inputType}
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password:rahul@2021"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username:rahul"
        />
      </>
    )
  }

  showPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isLight} = value
          const logoUrl = isLight
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

          const containerStyles = isLight ? 'containerLight' : 'containerDark'
          const formContainerStyles = isLight ? 'formLight' : 'formDark'
          return (
            <div className={`login-container ${containerStyles}`}>
              <form
                className={`form-container ${formContainerStyles}`}
                onSubmit={this.submitForm}
              >
                <img
                  src={logoUrl}
                  className="login-website-logo-image"
                  alt="website logo"
                />
                <div className="input-container">
                  {this.renderUsernameField()}
                </div>
                <div className="input-container">
                  {this.renderPasswordField()}
                </div>
                <div className={`showPasswordContainer ${formContainerStyles}`}>
                  <input
                    onClick={this.showPassword}
                    className="showPasswordInput"
                    id="showPassword"
                    type="checkbox"
                  />
                  <label htmlFor="showPassword">Show Password</label>
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
                {showSubmitError && (
                  <p className="error-message">*{errorMsg}</p>
                )}
              </form>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default LoginForm
