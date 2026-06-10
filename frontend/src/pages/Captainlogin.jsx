import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const Captainlogin = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const { setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = { email, password }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
      if (response.status === 200) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
    } catch (error) {
      console.error("Captain login failed", error)
      alert("Login failed: " + (error.response?.data?.message || error.message))
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-3xl premium-shadow overflow-hidden p-10'>
        <div className='mb-10 flex justify-center items-center gap-2'>
          <i className="ri-steering-2-fill text-3xl text-accent"></i>
          <h1 className='text-3xl font-bold tracking-tight'>Uber Captain</h1>
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
                className='w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all'
                type="email"
                placeholder='captain@example.com'
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
                className='w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all'
                type="password"
                placeholder='••••••••'
              />
            </div>
          </div>

          <button className='w-full bg-accent text-white font-medium py-3.5 rounded-xl hover:bg-accent/90 transition-colors shadow-lg shadow-accent/30'>
            Login as Captain
          </button>
        </form>

        <p className='text-center text-sm text-gray-500 mt-8'>
          Join our fleet? <Link to='/captain-signup' className='text-accent font-semibold hover:underline'>Register as a Captain</Link>
        </p>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <Link
            to='/login'
            className='w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 font-semibold py-3.5 rounded-xl hover:bg-gray-200 transition-colors'
          >
            <i className="ri-user-3-line"></i>
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Captainlogin