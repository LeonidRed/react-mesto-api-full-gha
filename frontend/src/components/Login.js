import React from 'react'

export default function Login(props) {

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
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
    if (!formValue.email || !formValue.password) {
      return
    }
    const { email, password } = formValue
    props.onLogin(email, password)
    setFormValue({ email: '', password: '' })
  }

  return (
    <section className="authorization">
      <h2 className="authorization__title">Вход</h2>
      <form className="authorization__form" onSubmit={handleSubmit}>
        <input className="authorization__input" type="email" name="email" value={formValue.email} onChange={handleChange} placeholder="Email" required />
        <input className="authorization__input" type="password" name="password" value={formValue.password} onChange={handleChange} placeholder="Пароль" required />
        <button className="authorization__submit" type="submit">Войти</button>
      </form>
    </section>
  )
}