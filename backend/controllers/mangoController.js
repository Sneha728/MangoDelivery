
const Mangoes = require("../model/mangoesModel");
const fs = require('fs');

const addMango = async(req,res) =>{
    let image_filename = `${req.file.filename}`;

    const Mango = new Mangoes({
        name:req.body.name,
        image:image_filename,
        price:req.body.price,
        description:req.body.description

    });
    try{
        await Mango.save();
        res.status(201).json({success:true,message:`${req.body.name} added `});
    }catch(error){
        console.log("Error in addMango controller",error.message);
        res.json({success:false,message:"Error"});
    }
}


const mangoList = async(req,res)=>{
    try{
        const lists = await Mangoes.find({});
        res.json({success:true,data:lists});

    }catch(error){
        console.log("Error in mangoList controller",error.message);
        res.json({success:false,message:"error"})
    }
}

const removeMango = async(req,res)=>{
    try{
        const removedMango = await Mangoes.findById(req.body.id);
        fs.unlink(`uploads/${removedMango.image}`,()=>{});

        await Mangoes.findByIdAndDelete(req.body.id);
        res.status(201).json({success:true,message:`Mango removed `});

    }catch(error){
        console.log("Error in removeMango controller" , error.message);
        res.json({success:false,message:"error"})
    }
}
module.exports = {addMango,mangoList,removeMango};

