import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Cart from './pages/Cart';
import userAuthStore from './store/userAuthStore';
import { Loader } from 'lucide-react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './components/Footer';
import ExploreMenu from './components/ExploreMenu';
import PlaceOrder from './pages/PlaceOrder';
import MyOrders from './pages/MyOrders';

function App() {
  const { checkAuth, isCheckingAuth, authUser } = userAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to="/" />} />
          <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
          <Route path='/cart' element={<Cart />} />
         <Route path='/order' element={<PlaceOrder />} />
         <Route path='/myorders' element={authUser ? <MyOrders /> :  <Navigate to="/login" />}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />
     
      
      <Footer />
    </div>
  );
}

export default App;
