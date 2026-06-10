import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (error) {
      console.error("Signup failed", error)
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }

  return (
    <div className='min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-3xl premium-shadow overflow-hidden p-10'>
        <div className='mb-8 flex justify-center'>
          <h1 className='text-3xl font-bold tracking-tight'>Uber</h1>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div className='flex gap-4'>
            <div className="space-y-1 w-1/2">
              <label className='text-sm font-medium text-gray-700 ml-1'>First Name</label>
              <input
                required
                className='w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all'
                type="text"
                placeholder='John'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-1 w-1/2">
              <label className='text-sm font-medium text-gray-700 ml-1'>Last Name</label>
              <input
                required
                className='w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all'
                type="text"
                placeholder='Doe'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

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

          <button className='w-full bg-black text-white font-medium py-3.5 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 mt-2'>
            Create account
          </button>
        </form>

        <p className='text-center text-sm text-gray-500 mt-6'>
          Already have an account? <Link to='/login' className='text-black font-semibold hover:underline'>Login here</Link>
        </p>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className='text-xs text-gray-400 leading-relaxed'>
            This site is protected by reCAPTCHA and the <br/>
            <span className='underline cursor-pointer hover:text-gray-600'>Google Privacy Policy</span> and <span className='underline cursor-pointer hover:text-gray-600'>Terms of Service</span> apply.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup