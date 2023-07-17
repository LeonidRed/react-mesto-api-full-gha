import logo from "../images/logo.svg"
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
      <div className="header__user">
        <p className="header__user-email">{props.userEmail}</p>
        <Link to={props.userLink} className="header__user-status" onClick={props.userSignOut}>{props.userStatus}</Link>
      </div>
    </header>
  )
}