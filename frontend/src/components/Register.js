import React from 'react'
import { Link } from "react-router-dom"

export default function Register(props) {

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // здесь обработчик регистрации
    const { email, password } = formValue
    props.onRegister(email, password)
  }

  return (
    <section className="authorization">
      <h2 className="authorization__title">Регистрация</h2>
      <form className="authorization__form" onSubmit={handleSubmit}>
        <input className="authorization__input" type="email" placeholder="Email" name="email" value={formValue.email} onChange={handleChange} required />
        <input className="authorization__input" type="password" placeholder="Пароль" name="password" value={formValue.password} onChange={handleChange} required />
        <button className="authorization__submit" type="submit">Зарегистрироваться</button>
      </form>
      <p className="authorization__text">Уже зарегистрированы? <Link to="/sign-in" className="authorization__link" >Войти</Link> </p>
    </section>
  )
}