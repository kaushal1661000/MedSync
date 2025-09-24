import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointment = () => {

  const { backendUrl, token , getDoctorData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const months = [" ","Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "July" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " +dateArray[2]
  }

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/my-appointments', {
        headers: { token }
      })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment' , {appointmentId} , {headers:{token}})
      if (data.success) {
        toast.success(data.message)
        fetchAppointments()
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      fetchAppointments()
      // getDoctorData()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
      <div>
        {appointments.length > 0 ? (
          appointments.map((appt, index) => (
            <div
              className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'
              key={index}
            >
              <div>
                <img className='w-32 bg-indigo-50' src={appt.docData?.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{appt.docData?.name}</p>
                <p>{appt.docData?.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{appt.docData?.address?.line1}</p>
                <p className='text-xs'>{appt.docData?.address?.line2}</p>
                <p className='text-xs mt-1 '>
                  <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>{' '}
                  {slotDateFormat(appt.slotDate)} | {appt.slotTime}
                </p>
              </div>
              <div className='flex flex-col gap-2 justify-end'>
                {!appt.cancelled && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300'>
                  Pay Online
                </button>}
                {!appt.cancelled && <button onClick={()=>cancelAppointment(appt._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-500 hover:text-white transition-all duration-300'>
                  Cancel appointment
                </button>}
                {appt.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
                
              </div>
            </div>
          ))
        ) : (
          <p className='text-sm text-zinc-500 mt-4'>No appointments found</p>
        )}
      </div>
    </div>
  )
}

export default MyAppointment
