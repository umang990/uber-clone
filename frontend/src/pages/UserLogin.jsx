import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserLogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  
  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = { email, password }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
      if (response.status === 200) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (error) {
      console.error("Login failed:", error)
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-3xl premium-shadow overflow-hidden p-10'>
        <div className='mb-10 flex justify-center'>
          <h1 className='text-3xl font-bold tracking-tight'>Uber</h1>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-1">
            <label className='text-sm font-medium text-gray-700 ml-1'>Email</label>
            <div className="relative">
              <i className="ri-mail-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all'
                type="email"
                placeholder='name@example.com'
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className='text-sm font-medium text-gray-700 ml-1'>Password</label>
            <div className="relative">
              <i className="ri-lock-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all'
                type="password"
                placeholder='••••••••'
              />
            </div>
          </div>

          <button className='w-full bg-black text-white font-medium py-3.5 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/20'>
            Login
          </button>
        </form>

        <p className='text-center text-sm text-gray-500 mt-8'>
          New here? <Link to='/signup' className='text-black font-semibold hover:underline'>Create account</Link>
        </p>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <Link
            to='/captain-login'
            className='w-full flex items-center justify-center gap-2 bg-accent/10 text-accent font-semibold py-3.5 rounded-xl hover:bg-accent/20 transition-colors'
          >
            <i className="ri-steering-2-line"></i>
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserLogin