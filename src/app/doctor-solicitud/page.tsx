import React from 'react'

function DoctorSolicitud() {
  return (
   

<div className=" m-3 justify-center w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Solicitudes Pendientes</h5>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            Ver todas
        </a>
   </div>
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="/Pediatria.jpg" alt="Michael image" />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Michael Gough
                        </p>
                        <p className="text-sm text-gray-500 text-justify dark:text-gray-400">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo excepturi aperiam dicta ea nihil aut est qui neque sequi. Architecto voluptatem, expedita consequatur vitae et quam natus doloremque deleniti necessitatibus.
                        </p>
                    </div>
                    <div className="m-3 flex flex-col font-semibold text-gray-900 dark:text-white">
                        <button className='btn bg-blue-700 hover:bg-blue-900 text-white mb-1' >Acceptar</button>
                        <button className='btn bg-red-700 hover:bg-red-900 text-white'>Rechazar</button>
                    </div>
                </div>
            </li>
        </ul>
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="/dermatologia.jpeg" alt="Michael image" />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Juan Alvarez
                        </p>
                        <p className="text-sm text-gray-500 text-justify dark:text-gray-400">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo excepturi aperiam dicta ea nihil aut est qui neque sequi. Architecto voluptatem, expedita consequatur vitae et quam natus doloremque deleniti necessitatibus.
                        </p>
                    </div>
                    <div className="m-3 flex flex-col font-semibold text-gray-900 dark:text-white">
                        <button className='btn bg-blue-700 hover:bg-blue-900 text-white mb-1' >Acceptar</button>
                        <button className='btn bg-red-700 hover:bg-red-900 text-white'>Rechazar</button>
                    </div>
                </div>
            </li>
        </ul>
   </div>
</div>

  )
}

export default DoctorSolicitud