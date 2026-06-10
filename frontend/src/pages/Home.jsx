import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
    const [ pickup, setPickup ] = useState('')
    const [ destination, setDestination ] = useState('')
    
    // Panel States for Sidebar Conditional Rendering
    const [ panelOpen, setPanelOpen ] = useState(false)
    const [ vehiclePanel, setVehiclePanel ] = useState(false)
    const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
    const [ vehicleFound, setVehicleFound ] = useState(false)
    const [ waitingForDriver, setWaitingForDriver ] = useState(false)
    
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
    const [ fare, setFare ] = useState({})
    const [ vehicleType, setVehicleType ] = useState(null)
    const [ ride, setRide ] = useState(null)

    const navigate = useNavigate()

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })

        socket.on('connect', () => {
            socket.emit("join", { userType: "user", userId: user._id })
        })

        return () => {
            socket.off('connect')
        }
    }, [ user, socket ])

    useEffect(() => {
        socket.on('ride-confirmed', ride => {
            setVehicleFound(false)
            setWaitingForDriver(true)
            setRide(ride)
        })

        socket.on('ride-started', ride => {
            setWaitingForDriver(false)
            navigate('/riding', { state: { ride } })
        })

        return () => {
            socket.off('ride-confirmed')
            socket.off('ride-started')
        }
    }, [ socket ])

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setFare(response.data)
    }

    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    return (
        <div className='h-screen flex flex-col md:flex-row overflow-hidden bg-gray-100'>
            
            {/* Left Panel - Sidebar */}
            <div className='w-full md:w-[450px] flex-shrink-0 bg-white shadow-2xl z-20 flex flex-col overflow-y-auto relative h-full'>
                <div className="p-6 pb-2 shrink-0">
                    <h1 className="text-3xl font-bold tracking-tight text-black">Uber</h1>
                </div>

                <div className="flex-1 p-6 flex flex-col relative overflow-y-auto">
                    {/* State: Waiting For Driver */}
                    {waitingForDriver && (
                        <WaitingForDriver
                            ride={ride}
                            setVehicleFound={setVehicleFound}
                            setWaitingForDriver={setWaitingForDriver}
                            waitingForDriver={waitingForDriver} 
                        />
                    )}

                    {/* State: Looking For Driver */}
                    {!waitingForDriver && vehicleFound && (
                        <LookingForDriver
                            createRide={createRide}
                            pickup={pickup}
                            destination={destination}
                            fare={fare}
                            vehicleType={vehicleType}
                            setVehicleFound={setVehicleFound} 
                        />
                    )}

                    {/* State: Confirm Ride */}
                    {!waitingForDriver && !vehicleFound && confirmRidePanel && (
                        <ConfirmRide
                            createRide={createRide}
                            pickup={pickup}
                            destination={destination}
                            fare={fare}
                            vehicleType={vehicleType}
                            setConfirmRidePanel={setConfirmRidePanel} 
                            setVehicleFound={setVehicleFound} 
                        />
                    )}

                    {/* State: Select Vehicle */}
                    {!waitingForDriver && !vehicleFound && !confirmRidePanel && vehiclePanel && (
                        <VehiclePanel
                            selectVehicle={setVehicleType}
                            fare={fare} 
                            setConfirmRidePanel={setConfirmRidePanel} 
                            setVehiclePanel={setVehiclePanel} 
                        />
                    )}

                    {/* State: Search Initial Panel */}
                    {!waitingForDriver && !vehicleFound && !confirmRidePanel && !vehiclePanel && (
                        <div className="flex-1 flex flex-col relative">
                            {panelOpen && (
                                <button onClick={() => setPanelOpen(false)} className='absolute right-0 -top-2 bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-full transition-colors z-10'>
                                    <i className="ri-arrow-down-s-line text-xl"></i>
                                </button>
                            )}
                            
                            <h4 className='text-2xl font-bold mb-6 tracking-tight'>Find a trip</h4>
                            
                            <form className='relative space-y-4 shrink-0' onSubmit={submitHandler}>
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 h-16 w-[2px] bg-gray-300 rounded-full flex flex-col justify-between items-center py-1">
                                    <div className="w-2 h-2 rounded-full bg-black -ml-[3px]"></div>
                                    <div className="w-2 h-2 rounded-sm bg-black -ml-[3px]"></div>
                                </div>

                                <div className="relative">
                                    <input
                                        onClick={() => { setPanelOpen(true); setActiveField('pickup') }}
                                        value={pickup}
                                        onChange={handlePickupChange}
                                        className='w-full bg-gray-50 border border-gray-200 px-12 py-3.5 text-sm font-medium rounded-xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all'
                                        type="text"
                                        placeholder='Add a pick-up location'
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        onClick={() => { setPanelOpen(true); setActiveField('destination') }}
                                        value={destination}
                                        onChange={handleDestinationChange}
                                        className='w-full bg-gray-50 border border-gray-200 px-12 py-3.5 text-sm font-medium rounded-xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all'
                                        type="text"
                                        placeholder='Enter your destination' 
                                    />
                                </div>
                            </form>

                            <button
                                onClick={findTrip}
                                className='bg-black text-white font-medium px-4 py-3.5 rounded-xl mt-6 w-full shadow-md hover:bg-gray-800 transition-colors shrink-0'>
                                Find Trip
                            </button>

                            {/* Search Results */}
                            {panelOpen && (
                                <div className='mt-6 overflow-y-auto flex-1'>
                                    <LocationSearchPanel
                                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                                        setPanelOpen={setPanelOpen}
                                        setVehiclePanel={setVehiclePanel}
                                        setPickup={setPickup}
                                        setDestination={setDestination}
                                        activeField={activeField}
                                    />
                                </div>
                            )}
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

export default Home