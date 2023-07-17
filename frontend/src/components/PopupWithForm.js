export default function PopupWithForm(props) {

  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form
          className="popup__form popup__form-profile"
          action="#"
          name={`popup-${props.name}-form`}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            className="popup__button-save"
            type="submit"
          >
            {props.buttonText}
          </button>
        </form>
      </div>
      <button
        className={`popup__button-exit popup__button-${props.name}`}
        type="button"
        aria-label="Кнопка закрыть окно редактирования"
        onClick={props.onClose}>
      </button>
    </div >
  )
}