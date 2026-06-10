import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div className="pb-4">
            <div className="flex justify-between items-center mb-6">
                <h3 className='text-2xl font-bold tracking-tight'>Choose a Vehicle</h3>
                <button onClick={() => props.setVehiclePanel(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-full transition-colors">
                    <i className="ri-arrow-left-line text-xl"></i>
                </button>
            </div>
            
            <div className="space-y-3">
                <div onClick={() => {
                    props.setConfirmRidePanel(true)
                    props.selectVehicle('car')
                }} className='flex border-2 border-transparent hover:border-black bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer rounded-2xl w-full p-4 items-center justify-between'>
                    <img className='h-12 object-contain mix-blend-multiply' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="UberGo" />
                    <div className='ml-4 w-1/2'>
                        <h4 className='font-bold text-lg flex items-center gap-2'>UberGo <span className="text-sm font-medium text-gray-600 flex items-center"><i className="ri-user-3-fill mr-1"></i>4</span></h4>
                        <h5 className='font-medium text-sm text-gray-800'>2 mins away</h5>
                        <p className='font-normal text-xs text-gray-500 mt-0.5'>Affordable, compact rides</p>
                    </div>
                    <h2 className='text-xl font-bold'>₹{props.fare.car}</h2>
                </div>

                <div onClick={() => {
                    props.setConfirmRidePanel(true)
                    props.selectVehicle('moto')
                }} className='flex border-2 border-transparent hover:border-black bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer rounded-2xl w-full p-4 items-center justify-between'>
                    <img className='h-12 object-contain mix-blend-multiply' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="Moto" />
                    <div className='ml-4 w-1/2'>
                        <h4 className='font-bold text-lg flex items-center gap-2'>Moto <span className="text-sm font-medium text-gray-600 flex items-center"><i className="ri-user-3-fill mr-1"></i>1</span></h4>
                        <h5 className='font-medium text-sm text-gray-800'>3 mins away</h5>
                        <p className='font-normal text-xs text-gray-500 mt-0.5'>Affordable motorcycle rides</p>
                    </div>
                    <h2 className='text-xl font-bold'>₹{props.fare.moto}</h2>
                </div>

                <div onClick={() => {
                    props.setConfirmRidePanel(true)
                    props.selectVehicle('auto')
                }} className='flex border-2 border-transparent hover:border-black bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer rounded-2xl w-full p-4 items-center justify-between'>
                    <img className='h-12 object-contain mix-blend-multiply' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="Auto" />
                    <div className='ml-4 w-1/2'>
                        <h4 className='font-bold text-lg flex items-center gap-2'>UberAuto <span className="text-sm font-medium text-gray-600 flex items-center"><i className="ri-user-3-fill mr-1"></i>3</span></h4>
                        <h5 className='font-medium text-sm text-gray-800'>3 mins away</h5>
                        <p className='font-normal text-xs text-gray-500 mt-0.5'>Affordable Auto rides</p>
                    </div>
                    <h2 className='text-xl font-bold'>₹{props.fare.auto}</h2>
                </div>
            </div>
        </div>
    )
}

export default VehiclePanel