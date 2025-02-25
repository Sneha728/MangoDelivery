import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import parcel from "../assets/parcel.png";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      console.log("API Response:", response.data); 
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("API request failed");
    }
  };

  const statusHandler = async(e,orderId) =>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:e.target.value
    });
    if(response.data.success){
      await fetchOrders();
    }

  }

  return (
    <div className="flex flex-col justify-center w-full sm:p-5 gap-5 p-8 mb-8">
      <h2 className="font-semibold text-2xl text-left sm:text-left">Order Page</h2>

      {orders.map((order, idx) => (
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

         
          {order.address ? (
            <>
              <p>{order.address.firstName + " " + order.address.lastName}</p>
              <p>{order.address.street + ","}</p>
              <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              <p>{order.address.phone}</p>
            </>
          ) : (
            <p className="text-red-500">No Address Available</p>
          )}

          <p>Items: {order.items.length}</p>
          <p>{order.amount}/-</p>

          <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} className="bg-amber-100 rounded-md px-2 py-1">
            <option value="On Processing">On Processing</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Order;
