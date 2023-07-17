import React from "react"
import PopupWithForm from "./PopupWithForm"

export default function EditAvatarPopup(props) {
  const ref = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()

    props.onUpdateAvatar({
      avatar: ref.current.value
    })
  }

  React.useEffect(() => {
    ref.current.value = ""
  }, [props.isOpen])

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={ref}
        className="popup__input"
        id="input-link-avatar"
        name="link" type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error input-link-avatar-error">
        Вы пропустили это поле
      </span>
    </PopupWithForm>
  )
}