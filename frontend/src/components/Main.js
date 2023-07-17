import React from "react"
import Card from "./Card"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)

  const onEditAvatar = props.onEditAvatar
  const onEditProfile = props.onEditProfile
  const onAddPlace = props.onAddPlace
  const onCardClick = props.onCardClick
  const cards = props.cards
  const onCardLike = props.onCardLike
  const onCardDelete = props.onCardDelete

  return (
    <main className="content">

      {/* <!-- ------------- profile start ------------ --> */}
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-image" src={currentUser.avatar} alt="Аватар автора" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__info-name">{currentUser.name}</h1>
          <p className="profile__info-profession">{currentUser.about}</p>
        </div>
        <button className="profile__button-edit" type="button" aria-label="Кнопка редактирования профиля" onClick={onEditProfile}> </button>
        <button className="profile__button-add" type="button" aria-label="Кнопка добавления фото" onClick={onAddPlace}> </button>
      </section>
      {/* <!-- ------------- profile end ------------ --> */}

      {/* <!-- ------------- elements start ------------ --> */}
      <section className="cards" aria-label="Фото природы России">
        <ul className="elements">
          {cards.map(card => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
            // ))
          )).reverse()
          }
        </ul>

      </section>
      {/* <!-- ------------- elements end ------------ --> */}
    </main >
  )
}