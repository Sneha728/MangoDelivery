import React from 'react'
import logo from "../assets/logo2.jpg";
import user from "../assets/admin.png";
const Navbar = () => {
  return (
    <div className='flex items-center w-full justify-between sm:px-10 border-b-1 py-2 border-b-slate-100 px-4 shadow-md'>
        <div className='flex flex-col justify-start   '>
        <div className="flex items-center sm:gap-2 gap-1">
          <img src={logo} alt="logo" className="w-9 sm:w-12 mt-1" />
          <h2 className="text-orange-500 font-semibold text-xl sm:text-3xl sm:font-bold">MangoExpress</h2>
          
        </div>
        <div className='flex items-center '>
        <p className='ml-8 sm:ml-16 sm:text-md text-sm'>Admin Panel</p>
        </div>

        </div>
       
        
        <div className='flex items-center '>
             <img src={user} alt='' className='sm:size-13 size-9  rounded-full'/>
        </div>
    
      
    </div>
  )
}

export default Navbar
