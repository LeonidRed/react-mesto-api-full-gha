import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import PopupWithForm from "./PopupWithForm"

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext)

  const [name, setName] = React.useState()
  const [description, setDescription] = React.useState()

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name: name,
      about: description,
    })
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, props.isOpen])

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="input-name"
        name="name"
        type="text"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        required
        value={name || ''}
        onChange={handleNameChange}
      />
      <span
        className="popup__input-error input-name-error">
        Вы пропустили это поле
      </span>
      <input
        className="popup__input"
        id="input-prof"
        name="prof"
        type="text"
        placeholder="Введите профессию"
        minLength="2"
        maxLength="200"
        required
        value={description || ''}
        onChange={handleDescriptionChange}
      />
      <span
        className="popup__input-error input-prof-error">
        Вы пропустили это поле
      </span>
    </PopupWithForm>
  )
}