import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking' // Add LiveTracking if available, else placeholder map. Wait, let me check if LiveTracking works for Captain. The old code used a placeholder map. I will use the placeholder image for the right side for now as per original code.

const CaptainHome = () => {
    const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
    const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)
    const [ ride, setRide ] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })

        socket.on('connect', () => {
            socket.emit('join', {
                userId: captain._id,
                userType: 'captain'
            })
        })

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        return () => {
            clearInterval(locationInterval)
            socket.off('connect')
        }
    }, [ captain, socket ])

    useEffect(() => {
        socket.on('new-ride', (data) => {
            setRide(data)
            setRidePopupPanel(true)
        })

        return () => {
            socket.off('new-ride')
        }
    }, [ socket ])

    async function confirmRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            rideId: ride._id,
            captainId: captain._id,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)
    }

    return (
        <div className='h-screen flex flex-col md:flex-row overflow-hidden bg-gray-100'>
            
            {/* Left Panel - Sidebar */}
            <div className='w-full md:w-[450px] flex-shrink-0 bg-white shadow-2xl z-20 flex flex-col overflow-y-auto relative h-full'>
                {/* Header */}
                <div className="p-6 pb-2 shrink-0 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight text-black">Uber Captain</h1>
                    <Link to='/captain-home' className='h-10 w-10 bg-gray-100 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors'>
                        <i className="text-xl font-medium ri-logout-box-r-line text-red-500"></i>
                    </Link>
                </div>

                <div className="flex-1 p-6 flex flex-col relative overflow-y-auto">
                    
                    {/* State: Confirm Ride Popup */}
                    {confirmRidePopupPanel && (
                        <ConfirmRidePopUp
                            ride={ride}
                            setConfirmRidePopupPanel={setConfirmRidePopupPanel} 
                            setRidePopupPanel={setRidePopupPanel} 
                        />
                    )}

                    {/* State: Ride Request Popup */}
                    {!confirmRidePopupPanel && ridePopupPanel && (
                        <RidePopUp
                            ride={ride}
                            setRidePopupPanel={setRidePopupPanel}
                            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                            confirmRide={confirmRide}
                        />
                    )}

                    {/* State: Default Captain Dashboard */}
                    {!confirmRidePopupPanel && !ridePopupPanel && (
                        <div className="flex-1 flex flex-col">
                            <h4 className='text-2xl font-bold mb-6 tracking-tight'>Welcome back!</h4>
                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                <CaptainDetails />
                            </div>
                            <div className="mt-8 text-center flex-1 flex flex-col items-center justify-center text-gray-500">
                                <i className="ri-radar-line text-5xl mb-4 opacity-50 animate-pulse"></i>
                                <p className="font-medium text-lg">Waiting for ride requests...</p>
                                <p className="text-sm mt-1 opacity-70">Keep the app open to receive new rides.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel - Map */}
            <div className='flex-1 h-full relative z-10 hidden md:block bg-gray-200'>
                <LiveTracking />
            </div>

            {/* Mobile Map View (if needed) */}
            <div className='absolute inset-0 z-0 md:hidden'>
                <LiveTracking />
            </div>

        </div>
    )
}

export default CaptainHome