import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../components/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  });
  const {cartItems, menuList } = useContext(StoreContext);
const placeOrder = async(e) =>{
  e.preventDefault();
  let orderItems = [];
  menuList.map((item)=>{
    if(cartItems[item._id]>0){
      let itemInfo = item;
      itemInfo["quantity"] = cartItems[item._id];
      orderItems.push(itemInfo);
    }
  })
  console.log(orderItems);

}

  return (
    <div className="flex justify-center items-center w-full px-6 py-4 sm:px-20 sm:py-10">
      <form className="flex flex-col sm:flex-row justify-between items-start w-full gap-10" onSubmit={placeOrder}>
        {/* Delivery Information Section */}
        <div className="flex flex-col items-start w-full sm:w-1/2 gap-3">
          <div className="flex items-center sm:mb-3 mb-1">
            <p className="sm:text-2xl font-semibold text-lg">Delivery Information</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
            <input
              type="text"
              placeholder="First Name"
              className="w-full sm:w-1/2 px-6 py-2 border-gray-300 border-2 rounded-md"
              value={data.firstName}
              onChange={(e)=>setData({...data,firstName:e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full sm:w-1/2 px-6 py-2 border-gray-300 border-2 rounded-md"
              value={data.lastName}
              onChange={(e)=>setData({...data,lastName:e.target.value})}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Email Address"
            className="w-full px-6 py-2 border-gray-300 border-2 rounded-md"
            required
            value={data.email}
              onChange={(e)=>setData({...data,email:e.target.value})}
          />
          <input
            type="text"
            placeholder="Street"
            className="w-full px-6 py-2 border-gray-300 border-2 rounded-md"
            value={data.street}
              onChange={(e)=>setData({...data,street:e.target.value})}
              required
          />
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
            <input
              type="text"
              placeholder="Zipcode"
              className="w-full sm:w-1/2 px-6 py-2 border-gray-300 border-2 rounded-md"
              value={data.zipcode}
              onChange={(e)=>setData({...data,zipcode:e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full sm:w-1/2 px-6 py-2 border-gray-300 border-2 rounded-md"
              value={data.country}
              onChange={(e)=>setData({...data,country:e.target.value})}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            className="w-full px-6 py-2 border-gray-300 border-2 rounded-md"
            value={data.phone}
              onChange={(e)=>setData({...data,phone:e.target.value})}
              required
          />
        </div>

        {/* Cart Totals Section */}
        <div className="w-full sm:w-1/2">
          <h2 className="font-semibold sm:text-2xl sm:text-center sm:mb-8 text-start mb-5 text-lg ">Cart Totals</h2>
          <div className="text-gray-500 flex justify-around gap-3 mt-2">
            <p className="mr-2">Sub Total</p>
            <p>{getTotalCartAmount()}/-</p>
          </div>
          <div className="text-gray-500 flex justify-around  w-full mt-2">
            <p className="mr-2">Delivery fee</p>
            <p>{getTotalCartAmount() === 0 ? 0 : 2}/-</p>
          </div>
          <div className="text-gray-500 flex justify-around gap-10 w-full mt-2">
            <b className="mr-2">Total</b>
            <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}/-</b>
          </div>

          {/* Proceed to Checkout Button */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md text-md w-full sm:max-w-xs"
              type='submit'
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
