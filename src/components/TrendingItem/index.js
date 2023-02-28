/* eslint-disable jsx-a11y/img-redundant-alt */
import './index.css'
import {formatDistance} from 'date-fns'
import {Link} from 'react-router-dom'
import ThemeContext from '../context/ThemeContext'

const TrendingItem = props => {
  const {eachVideo} = props
  const {
    id,
    channelName,
    publishedAt,
    thumbnailUrl,
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

        const titleStyles = isLight ? 'trendingtitleLight' : 'titleDark'

        return (
          <li className="trending_video_item_container">
            <Link to={`videos/${id}`} className="trending_link">
              <img
                src={thumbnailUrl}
                className="trending_thumbnail_img"
                alt="video thumbnail"
              />
            </Link>
            <div className="trending_video_details_container">
              <div className="trending_video_text_details">
                <p className={`trendingTitle ${titleStyles}`}>{title}</p>
                <p className="channelName">{channelName}</p>
                <div className="published">
                  <p className="views">
                    {viewCount} Views <strong>.</strong>
                  </p>
                  <p className="views">{finalDate}</p>
                </div>
              </div>
            </div>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default TrendingItem
