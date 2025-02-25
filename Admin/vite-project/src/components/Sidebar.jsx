import React from 'react';
import { Plus, ListCheck, CircleCheckBig } from 'lucide-react';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sm:h-screen h-auto sm:w-1/4 md:w-1/6 w-full bg-white border-t sm:border-r border-gray-300 
      sm:flex sm:flex-col flex flex-row items-center sm:items-start justify-around sm:justify-start p-3 sm:p-5 md:p-8 shadow-md 
      fixed bottom-0 sm:static gap-8">
      
      <Link to="/add" className="flex flex-col sm:flex-row items-center gap-2 hover:text-orange-600">
        <Plus size={24} />
        <p className="hidden sm:inline md:text-base text-sm">Add Mangoes</p>
      </Link>

      <Link to="/list" className="flex flex-col sm:flex-row items-center gap-2 hover:text-orange-600">
        <ListCheck size={24} />
        <p className="hidden sm:inline md:text-base text-sm">List Mangoes</p>
      </Link>

      <Link to="/orders" className="flex flex-col sm:flex-row items-center gap-2 hover:text-orange-600">
        <CircleCheckBig size={24} />
        <p className="hidden sm:inline md:text-base text-sm">Orders</p>
      </Link>
      
    </div>
  );
};

export default Sidebar;
