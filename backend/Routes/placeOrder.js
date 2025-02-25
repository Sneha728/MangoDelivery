const express = require("express");
const protectRoute = require("../middlewares/protectRoute")
const {placeOrder,userOrders,listOrders,updateStatus} = require("../controllers/orderController");


const orderRouter = express.Router();

orderRouter.post("/place",protectRoute,placeOrder);
orderRouter.post("/userorders",protectRoute,userOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);

module.exports = orderRouter;