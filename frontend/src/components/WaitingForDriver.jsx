import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div className="pb-4 mt-2">
      <div className='flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100'>
        <img className='h-16 mix-blend-multiply' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Driver Vehicle" />
        <div className='text-right'>
          <h2 className='text-lg font-bold capitalize text-gray-800'>{props.ride?.captain.fullname.firstname}</h2>
          <h4 className='text-2xl font-black text-black tracking-wider uppercase'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-500 font-medium'>Maruti Suzuki Alto</p>
          <div className='mt-2 inline-block bg-accent text-white px-3 py-1 rounded-lg text-sm font-bold shadow-md shadow-accent/20'>
            PIN: {props.ride?.otp}
          </div>
        </div>
      </div>

      <div className='flex gap-4 justify-between flex-col items-center'>
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
      </div>
    </div>
  )
}

export default WaitingForDriver