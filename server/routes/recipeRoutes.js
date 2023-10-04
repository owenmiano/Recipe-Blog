const express=require('express');
const router=express.Router()
const recipeController=require('../controllers/recipeController');

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