import React from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import PopupWithForm from "./PopupWithForm"
import ImagePopup from "./ImagePopup"
import { api } from "../utils/Api"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"
import Register from "./Register"
import Login from "./Login"
import ProtectedRoute from "./ProtectedRoute"
import InfoTooltip from "./InfoTooltip"
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import * as auth from '../utils/auth.js'
import goodAuth from "../images/goodAuth.png"
import badAuth from "../images/badAuth.png"


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' })
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [isLogged, setIsLogged] = React.useState(false)
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false)
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = React.useState('')
  const [tooltipImage, setTooltipImage] = React.useState('')
  const [tooltipText, setTooltipText] = React.useState('')


  React.useEffect(() => {
    isLogged &&
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user)
          setCards(cards)
        })
        .catch(err => console.log(err))
  }, [isLogged])

  // проверка токена
  React.useEffect(() => {
    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token')
      if (jwt) {
        // проверим токен
        auth.checkToken(jwt)
          .then((res) => {
            if (res) {
              const userData = {
                email: res.email
              }
              // авторизуем пользователя
              setIsLogged(true)
              setUserEmail(userData.email)
              navigate("/", { replace: true })
            }
          })
          .catch(err => console.log(err))
      }
    } else {
      setIsLogged(false)
      setUserEmail('')
    }
  }, [navigate])


  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard({ name: `${card.name}`, link: `${card.link}` })
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some(i => i === currentUser._id)


    api.changeLikeCardStatus(card._id, !isLiked)
      .then((renewCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? renewCard : c))
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch(err => console.log(err))
  }

  function handleUpdateUser(data) {
    api.editProfile(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([...cards, newCard])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleRegisterUser(email, password) {
    auth.register(email, password)
      .then(() => {
        setInfoTooltipPopupOpen(true)
        setTooltipImage(goodAuth)
        setTooltipText('Вы успешно зарегистрировались!')
        navigate('/sign-in', { replace: true });
      })
      .catch(err => {
        setInfoTooltipPopupOpen(true)
        setTooltipImage(badAuth)
        setTooltipText('Что-то пошло не так! Попробуйте ещё раз.')
        console.log(err)
      })
  }

  function handleLoginUser(email, password) {
    auth.authorize(email, password)
      .then((token) => {
        if (token) {
          localStorage.setItem('token', token.token)
          setIsLogged(true)
          navigate('/', { replace: true })
        }
      })
      .catch(err => {
        setInfoTooltipPopupOpen(true)
        setTooltipImage(badAuth)
        setTooltipText('Что-то пошло не так! Попробуйте ещё раз.')
        console.log(err)
      })
  }

  function userSignOut() {
    localStorage.removeItem('token')
  }

  function userSignIn() {
    setUserEmail('')
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setDeleteCardPopupOpen(false)
    setInfoTooltipPopupOpen(false)
    setSelectedCard({ name: '', link: '' })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      < div className="page">
        <Routes>
          <Route path="*" element={<Navigate to={isLogged ? "/" : "/sign-in"} />} />

          <Route path="/sign-up" element={
            <>
              <Header userStatus="Войти" userLink="/sign-in" />
              <Register onRegister={handleRegisterUser} userSignIn={userSignIn} />
            </>
          } />

          <Route path="/sign-in" element={
            <>
              <Header userStatus="Регистрация" userLink="/sign-up" />
              <Login onLogin={handleLoginUser} />
            </>
          } />

          <Route path="/" element={
            <>
              <Header userEmail={userEmail} userStatus="Выйти" userLink="/sign-up" userSignOut={userSignOut} />
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleLikeClick}
                onCardDelete={handleCardDelete}
                isLogged={isLogged}
              />
            </>
          } />
        </Routes>

        {isLogged && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          infoTooltipImage={tooltipImage}
          infoTooltipText={tooltipText}
        />

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
