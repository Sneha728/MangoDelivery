import React, { useContext } from "react";
import { StoreContext } from "./StoreContext";
import { Minus, Plus } from "lucide-react";

const ExploreMenu = () => {
  const { cartItems, addToCart, removeFromCart,menuList,url } = useContext(StoreContext);

  return (
    <div id="explore-menu" className="flex flex-col justify-center items-start mx-4 sm:mx-10 lg:mx-40">
      <div className="flex flex-col text-start mb-5">
        <h1 className="text-start font-semibold sm:text-2xl text-lg">Explore Our Menu</h1>
        <p >
          Explore our menu for a variety of mango delights! From fresh mangoes
          to smoothies and desserts, we have something for every mango lover to
          enjoy!!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center justify-items-center mb-6 px-5">
        {menuList.map((item) => (
          <div
            key={item._id} 
            className="flex flex-col items-center gap-2 shadow-xl p-3"
          >
            <img
              src={url+"/images/"+item.image}
             
              className="sm:w-80 sm:h-70 object-cover rounded-lg w-30 h-20"
            />
            <div className="flex items-center justify-between w-full">
              <p className="text-start font-medium text-lg">{item.name}</p>

             
              {!cartItems[item._id] ? (
                <span onClick={() => addToCart(item._id)} className="text-white p-1 bg-amber-500 rounded-full">
                  <Plus className="size-4" />
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <span onClick={() => removeFromCart(item._id)} className="text-red-700 p-1 bg-red-200 rounded-full">
                    <Minus className="size-4" />
                  </span>
                  <p>{cartItems[item._id] || 0}</p>
                  <span onClick={() => addToCart(item._id)} className="text-green-700 p-1 bg-green-200 rounded-full">
                    <Plus className="size-4" />
                  </span>
                </div>
              )}
            </div>
           
            <p className="text-start">{item.description}</p>
            <p className="font-semibold text-orange-600">{item.price}/- per kg</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;