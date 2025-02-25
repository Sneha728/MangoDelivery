const express = require("express");
const multer = require("multer");
const mangorouter = express.Router();
const {addMango,mangoList, removeMango} = require("../controllers/mangoController");




const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})


const upload = multer({storage:storage});

mangorouter.post("/add",upload.single("image"),addMango);
mangorouter.get("/list",mangoList);
mangorouter.post("/remove",removeMango);


module.exports = mangorouter;