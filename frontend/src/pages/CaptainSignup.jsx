import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'

const CaptainSignup = () => {

  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')

  const { setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: { firstname: firstName, lastname: lastName },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
    } catch (error) {
      console.error("Captain signup failed", error)
      alert("Signup failed: " + (error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message))
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div className='min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 py-8'>
      <div className='w-full max-w-lg bg-white rounded-3xl premium-shadow overflow-hidden p-10'>
        <div className='mb-8 flex justify-center items-center gap-2'>
          <i className="ri-steering-2-fill text-3xl text-accent"></i>
          <h1 className='text-3xl font-bold tracking-tight'>Uber Captain</h1>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div className='flex gap-4'>
            <div className="space-y-1 w-1/2">
              <label className='text-sm font-medium text-gray-700 ml-1'>First Name</label>
              <input
                required
                className='w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all'
                type="text"
                placeholder='Captain'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-1 w-1/2">
              <label className='text-sm font-medium text-gray-700 ml-1'>Last Name</label>
              <input
                required
                className='w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all'
                type="text"
                placeholder='Marvel'
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

          <div className="pt-4 pb-2">
            <h3 className='text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2'>Vehicle Information</h3>
          </div>

          <div className='flex gap-4'>
            <div className="space-y-1 w-1/2">
              <label className='text-xs font-medium text-gray-700 ml-1'>Vehicle Color</label>
              <input
                required
                className='w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all'
                type="text"
                placeholder='e.g. White'
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
            </div>
            <div className="space-y-1 w-1/2">
              <label className='text-xs font-medium text-gray-700 ml-1'>License Plate</label>
              <input
                required
                className='w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all'
                type="text"
                placeholder='DL 01 AB 1234'
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
              />
            </div>
          </div>

          <div className='flex gap-4'>
            <div className="space-y-1 w-1/2">
              <label className='text-xs font-medium text-gray-700 ml-1'>Capacity (Persons)</label>
              <input
                required
                className='w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all'
                type="number"
                placeholder='4'
                min="1"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
              />
            </div>
            <div className="space-y-1 w-1/2">
              <label className='text-xs font-medium text-gray-700 ml-1'>Vehicle Type</label>
              <select
                required
                className='w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none'
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="" disabled>Select Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Moto</option>
              </select>
            </div>
          </div>

          <button className='w-full bg-accent text-white font-medium py-3.5 rounded-xl hover:bg-accent/90 transition-colors shadow-lg shadow-accent/30 mt-4'>
            Create Captain Account
          </button>
        </form>

        <p className='text-center text-sm text-gray-500 mt-6'>
          Already have an account? <Link to='/captain-login' className='text-accent font-semibold hover:underline'>Login here</Link>
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

export default CaptainSignup