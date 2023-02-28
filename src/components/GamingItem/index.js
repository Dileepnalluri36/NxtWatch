import './index.css'
import {Link} from 'react-router-dom'
import ThemeContext from '../context/ThemeContext'

const GamingItem = props => {
  const {eachVideo} = props
  const {id, thumbNailUrl, viewCount, title} = eachVideo
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isLight} = value
        const titleStyles = isLight ? 'trendingtitleLight' : 'titleDark'
        return (
          <li className="gaming_item_container">
            <Link to={`videos/${id}`} className="trending_link">
              <img
                src={thumbNailUrl}
                className="gamingImg"
                alt="video thumbnail"
              />
            </Link>
            <p className={`gamingTitle ${titleStyles}`}>{title}</p>
            <p className="gamingViews">{viewCount} Watching WorldWide</p>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default GamingItem
