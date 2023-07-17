import React from "react"
import PopupWithForm from "./PopupWithForm"

export default function EditAvatarPopup(props) {

  const [name, setName] = React.useState()
  const [link, setLink] = React.useState()

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({
      name: name,
      link: link,
    })
  }

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [props.isOpen])

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="input-title"
        name="title"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleNameChange}
        value={name || ''}
      />
      <span className="popup__input-error input-title-error">
        Вы пропустили это поле
      </span>
      <input
        className="popup__input"
        id="input-link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkChange}
        value={link || ''}
      />
      <span className="popup__input-error input-link-error">
        Вы пропустили это поле
      </span>
    </PopupWithForm>
  )
}