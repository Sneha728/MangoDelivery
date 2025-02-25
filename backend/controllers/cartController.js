
const User = require("../model/usersModel");

// Add items to cart
const addToCart = async (req, res) => {
    try {
        let userData = await User.findById(req.body.userId);
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; 

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await User.findByIdAndUpdate(req.body.userId, { cartData });

        res.json({ success: true, message: "Added To Cart" });

    } catch (error) {
        console.error("Error in addToCart controller:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};



const removeFromcart = async(req,res)=>{
    try{
        let userData = await User.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;

        }
        await User.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"});

    }catch(error){
        console.log("Error in removeFrom cart controller" , error.message);
        res.json({success:false,message:"Error"});
    }

}

const getCart = async(req,res) =>{
    try{
        let userData = await User.findById(req.body.userId);
        let cartData = await  userData.cartData;
        res.json({success:true,cartData})

    }catch(error){
        console.log("Error in getcart controller",error.message);
        res.json({success:false,message:"Error"});
    }

}

module.exports = {addToCart,removeFromcart,getCart};