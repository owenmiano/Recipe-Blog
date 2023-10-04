const express=require('express');
const router=express.Router()
const recipeController=require('../controllers/recipeController')
// const multer=require('multer')

// // define storage for the images
// const storage=multer.diskStorage({
//     // destination for files
//     destination:function(req,file,callback){
//         callback(null, './public/uploads')
//     },
//     // add back the extension
//     filename:function(req,file,callback){
//         callback(null,file.originalname)
//     }
// })

// // upload paramters for multer
// const upload = multer({
//     storage:storage,
//     limits: {
//         fileSize: 1024 * 1024 * 3,
//       },
// })

router.get('/',recipeController.homepage)
router.post('/newCategory',recipeController.addCategory)
router.get('/recipe/:id', recipeController.exploreRecipe)
router.get('/categories',recipeController.exploreCategories)
router.get('/categories/:id', recipeController.exploreCategoryId)
router.post('/search',recipeController.searchRecipe)
router.get('/explore-latest',recipeController.exploreLatest)
router.get('/explore-random',recipeController.exploreRandom)
router.get('/submit-recipe',recipeController.submitRecipe)
router.post('/addRecipe',recipeController.addRecipe)
module.exports=router;