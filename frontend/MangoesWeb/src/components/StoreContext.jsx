import { createContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import userAuthStore from "../store/userAuthStore";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [menuList, setMenuList] = useState([]);
  const url = "https://mangoexpress-backend.onrender.com";
  const { authUser } = userAuthStore();


  // Load cart from localStorage on page load
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCartItems({});
      }
    }
  }, []);

  //  Save cart updates to localStorage
  useEffect(() => {
    console.log("Cart Updated:", cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (authUser) {
      await axios.post(url + "/api/cart/add", { itemId }, { withCredentials: true });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (prev[itemId] > 1) {
        newCart[itemId] = prev[itemId] - 1;
      } else {
        delete newCart[itemId]; // Remove item if count is 0
      }
      return newCart;
    });

    if (authUser) {
      await axios.post(url + "/api/cart/remove", { itemId }, { withCredentials: true });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const [itemId, quantity] of Object.entries(cartItems)) {
      if (quantity > 0) {
        const itemInfo = menuList.find((product) => String(product._id) === String(itemId));
        if (itemInfo) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }
    return totalAmount;
  };

  const fetchList = async () => {
    const response = await axios.get(url + "/api/mangoes/list");
    setMenuList(response.data.data);
  };

  const loadCartData = async () => {
    if (authUser) {
      const response = await axios.post(url + "/api/cart/get", {}, { withCredentials: true });
      setCartItems(response.data.cartData);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchList();
      if (authUser) {
        await loadCartData();
      }
    }
    loadData();
  }, [authUser]);

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    menuList,
    url,
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
