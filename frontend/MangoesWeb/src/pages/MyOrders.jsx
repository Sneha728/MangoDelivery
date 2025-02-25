import React, { useContext, useEffect, useState } from "react";
import userAuthStore from "../store/userAuthStore";
import { StoreContext } from "../components/StoreContext";
import axios from "axios";
import parcel from "../assets/parcel.png";

const MyOrders = () => {
  const { authUser } = userAuthStore();
  const { url } = useContext(StoreContext);

  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { withCredentials: true });
    setData(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    if (authUser) {
      fetchOrders();
    }
  }, []);

  return (
    <div className="flex flex-col justify-center w-full sm:p-5 gap-5 p-8  ">
      <h2 className="font-semibold text-2xl  text-left">My Orders</h2>

      {data.map((order, idx) => (
        <div
          key={idx}
          className="flex flex-wrap lg:flex-nowrap items-center justify-between w-[90%] sm:w-full border-2 p-3 sm:p-4 
                     border-orange-400 gap-x-6 sm:gap-x-4 gap-y-3 rounded-lg shadow-md"
        >
        
          <img src={parcel} alt="Parcel" className="size-10 sm:size-14 hidden sm:inline" />

         
          <p className="text-center sm:text-left text-sm sm:text-base w-full sm:w-auto">
            {order.items.map((item, idx) =>
              idx === order.items.length - 1 ? `${item.name} x ${item.quantity}` : `${item.name} x ${item.quantity}, `
            )}
          </p>

         
          <p className="font-semibold w-full sm:w-[15%] text-center">{order.amount}/-</p>

         
          <p className="w-full sm:w-[10%] text-center">Items: {order.items.length}</p>

          
          <p className="flex items-center gap-1 w-full sm:w-[15%] text-center justify-center">
            <span className="text-orange-500">&#x25cf;</span>
            <span>{order.status}</span>
          </p>

        
          <button className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition w-full sm:w-auto" onClick={fetchOrders}>
            Track Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
