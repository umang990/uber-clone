import React from 'react'

const ConfirmRide = (props) => {
    return (
        <div className="pb-4">
            <div className="flex justify-between items-center mb-6">
                <h3 className='text-2xl font-bold tracking-tight'>Confirm your Ride</h3>
                <button onClick={() => props.setConfirmRidePanel(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-full transition-colors">
                    <i className="ri-arrow-left-line text-xl"></i>
                </button>
            </div>

            <div className='flex gap-4 justify-between flex-col items-center'>
                <img className='h-24 mix-blend-multiply drop-shadow-md' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Vehicle" />
                
                <div className='w-full mt-2 bg-gray-50 rounded-2xl p-4 space-y-2 border border-gray-100'>
                    <div className='flex items-center gap-4 p-3 border-b border-gray-200'>
                        <div className="bg-black text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                            <i className="ri-map-pin-user-fill"></i>
                        </div>
                        <div className="flex-1">
                            <h3 className='text-lg font-bold'>Pickup</h3>
                            <p className='text-sm text-gray-500 leading-tight'>{props.pickup}</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center gap-4 p-3 border-b border-gray-200'>
                        <div className="bg-gray-200 text-black p-2 rounded-full w-8 h-8 flex items-center justify-center">
                            <i className="text-lg ri-map-pin-2-fill"></i>
                        </div>
                        <div className="flex-1">
                            <h3 className='text-lg font-bold'>Dropoff</h3>
                            <p className='text-sm text-gray-500 leading-tight'>{props.destination}</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center gap-4 p-3'>
                        <div className="bg-green-100 text-green-600 p-2 rounded-full w-8 h-8 flex items-center justify-center">
                            <i className="ri-currency-line"></i>
                        </div>
                        <div className="flex-1">
                            <h3 className='text-lg font-bold'>₹{props.fare[ props.vehicleType ]}</h3>
                            <p className='text-sm text-gray-500'>Cash payment</p>
                        </div>
                    </div>
                </div>
                
                <button onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide()
                }} className='w-full mt-4 bg-black text-white font-semibold p-4 rounded-xl shadow-lg shadow-black/20 hover:bg-gray-800 transition-colors text-lg'>
                    Confirm Ride
                </button>
            </div>
        </div>
    )
}

export default ConfirmRide