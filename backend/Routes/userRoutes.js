const express = require("express");
const { signup ,login , logout , checkAuth } = require("../controllers/userController");
const protectRoute = require("../middlewares/protectRoute");
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

router.get("/check",protectRoute,checkAuth);

module.exports = router;