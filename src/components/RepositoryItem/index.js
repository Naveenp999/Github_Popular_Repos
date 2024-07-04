import './index.css'

const RepositoryItem = props => {
  const {content} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = content
  return (
    <li className="tab-item-container">
      <img src={avatarUrl} alt={name} className="item-icon" />
      <h1 className="name">{name}</h1>
      <div className="item-subcontainer">
        <div className="horizantal">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="badges"
          />
          <p className="text">{`${starsCount} stars`}</p>
        </div>
        <div className="horizantal">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="badges"
          />
          <p className="text">{`${forksCount} forks`}</p>
        </div>
        <div className="horizantal">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
            alt="open issues"
            className="badges"
          />
          <p className="text">{`${issuesCount} open issues`}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
