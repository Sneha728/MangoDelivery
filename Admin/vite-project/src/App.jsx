import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Order from './pages/Order';
import { ToastContainer } from "react-toastify";

function App() {
  const url = "https://mangoexpress-backend.onrender.com";
  return (
    <BrowserRouter>
    <Navbar />
      <div className="flex">
      
        <Sidebar />
        <div className="flex-1">
          
          <Routes>
            <Route path="/add" element={<Add  url={url} />} />
            <Route path="/list" element={<List  url={url}/>} />
            <Route path="/orders" element={<Order url={url} />} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
    
  );
}

export default App;
