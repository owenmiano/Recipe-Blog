const Recipe=require('../models/Recipe')

// GET / 
exports.homepage=async(req,res)=>{
    res.render('index',{title:'Cooking blog - Home'})
  }