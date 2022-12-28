import './index.css'

const PasswordItem = props => {
  const {passwordDetails, checked} = props
  const {website, userName, initialClassName, id, password} = passwordDetails
  const initial = website ? website[0].toUpperCase() : ''

  const onDeletePasswordItem = () => {
    const {deletePassword} = props
    deletePassword(id)
  }

  return (
    <li className="password-item">
      <div className="password-container">
        <div className="initialName-password-details-container">
          <div className={initialClassName}>
            <p className="initial">{initial}</p>
          </div>
          <div>
            <p className="website-text">{website}</p>
            <p className="username-text">{userName}</p>
            {checked ? (
              <p className="password-text">{password}</p>
            ) : (
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                alt="stars"
                className="stars"
              />
            )}
          </div>
        </div>
        <div>
          <button
            type="button"
            className="delete-button"
            onClick={onDeletePasswordItem}
            testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
              className="delete-icon"
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default PasswordItem
