export default function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_info">
        <img className="popup__icon" src={props.infoTooltipImage} alt={props.infoTooltipText} />
        <h2 className="popup__title popup__title-info">{props.infoTooltipText}</h2>
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