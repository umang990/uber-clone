import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div className="pb-4">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-accent"></span>
                    </div>
                    <h3 className='text-2xl font-bold tracking-tight'>Looking for a Driver...</h3>
                </div>
                <button onClick={() => props.setVehicleFound(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-full transition-colors" title="Cancel Search">
                    <i className="ri-close-line text-xl"></i>
                </button>
            </div>

            <div className='flex gap-4 justify-between flex-col items-center mt-8'>
                <img className='h-24 mix-blend-multiply drop-shadow-md animate-pulse' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Vehicle" />
                
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
            </div>
        </div>
    )
}

export default LookingForDriver