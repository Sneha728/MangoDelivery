import React, { useContext } from 'react'
import logo from '../assets/logo2.jpg'
import { Link } from 'react-router-dom'
import { LogOut, Home, ShoppingCart, LogIn, Package } from 'lucide-react'
import userAuthStore from '../store/userAuthStore'
import { StoreContext } from './StoreContext'

const Navbar = () => {
  const { authUser, logout } = userAuthStore()
  const {getTotalCartAmount} = useContext(StoreContext);

  return (
    <div className="flex items-center justify-between w-full p-3 sm:p-4 sm:justify-around  text-black border-b-1 border-b-white shadow-sm mb-4">
     
      <div className="flex items-center sm:gap-2 ">
        <Link to="/" className="flex items-center sm:gap-1">
          <img src={logo} alt="logo" className="w-9 sm:w-14" />
          <h2 className="text-orange-500 font-semibold text-lg sm:text-3xl sm:font-bold ">MangoExpress</h2>
        </Link>
      </div>

      <div className="flex items-center sm:gap-5 gap-3 font-medium text-sm sm:text-base">
       

        <Link to="/" className="hover:underline hover:decoration-orange-600 underline-offset-8 flex items-center gap-1">
          <Home className="w-5 h-5 inline sm:hidden" />
          <span className="hidden sm:inline">Home</span>
        </Link>

        <Link to="/cart" className="hover:underline hover:decoration-orange-600 underline-offset-8 flex items-center gap-1 relative">
  <ShoppingCart className="w-5 h-5 inline sm:hidden" />
  <span className={getTotalCartAmount()===0 ? " " : "absolute top-[-2px] right-[-2px] bg-red-500 rounded-full w-2 h-2"}></span>
  <span className="hidden sm:inline">Cart</span>
</Link>
<Link to="/myorders" className="hover:underline hover:decoration-orange-600 underline-offset-8 ">
<Package className="w-5 h-5 inline sm:hidden" />
<span className="hidden sm:inline">Orders</span>
</Link>


        {authUser ? (
          <button
            className="flex gap-2 items-center hover:underline hover:decoration-orange-600 underline-offset-8"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 inline sm:hidden" />
            <span className="hidden sm:inline">LogOut</span>
          </button>
        ) : (
          <Link to="/signup">
            <button className="bg-white text-black text-sm sm:text-base  rounded-md hover:bg-gray-200">
            <LogIn className="w-5 h-5 inline sm:hidden" />
            <span className="hidden sm:inline">SignUp</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
