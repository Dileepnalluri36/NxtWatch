import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ThemeContext from '../context/ThemeContext'
import Header from '../Header'
import {GamingContainer} from './styledComponents'
import DesktopMenuBar from '../DesktopMenuBar'
import GamingItem from '../GamingItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    searchText: '',
    apiStatus: apiStatusConstants.initial,
    videosData: [],
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        thumbNailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        videosData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4094EF" height="50" width="50" />
    </div>
  )

  renderFailureView = isLight => {
    console.log(isLight)
    const failureImgUrl = isLight
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

    const failuretextColor = isLight ? 'failureLight' : 'failureDark'

    return (
      <div className={`failure_view_container ${failuretextColor}`}>
        <img className="failure_img" src={failureImgUrl} alt="failure view" />
        <p className="failure_heading">Oops! Something went wrong</p>
        <p className="failure_para">
          We are having some trouble to complete your request.Please try again.
        </p>
        <button
          onClick={() => this.getTrendingPosts()}
          type="submit"
          className="failure-button"
        >
          Retry
        </button>
      </div>
    )
  }

  renderSuccessView = () => {
    const {videosData} = this.state
    return (
      <ul className="gaming_videos_container">
        {videosData.map(eachVideo => (
          <GamingItem eachVideo={eachVideo} key={eachVideo.id} />
        ))}
      </ul>
    )
  }

  renderGamingVideos = isLight => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView(isLight)
      case apiStatusConstants.success:
        return this.renderSuccessView(isLight)
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isLight} = value
          const {closeButton} = this.state
          return (
            <>
              <Header />
              <div className="home_main_container">
                <DesktopMenuBar />

                <GamingContainer
                  data-testid="gaming"
                  className="trending_container"
                  isLight={isLight}
                >
                  {/* {!closeButton && (
                      <div data-testid="banner" className="banner_div">
                        <div className="banner_text">
                          <img
                            className="logoImg"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                            alt="nxt watch logo"
                          />
                          <h1 className="prepaidHeading">
                            Buy Nxt Watch Prepaid Premium plans with UPI
                          </h1>
                          <button className="getNow" type="button">
                            GET IT NOW
                          </button>
                        </div>
                        <button
                          data-testid="close"
                          onClick={this.close}
                          type="button"
                          className="close_button"
                        >
                          <GrFormClose />
                        </button>
                      </div>
                    )} */}

                  {this.renderGamingVideos(isLight)}
                </GamingContainer>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
