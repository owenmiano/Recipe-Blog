const Recipe=require('../models/Recipe')
const Category=require('../models/Category')

/**
 * GET /
 * Homepage 
*/
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
  
     /**
       * POST /newCategory
       * 
       */
  exports.addCategory=async(req,res)=>{
    const {name}=req.body
   try {
      const newCategory=Recipe.create({
        image:req.file.originalname,
        name
       })
            return res.status(201).json({message:'Categories added successfully'})
    } catch (error) {
      console.log(error.message)
        return res.status(500).json({message:'Unable to add product'})
    }
  }


     /**
       * GET /categories
       * Categories
       */
exports.exploreCategories=async(req,res)=>{
  try {
    const limitNumber=20;
    const categories=await Category.find({}).limit(limitNumber)
    return res.render('categories',{title:'Cooking blog - Categories',categories})
  } catch (error) {
    return res.status(500).send({message: error.message || "error occured"})
  }
    
  }

     /**
       * GET /recipe/:id
       * Recipe
       */
exports.exploreRecipe=async(req,res)=>{
  try {
    let recipeId=req.params.id;
    const recipe=await Recipe.findById(recipeId)
    return res.render('recipe',{title:'Cooking blog - Recipe',recipe})
  } catch (error) {
    return res.status(500).send({message: error.message || "error occured"})
  }
    
  }
  /**
       * GET /categories/:id
       * Categories
       */
exports.exploreCategoryId=async(req,res)=>{
  try {
    let categoryId=req.params.id;
    const limitNumber=20;
    const categoryById=await Recipe.find({'category':categoryId}).limit(limitNumber)
    return res.render('categories',{title:'Cooking blog - Categories',categoryById})
  } catch (error) {
    return res.status(500).send({message: error.message || "error occured"})
  }
    
  }

      /**
       * POST /search
       * Search
       */
exports.searchRecipe=async(req,res)=>{
  try {
     let searchTerm=req.body.searchTerm;
     let recipe=await Recipe.find({$text: {$search: searchTerm,$diacriticSensitive:true}});
     return res.render('search',{title:'Cooking blog - Search',recipe})
  } catch (error) {
    return res.status(500).send({message: error.message || "error occured"})
  }
    
  }

       /**
       * GET /explore-latest
       * Explore Latest
       */
exports.exploreLatest=async(req,res)=>{
  try {
    const limitNumber=20;
    const recipe=await Recipe.find({}).sort({_id:-1}).limit(limitNumber)
    return res.render('explore-latest',{title:'Cooking blog - Explore Latest',recipe})
  } catch (error) {
    return res.status(500).send({message: error.message || "error occured"})
  }
    
  }

    /**
       * GET /explore-random
       * Explore Random
       */
exports.exploreRandom=async(req,res)=>{
  try {
    let count=await Recipe.find().countDocuments();
    let random=Math.floor(Math.random() *count);
    let recipe=await Recipe.findOne().skip(random).exec();
    return res.render('explore-random',{title:'Cooking blog - Explore Random',recipe})
  } catch (error) {
    return res.status(500).send({message: error.message || "error occured"})
  }
    
  }

      /**
       * GET /submit-recipe
       * submit-recipe
       */
exports.submitRecipe=async(req,res)=>{
  try {
    const infoErrorsObj=req.flash('infoErrors')
    const infoSubmitObj=req.flash('infoSubmit')
    return res.render('submit-recipe',{title:'Cooking blog - Submit Recipe',infoErrorsObj,infoSubmitObj})
  } catch (error) {
    return res.status(500).send({message: error.message || "error occured"})
  }
    
  }
  
       /**
       * POST /submit-recipe
       * submit-recipe
       */
exports.addRecipe=async(req,res)=>{
  const { name, description, email, ingredients, category } = req.body;
try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('No Files were uploaded.');
    } else {
        imageUploadFile = req.files.image;
        newImageName = imageUploadFile.name;
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
        
        imageUploadFile.mv(uploadPath, function (err) {
            if (err) {
                // Handle the error appropriately, e.g., return an error response
                console.error(err);
                return res.status(500).json({ message: 'Error uploading file' });
            }
        });
    }

    const newRecipe = await Recipe.create({
        image: newImageName,
        name,
        description,
        email,
        ingredients,
        category,
    });

    // Flash message for success
    req.flash('infoSubmit', 'Recipe has been added.');

    // Redirect to the form page with a success message
    return res.redirect('/submit-recipe');
} catch (error) {
    // Flash message for error
    req.flash('infoErrors', error);
    return res.redirect('/submit-recipe');
}

  
  }