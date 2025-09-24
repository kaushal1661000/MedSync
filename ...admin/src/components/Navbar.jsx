import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
const Navbar = () => {

    const {atoken,setatoken} = useContext(AdminContext)

    const navigate = useNavigate()

    const logout = ()=>{
      navigate('/')
      atoken && setatoken('')
      atoken && localStorage.removeItem('atoken')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-1 text-xs'>
        <img src={assets.homelogo4} className="h-30 w-70 object-cover cursor-pointer" alt="" />
        <p className='border px-2.5 py-0.5 mt-5 text-sm rounded-full text-gray-600 border-gray-500'>{atoken? 'Admin':'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
