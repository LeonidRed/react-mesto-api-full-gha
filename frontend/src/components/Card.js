import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext)

  const isOwn = props.card.owner === currentUser._id
  const isLiked = props.card.likes.some(i => i === currentUser._id)


  const cardLikeButtonClassName = (
    `element__area-like ${isLiked && 'element__area-like_active'}`
  );

  function handleClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <li className="element">
      {isOwn && <button className='element__button-del' onClick={handleDeleteClick} type="button" aria-label="Кнопка удалить" />}
      <img className="element__picture" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="element__area">
        <h2 className="element__area-title">{props.card.name}</h2>
        <div className="element__area-like-section">
          <button className={cardLikeButtonClassName} type="button" aria-label="Кнопка нравится" onClick={handleLikeClick}></button>
          <p className="element__area-like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}