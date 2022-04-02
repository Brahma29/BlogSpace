const router = require("express").Router();
const Category = require("../models/Category");

//Create new Category

router.post('/',async(req,res)=>{
    const newCategory=new Category(req.body);
    try{
        const createdCategory=await newCategory.save();
        res.status(200).json(createdCategory)
    }catch(err){
        res.status(500).json(err)
    }
})



//Get All Category

router.get('/',async(req,res)=>{
   
    try{
        const categories=await Category.find();
        res.status(200).json(categories)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports=router