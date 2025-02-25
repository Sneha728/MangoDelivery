import React, { useContext, useEffect } from "react";
import { StoreContext } from "../components/StoreContext";
import { Delete } from "lucide-react";
import { useNavigate } from "react-router-dom";
import userAuthStore from "../store/userAuthStore";

const Cart = () => {
  const { cartItems, removeFromCart, getTotalCartAmount, url, menuList } = useContext(StoreContext);
  const navigate = useNavigate();
  const { authUser } = userAuthStore();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 sm:p-5">
      {/* Cart Header */}
      <div className="flex w-full bg-gray-100 p-4 font-semibold text-center text-sm gap-1 sm:text-lg">
        <p className="w-1/12 sm:w-2/12">Items</p>
        <p className="sm:w-3/12 w-5/12">Title</p>
        <p className="sm:w-2/12 w-3/12">Price</p>
        <p className="sm:w-2/12 w-3/12">Quantity</p>
        <p className="w-2/12">Total</p>
        <p className="w-2/12">Remove</p>
      </div>

      {/* Cart Items */}
      <div className="flex flex-col items-center w-full mt-4">
        {menuList.map((item) => {
          const quantity = cartItems[item._id] || 0;
          if (quantity > 0) {
            return (
              <div
                key={item._id}
                className="flex w-full p-3 sm:p-4 border-b border-gray-300 items-center justify-center"
              >
                <div className="w-1/12 sm:w-2/12 flex justify-center">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="sm:w-12 sm:h-12 w-full h-6 object-cover rounded-lg"
                  />
                </div>
                <p className="sm:w-3/12 w-5/12 text-center">{item.name}</p>
                <p className="sm:w-2/12 w-3/12 text-center">{item.price}/-</p>
                <p className="sm:w-2/12 w-3/12 text-center">{quantity}</p>
                <p className="sm:w-2/12 w-3/12 text-center">{item.price * quantity}/-</p>
                <div className="sm:w-2/12 w-3/12 text-center">
                  <button onClick={() => removeFromCart(item._id)} className="p-1  rounded">
                    <Delete className="text-red-500" />
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Cart Totals */}
      <div className="w-full p-4 sm:p-5 bg-gray-100 mt-4 rounded-lg">
        <h2 className="font-semibold text-2xl text-center">Cart Totals</h2>
        <div className="text-gray-500 flex flex-row items-center justify-between sm:justify-center gap-10 sm:gap-44 w-full mt-2">
          <p className="mr-2">Sub Total</p>
          <p>{getTotalCartAmount()}/-</p>
        </div>
        <div className="text-gray-500 flex flex-row items-center justify-between sm:justify-center gap-10 sm:gap-40 w-full mt-2">
          <p className="mr-2">Delivery fee</p>
          <p>{getTotalCartAmount() === 0 ? 0 : 2}/-</p>
        </div>
        <div className="text-gray-500 flex flex-row items-center justify-between sm:justify-center gap-10 sm:gap-40 w-full mt-2">
          <b className="mr-2">Total</b>
          <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}/-</b>
        </div>

        {/* Proceed to Checkout Button */}
        <div className="flex justify-center mt-4">
          <button
            className="bg-orange-500 text-white px-3 py-2 rounded-md text-md w-full sm:max-w-xs"
            onClick={() => navigate("/order")}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
