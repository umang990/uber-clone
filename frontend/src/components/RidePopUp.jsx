import React from 'react'

const RidePopUp = (props) => {
    return (
        <div className="pb-4">
            <h3 className='text-2xl font-bold mb-6 tracking-tight'>New Ride Available!</h3>
            
            <div className='flex items-center justify-between p-4 bg-yellow-50 rounded-2xl border border-yellow-200 mt-4 shadow-sm'>
                <div className='flex items-center gap-4'>
                    <img className='h-12 w-12 rounded-full object-cover shadow-sm' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="User Profile" />
                    <h2 className='text-lg font-bold capitalize text-gray-900'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
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
                
                <div className='mt-6 w-full space-y-3'>
                    <button onClick={() => {
                        props.setConfirmRidePopupPanel(true)
                        props.confirmRide()
                    }} className='w-full bg-black text-white font-semibold p-4 rounded-xl shadow-lg shadow-black/20 hover:bg-gray-800 transition-colors text-lg'>
                        Accept Ride
                    </button>

                    <button onClick={() => {
                        props.setRidePopupPanel(false)
                    }} className='w-full bg-gray-100 text-gray-700 font-semibold p-4 rounded-xl hover:bg-gray-200 transition-colors text-lg'>
                        Ignore
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp