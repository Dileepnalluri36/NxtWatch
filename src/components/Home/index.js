/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {GrFormClose} from 'react-icons/gr'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ThemeContext from '../context/ThemeContext'
import DesktopMenuBar from '../DesktopMenuBar'
import {HomeContainer} from './styledComponents'
import VideoItem from '../VideoItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    closeButton: false,
    searchText: '',
    apiStatus: apiStatusConstants.initial,
    videosData: [],
  }

  componentDidMount() {
    this.getUserSearchPosts()
  }

  getUserSearchPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchText}`
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

  changeSearchText = event => {
    this.setState({searchText: event.target.value})
  }

  close = () => {
    this.setState(prevState => ({closeButton: !prevState.closeButton}))
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
        <h1 className="failure_heading">Oops! Something went wrong</h1>
        <p className="failure_para">
          We are having some trouble to complete your request.Please try again.
        </p>
        <button
          onClick={() => this.getUserSearchPosts()}
          type="submit"
          className="failure-button"
        >
          Retry
        </button>
      </div>
    )
  }

  renderVideos = isLight => {
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

  renderSuccessView = isLight => {
    const {searchText, videosData} = this.state
    const searchStyles = isLight ? 'searchLight' : 'searchDark'
    const searchButtonStyles = isLight
      ? 'searchButtonLight'
      : 'searchButtonDark'
    const failuretextColor = isLight ? 'failureLight' : 'failureDark'
    const searchBoxStyles = isLight ? 'searchBoxLight' : 'searchBoxDark'
    return (
      <>
        <div
          data-testid="searchButton"
          className={`search_div ${searchStyles}`}
        >
          <input
            value={searchText}
            onChange={this.changeSearchText}
            className={`searchBar ${searchBoxStyles}`}
            type="search"
            placeholder="Search"
          />
          <button
            onClick={this.getUserSearchPosts}
            className={`searchButton ${searchButtonStyles}`}
            type="button"
            testid="searchIcon"
          >
            <FaSearch />
          </button>
        </div>
        {videosData.length === 0 ? (
          <div className={`no_search_found ${failuretextColor}`}>
            <img
              className="failure_img"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
              alt="no videos"
            />
            <p className="failure_heading">No Search Results Found</p>
            <p className="failure_para">
              Try different key words or remove search filter
            </p>
            <button
              onClick={() => this.getUserSearchPosts()}
              type="submit"
              className="failure-button"
            >
              Retry
            </button>
          </div>
        ) : (
          <ul className="videos_container">
            {videosData.map(eachVideo => (
              <VideoItem eachVideo={eachVideo} key={eachVideo.id} />
            ))}
          </ul>
        )}
      </>
    )
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

                <HomeContainer
                  data-testid="home"
                  className="home_container"
                  isLight={isLight}
                >
                  {!closeButton && (
                    <div className="banner_div">
                      <div data-testid="banner" className="banner_text">
                        <img
                          className="logoImg"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <p className="prepaidHeading">Buy Nxt Watch Premium</p>
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
                  )}

                  {this.renderVideos(isLight)}
                </HomeContainer>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Home
