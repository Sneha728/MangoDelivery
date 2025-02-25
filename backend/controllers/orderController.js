const orderModel = require("../model/orderModel");

const mongoose = require("mongoose");
const User = require("../model/usersModel")


const placeOrder = async (req, res) => {
    try {
        console.log("Placing order for user:", req.body.userId);

        // Check if required fields are provided
        if (!req.body.userId || !req.body.items || !req.body.amount || !req.body.address) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        // Ensure address is stored as an object
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address || {}, // Ensuring it's never undefined
        });

        await newOrder.save();
        console.log("New order saved:", newOrder);

        // Clear the user's cart after placing order
        await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error in placeOrder controller:", error.message);
        res.status(500).json({ success: false, message: "Error in placing order" });
    }
};







const userOrders = async (req, res) => {
    try {
        console.log("Received userId:", req.body.userId);

        if (!req.body.userId) {
            return res.json({ success: false, message: "userId is required" });
        }

        let userId;
        try {
            userId = new mongoose.Types.ObjectId(req.body.userId);
        } catch (error) {
            return res.json({ success: false, message: "Invalid userId format" });
        }

        const orders = await orderModel.find({ userId });
        console.log("Orders found:", orders);

        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error in userOrders controller:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const listOrders = async(req,res)=>{
    try{
        const orders = await orderModel.find({});
        res.json({success:true,data:orders});

    }catch(error){
        console.log("Error in listOrders controller ",error.message);
        res.json({success:false,message:"Error"});
    }
}


const updateStatus = async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status updated"});

    }catch(error){
        console.log("Error in updatestatus controller",error.message);
        res.json({success:false,message:"Error"});
    }

}
module.exports = {placeOrder,userOrders,listOrders,updateStatus};


