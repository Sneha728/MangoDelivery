const express = require("express");
const connectToDb = require("./lib/db");
const userRoutes = require("./Routes/userRoutes")
const cookieParser = require("cookie-parser");
const cors = require("cors")
require("dotenv").config();
const mangoRoutes = require("./Routes/mangoRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const orderRouter = require("./Routes/placeOrder");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],  // Ensure this matches the URL of your frontend
  credentials: true,              // Allow cookies to be sent with requests
}));


app.use("/api/auth",userRoutes);
app.use("/api/mangoes",mangoRoutes);
app.use("/images",express.static('uploads'));
app.use("/api/cart",cartRoutes);
app.use("/api/order",orderRouter);
app.get("/", (req, res) => {
    res.send("Welcome to MangoExpress");
  });
  
app.listen(8000,()=>console.log("Server created at port 8000"));
connectToDb("mongodb+srv://snehaavala05:jtceXUXl9vqIGHVH@cluster0.mwbxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")