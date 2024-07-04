import './index.css'

const LanguageFilterItem = props => {
  const {content, isActive, tabChange} = props
  const {id, language} = content
  const active = isActive ? 'tab-item blue' : 'tab-item'

  const tabClicked = () => {
    tabChange(id)
  }

  return (
    <li>
      <button className={active} onClick={tabClicked} type="button">
        <p className="tab-text">{language}</p>
      </button>
    </li>
  )
}

export default LanguageFilterItem
