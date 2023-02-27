/* eslint-disable jsx-a11y/img-redundant-alt */
import './index.css'
import {formatDistance} from 'date-fns'
import {Link} from 'react-router-dom'
import ThemeContext from '../context/ThemeContext'

const VideoItem = props => {
  const {eachVideo} = props
  const {
    id,
    channelName,
    channelProfileImageUrl,
    publishedAt,
    thumbNailUrl,
    viewCount,
    title,
  } = eachVideo

  const date = new Date(publishedAt)

  const distance = formatDistance(
    new Date(date.getFullYear(), date.getDate(), date.getMonth() + 1),
    Date.now(),
    {addSuffix: true},
  )
  const finalDate = distance.substring(distance.indexOf(distance.match(/\d+/g)))

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isLight} = value

        const titleStyles = isLight ? 'titleLight' : 'titleDark'

        return (
          <li className="video_item_container">
            <Link to={`videos/${id}`} className="link">
              <img
                src={thumbNailUrl}
                className="thumbnail_img"
                alt="thumbnail"
              />
            </Link>
            <div className="video_details_container">
              <img
                src={channelProfileImageUrl}
                className="channelImage"
                alt="channel image"
              />
              <div className="video_text_details">
                <p className={`title ${titleStyles}`}>{title}</p>
                <p className="channelName">{channelName}</p>
                <p className="views">
                  {viewCount} Views <strong>.</strong> {finalDate}
                </p>
              </div>
            </div>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default VideoItem
