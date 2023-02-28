import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiListPlus} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import ThemeContext from '../context/ThemeContext'
import Header from '../Header'
import {
  TrendingContainer,
  TrendingHeader,
  TrendingIconDiv,
  TrendingHeading,
  NoSavedPara,
} from './styledComponents'
import DesktopMenuBar from '../DesktopMenuBar'
import TrendingItem from '../TrendingItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SavedVideos extends Component {
  state = {
    searchText: '',
    apiStatus: apiStatusConstants.initial,
    videosData: [],
  }

  componentDidMount() {
    this.getTrendingPosts()
  }

  getTrendingPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/trending`
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
        channelName: eachVideo.channel.name,
        channelProfileImageUrl: eachVideo.channel.profile_image_url,
        publishedAt: eachVideo.published_at,
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

  renderSuccessView = isLight => {
    const {videosData} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {savedVideo} = value
          console.log(savedVideo)
          return (
            <div>
              <TrendingHeader isLight={isLight} className="trending_header">
                <TrendingIconDiv isLight={isLight} className="trending_icon">
                  <BiListPlus className="header_icons" />
                </TrendingIconDiv>
                <TrendingHeading isLight={isLight} className="heading">
                  Saved Videos
                </TrendingHeading>
              </TrendingHeader>
              {savedVideo.length === 0 ? (
                <div className="no_saved_videos_container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                    className="no_saved_videos_img"
                  />
                  <TrendingHeading isLight={isLight} className="heading">
                    No saved videos found
                  </TrendingHeading>
                  <NoSavedPara isLight={isLight}>
                    Save your videos by clicking a button
                  </NoSavedPara>
                </div>
              ) : (
                <ul className="trending_videos_container">
                  {savedVideo.map(eachVideo => (
                    <TrendingItem eachVideo={eachVideo} key={eachVideo.id} />
                  ))}
                </ul>
              )}
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderTrendingVideos = isLight => {
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
          return (
            <>
              <Header />
              <div className="home_main_container">
                <DesktopMenuBar />

                <TrendingContainer
                  data-testid="savedVideos"
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

                  {this.renderTrendingVideos(isLight)}
                </TrendingContainer>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideos
