export default function ImagePopup(props) {
  return (
    <div className={`popup popup-image ${props.card.link ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_image">
        <figure className="popup__figure">
          <img className="popup__figure-image" src={props.card.link} alt={props.card.name} />
          <figcaption className="popup__figure-caption">{props.card.name}</figcaption>
        </figure>
      </div>
      <button className="popup__button-exit" type="button" aria-label="Кнопка
    закрыть окно редактирования" onClick={props.onClose}></button>
    </div>
  )
}