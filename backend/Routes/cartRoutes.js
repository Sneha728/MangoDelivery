const  express = require("express");
const { addToCart, removeFromcart, getCart } = require("../controllers/cartController");
const protectRoute = require("../middlewares/protectRoute")

const router = express.Router();

router.post("/add",protectRoute,addToCart);
router.post("/remove",protectRoute,removeFromcart);
router.post("/get",protectRoute,getCart);

module.exports = router;