import React from 'react'
import userAuthStore from "../store/userAuthStore"
import {Link, useNavigate} from "react-router-dom"
import ExploreMenu from '../components/ExploreMenu'

const Home = () => {
  const {authUser} = userAuthStore();
 const navigate = useNavigate();
  const scrollToMenu = () => {
    const menuSection = document.getElementById('explore-menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' }); 
    }
  };

  const handleOrder = () =>{
    if(authUser){
      scrollToMenu();
    }else{
      navigate("/login");
    }
  }

  return (
    <div>

    
    <div className='relative bg-orange-500 text-white mx-4 sm:mx-10 lg:mx-40 mb-6 h-[75vh] rounded-2xl bg-[url("https://t3.ftcdn.net/jpg/06/19/82/00/360_F_619820028_0rkb6i8sHldgaAsDAYplQVqQPGC0fr5J.jpg")] bg-cover bg-center'>
      <div className="absolute bottom-6 sm:bottom-10 right-4 sm:right-10 flex flex-col items-center text-center px-2 sm:px-0">
        <h1 className='text-xl sm:text-2xl lg:text-4xl font-semibold'>
          Welcome to MangoExpress - <br /> Your Premium Mango Destination!!
        </h1>
        <p className='mt-4 text-sm sm:text-lg lg:text-xl mb-6 sm:mb-8'>
          Experience the freshest, hand-picked mangoes delivered right to your doorstep.
          <br /> Our mangoes are sourced from the finest orchards to ensure rich flavor and juicy goodness with every bite.
        </p>
        <button onClick={handleOrder}    className='bg-white text-amber-500 rounded-2xl px-2 py-1 text-lg sm:px-3 sm:py-2 sm:text-2xl font-medium'>
          Order now
        </button> 
       
        
        
      </div>
      
    </div>
    {
      authUser ? <ExploreMenu /> : ""
    }
    
    </div>
  )
}

export default Home;
