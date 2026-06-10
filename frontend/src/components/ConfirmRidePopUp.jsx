import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [ otp, setOtp ] = useState('')
    const navigate = useNavigate()

    const submitHander = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                params: {
                    rideId: props.ride._id,
                    otp: otp
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.status === 200) {
                props.setConfirmRidePopupPanel(false)
                props.setRidePopupPanel(false)
                navigate('/captain-riding', { state: { ride: props.ride } })
            }
        } catch (error) {
            console.error("Failed to start ride", error)
        }
    }

    return (
        <div className="pb-4">
            <h3 className='text-2xl font-bold mb-6 tracking-tight'>Confirm this ride to Start</h3>
            
            <div className='flex items-center justify-between p-4 bg-yellow-50 rounded-2xl border border-yellow-200 mt-4 shadow-sm'>
                <div className='flex items-center gap-4'>
                    <img className='h-12 w-12 rounded-full object-cover shadow-sm' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="User Profile" />
                    <h2 className='text-lg font-bold capitalize text-gray-900'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-lg font-bold shadow-sm">
                    2.2 KM
                </div>
            </div>
            
            <div className='flex gap-4 justify-between flex-col items-center mt-6'>
                <div className='w-full bg-white rounded-2xl p-4 space-y-2 border border-gray-100 shadow-sm'>
                    <div className='flex items-center gap-4 p-3 border-b border-gray-200'>
                        <div className="bg-black text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                            <i className="ri-map-pin-user-fill"></i>
                        </div>
                        <div className="flex-1">
                            <h3 className='text-lg font-bold'>Pickup</h3>
                            <p className='text-sm text-gray-500 leading-tight'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center gap-4 p-3 border-b border-gray-200'>
                        <div className="bg-gray-200 text-black p-2 rounded-full w-8 h-8 flex items-center justify-center">
                            <i className="text-lg ri-map-pin-2-fill"></i>
                        </div>
                        <div className="flex-1">
                            <h3 className='text-lg font-bold'>Dropoff</h3>
                            <p className='text-sm text-gray-500 leading-tight'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center gap-4 p-3'>
                        <div className="bg-green-100 text-green-600 p-2 rounded-full w-8 h-8 flex items-center justify-center">
                            <i className="ri-currency-line"></i>
                        </div>
                        <div className="flex-1">
                            <h3 className='text-lg font-bold'>₹{props.ride?.fare}</h3>
                            <p className='text-sm text-gray-500'>Cash payment</p>
                        </div>
                    </div>
                </div>

                <div className='mt-6 w-full'>
                    <form onSubmit={submitHander} className="space-y-4">
                        <input 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)} 
                            type="text" 
                            className='w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-6 text-center font-mono text-2xl tracking-[0.5em] font-bold focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all' 
                            placeholder='OTP' 
                            maxLength={6}
                            required
                        />

                        <div className="flex gap-3">
                            <button onClick={(e) => {
                                e.preventDefault()
                                props.setConfirmRidePopupPanel(false)
                                props.setRidePopupPanel(false)
                            }} className='w-1/3 bg-gray-100 text-gray-700 font-semibold p-4 rounded-xl hover:bg-gray-200 transition-colors text-lg'>
                                Cancel
                            </button>
                            <button type="submit" className='w-2/3 bg-black text-white font-semibold p-4 rounded-xl shadow-lg shadow-black/20 hover:bg-gray-800 transition-colors text-lg'>
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp