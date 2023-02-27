/* eslint-disable no-lone-blocks */
import './index.css'
import {Component} from 'react'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'
import ThemeContext from '../context/ThemeContext'
import DesktopMenuBar from '../DesktopMenuBar'
import Header from '../Header'
import {VideoItemDetailsContainer} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, videoData: [], isLike: true}

  componentDidMount() {
    this.getVideoData()
  }

  getVideoData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = {
        id: data.video_details.id,
        channelName: data.video_details.channel.name,
        channelProfileImageUrl: data.video_details.channel.profile_image_url,
        publishedAt: data.video_details.published_at,
        title: data.video_details.title,
        viewCount: data.video_details.view_count,
        description: data.video_details.description,
        thumbnailUrl: data.video_details.thumbnail_url,
        videoUrl: data.video_details.video_url,
      }
      console.log(updatedData)
      this.setState({
        videoData: updatedData,
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
          onClick={() => this.getUserSearchPosts()}
          type="submit"
          className="failure-button"
        >
          Retry
        </button>
      </div>
    )
  }

  likeButton = () => {
    this.setState(prevState => ({isLike: !prevState.isLike}))
  }

  render() {
    const {videoData} = this.state
    const {
      channelName,
      videoUrl,
      description,
      thumbnailUrl,
      viewCount,
      title,
      publishedAt,
      channelProfileImageUrl,
    } = videoData

    const date = new Date('Apr 19, 2019')
    const formattedDate = date
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '-')
    console.log(formattedDate)
    const date1 = new Date(formattedDate)

    // Get the difference between the date and now
    const distance = formatDistanceToNow(date1, {addSuffix: true})

    const finalDate = distance.substring(
      distance.indexOf(distance.match(/\d+/g)),
    )

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isLight} = value
          const {isLike} = this.state
          const titleStyles = isLight ? 'titleLight' : 'titleDark'
          const buttonStyles = isLight ? 'buttonLight' : 'buttonDark'
          return (
            <>
              <Header />
              <DesktopMenuBar />
              <VideoItemDetailsContainer
                isLight={isLight}
                className="videoPlayer"
              >
                <ReactPlayer
                  light={thumbnailUrl}
                  width="100%"
                  controls
                  url={videoUrl}
                />
                <p className={`videoTitle ${titleStyles}`}>{title}</p>
                <div className="details_container">
                  <div>
                    <p className="channelName">{channelName}</p>
                    <p className="views">
                      {viewCount} Views <strong>.</strong> {finalDate}
                    </p>
                  </div>

                  <div className="buttons_div">
                    <button
                      onClick={this.likeButton}
                      type="button"
                      className="button"
                    >
                      <BiLike className={`buttonIcons ${isLike && 'active'}`} />
                      <p className={`${isLike && 'active'}`}>Like</p>
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick={this.likeButton}
                    >
                      <BiDislike
                        className={`buttonIcons ${!isLike && 'active'}`}
                      />
                      <p className={`${!isLike && 'active'}`}>Dislike</p>
                    </button>
                    <button type="button" className={`button `}>
                      <BiListPlus className="buttonIcons" /> Save
                    </button>
                  </div>
                </div>
              </VideoItemDetailsContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
