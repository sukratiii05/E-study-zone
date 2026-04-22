import React, { useState } from 'react'
import img from '../../assets/images/img.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const change = (e) => {
    setData(() => ({ ...data, [e.target.name]: e.target.value }))
  }

  const Navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5001/api/user/login', data)
      alert("Login Successfully")

      if (res.data.msg == "Login Successfully") {
        localStorage.setItem('name', res.data.data.name)
        localStorage.setItem('email', res.data.data.email)
        localStorage.setItem('id', res.data.data.id)
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('role', res.data.data.role)

        if (res.data.data.role == "Trainer") {
          Navigate('/trainerdashboard')
        } else if (res.data.data.role == "Learner") {
          Navigate('/userdashboard')
        }
      }
    } catch (er) {
      console.log(er)
      alert("Sorry try again.")
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">

        {/* LEFT */}
        <div className="left-panel">
          <h1>📘 E-Study</h1>
          <img src={img} alt="study" />
          <p>Upgrade your skills. Learn smarter.</p>
        </div>

        {/* RIGHT */}
        <div className="right-panel">
          <form onSubmit={handleSubmit}>
            <h2>Welcome Back</h2>

            <div className="field">
              <input type="text" name="email" required onChange={change} />
              <label>Email Address</label>
            </div>

            <div className="field">
              <input type="password" name="password" required onChange={change} />
              <label>Password</label>
            </div>

            <button type="submit">Login</button>

            <div className="links">
              <a href="#">Forgot Password?</a>
              <a href="http://localhost:5173/register">Create account</a>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Login