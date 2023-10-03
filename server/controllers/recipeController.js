const Recipe=require('../models/Recipe')
const Category=require('../models/Category')

// GET / 
exports.homepage=async(req,res)=>{
  try {
    const limitNumber=5;
    const categories=await Category.find({}).limit(limitNumber);
    const latest=await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
    const thai=await Recipe.find({'category':'Thai'}).limit(limitNumber);
    const american=await Recipe.find({'category':'American'}).limit(limitNumber);
    const chinese=await Recipe.find({'category':'Chinese'}).limit(limitNumber);
    const food={latest,thai,american,chinese}
    return res.render('index',{title:'Cooking blog - Home',categories,food})
  } catch (error) {
    return res.status(500).send({message: error.message || "error occured"})
  }
    
  }
// add new category
  exports.addCategory=async(req,res)=>{
    try {
      await Category.insertMany([
              {
                "name": "Thai",
                "image": "thai-food.jpg"
              },
              {
                "name": "American",
                "image": "american-food.jpg"
              }, 
              {
                "name": "Chinese",
                "image": "chinese-food.jpg"
              },
              {
                "name": "Mexican",
                "image": "mexican-food.jpg"
              }, 
              {
                "name": "Indian",
                "image": "indian-food.jpg"
              },
              {
                "name": "Spanish",
                "image": "spanish-food.jpg"
              }
            ]);
            return res.status(201).json({message:'Categories added successfully'})
    } catch (error) {
      console.log(error.message)
        return res.status(500).json({message:'Unable to add product'})
    }
  }

  // add new Recipe
  exports.newRecipe=async(req,res)=>{
    const {name,description,email,ingredients,category}=req.body
    try {
      const newCategory=Recipe.create({
          image:req.file.originalname,
          name,
          description,
          email,
          ingredients,
          category
         })
      return res.status(201).json({message:`Recipe has been added successfully`})
    } catch (error) {
      console.log(error.message)
        return res.status(500).json({message:'Unable to add product'})
    }
  }

  
  // GET /categories
exports.exploreCategories=async(req,res)=>{
  try {
    const limitNumber=20;
    const categories=await Category.find({}).limit(limitNumber)
    return res.render('categories',{title:'Cooking blog - Categories',categories})
  } catch (error) {
    return res.status(500).send({message: error.message || "error occured"})
  }
    
  }