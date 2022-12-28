import {Component} from 'react'
import './App.css'
import {v4} from 'uuid'
import PasswordItem from './Components/PasswordItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'orange',
  'emerald',
  'teal',
  'red',
]

class App extends Component {
  state = {
    websiteInput: '',
    userNameInput: '',
    passwordInput: '',
    passwordsList: [],
    isChecked: false,
    searchInput: '',
  }

  onDelete = passwordId => {
    const {passwordsList} = this.state
    this.setState({
      passwordsList: passwordsList.filter(
        password => password.id !== passwordId,
      ),
    })
  }

  clickingCheckbox = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
    const {isChecked} = this.state
    return isChecked
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, userNameInput, passwordInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newPassword = {
      id: v4(),
      website: websiteInput,
      userName: userNameInput,
      password: passwordInput,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      userNameInput: '',
      passwordInput: '',
    }))
  }

  onChangeWebsiteInput = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onChangeUserNameInput = event => {
    this.setState({
      userNameInput: event.target.value,
    })
  }

  onChangePasswordInput = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {
      websiteInput,
      userNameInput,
      passwordInput,
      passwordsList,
      isChecked,
      searchInput,
    } = this.state

    const searchResults = passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const zeroPasswordList = searchResults.length === 0

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-manger-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            id="main-image"
            className="image"
          />
          <form className="form" onSubmit={this.onAddPassword}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="icon-input-container">
              <button type="button" className="icon-button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icon"
                />
              </button>
              <input
                type="text"
                placeholder="Enter Website"
                className="input"
                onChange={this.onChangeWebsiteInput}
                value={websiteInput}
              />
            </div>
            <div className="icon-input-container">
              <button type="button" className="icon-button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icon"
                />
              </button>
              <input
                type="text"
                placeholder="Enter Username"
                className="input"
                onChange={this.onChangeUserNameInput}
                value={userNameInput}
              />
            </div>
            <div className="icon-input-container">
              <button type="button" className="icon-button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="icon"
                />
              </button>
              <input
                type="password"
                placeholder="Enter Password"
                className="input"
                onChange={this.onChangePasswordInput}
                value={passwordInput}
              />
            </div>
            <div className="addBtn-container">
              <button type="submit" className="add-button">
                ADD
              </button>
            </div>
          </form>
        </div>
        <div className="passwords-view-container">
          <div className="password-count-search-container">
            <div className="password-text-count-container">
              <h1 className="heading">Your Passwords</h1>
              <p className="password-count">{passwordsList.length}</p>
            </div>
            <div className="icon-input-container">
              <button type="button" className="search-icon-button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
              </button>
              <input
                type="search"
                className="search-input"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="check-box"
              className="check-box"
              onClick={this.clickingCheckbox}
            />
            <label htmlFor="check-box" className="label-text">
              Show Passwords
            </label>
          </div>
          <ul className="password-list-container">
            {zeroPasswordList ? (
              <div className="no-passwords-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-img"
                />
                <p className="no-passwords-text">No Passwords</p>
              </div>
            ) : (
              searchResults.map(eachPassword => (
                <PasswordItem
                  passwordDetails={eachPassword}
                  key={eachPassword.id}
                  deletePassword={this.onDelete}
                  checked={isChecked}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}
export default App
