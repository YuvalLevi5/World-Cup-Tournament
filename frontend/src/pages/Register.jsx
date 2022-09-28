import React, { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { worldCupService } from '../services/world-cup-service'

const Register = () => {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values
    console.log(password)
    console.log(confirmPassword)
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be the same", toastOptions)
      return false
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions)
      return false
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters", toastOptions)
      return false
    }
    return true
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    if (handleValidation()) {
      const { password, username } = values
      const data = await worldCupService.register(username, password)
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          'worldcup-app-user',
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  }

  return (
    <>
      <section className='form-container'>
        <form className="login-form" onSubmit={(event) => handleSubmit(event)}>
          <h2>FIFA World Cup Qatar 2022</h2>
          <input type="text" placeholder='Username' name='username' onChange={(event) => handleChange(event)} />
          <input type="password" placeholder='Password' name='password' onChange={(event) => handleChange(event)} />
          <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(event) => handleChange(event)} />
          <button className="btn" type='submit'>Create User</button>
          <span className='btn register'><NavLink to='/login'>Already have an account? Login</NavLink>  </span>
        </form>
      </section>
      <ToastContainer />
    </>
  )
}

export default Register