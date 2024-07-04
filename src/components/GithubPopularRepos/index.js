import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusList = [
  {loading: 'LOADING'},
  {success: 'SUCCESS'},
  {failure: 'FAILURE'},
]

class GithubPopularRepos extends Component {
  state = {
    tabId: languageFiltersData[0].id,
    tabItems: [],
    status: statusList[0].loading,
  }

  componentDidMount() {
    this.getitemsfromServer()
  }

  getitemsfromServer = async () => {
    const {tabId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${tabId}`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const newlist = data.popular_repos.map(element => ({
        name: element.name,
        id: element.id,
        issuesCount: element.issues_count,
        forksCount: element.forks_count,
        starsCount: element.stars_count,
        avatarUrl: element.avatar_url,
      }))
      this.setState({tabItems: newlist, status: statusList[1].success})
    } else {
      this.setState({status: statusList[2].failure})
    }
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderlistItems = () => {
    const {tabItems} = this.state
    return (
      <ul className="list-container">
        {tabItems.map(element => (
          <RepositoryItem content={element} key={element.id} />
        ))}
      </ul>
    )
  }

  tabClicked = ide =>
    this.setState(
      {tabId: ide, status: statusList[0].loading},
      this.getitemsfromServer,
    )

  renderFail = () => (
    <div className="failure-icon-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-icon"
      />
    </div>
  )

  selectOne = () => {
    const {status} = this.state
    switch (status) {
      case statusList[0].loading:
        return this.renderLoading()
      case statusList[1].success:
        return this.renderlistItems()
      case statusList[2].failure:
        return this.renderFail()
      default:
        return <></>
    }
  }

  render() {
    const {tabId} = this.state
    return (
      <div className="menu">
        <div className="menu-content-container">
          <h1 className="heading">Popular</h1>
          <ul className="tab-container">
            {languageFiltersData.map(element => (
              <LanguageFilterItem
                content={element}
                isActive={element.id === tabId}
                key={element.id}
                tabChange={this.tabClicked}
              />
            ))}
          </ul>
          {this.selectOne()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
