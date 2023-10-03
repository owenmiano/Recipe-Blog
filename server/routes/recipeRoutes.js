const express=require('express');
const router=express.Router()
const recipeController=require('../controllers/recipeController')
const multer=require('multer')

// define storage for the images
const storage=multer.diskStorage({
    // destination for files
    destination:function(req,file,callback){
        callback(null, './public/uploads')
    },
    // add back the extension
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

// upload paramters for multer
const upload = multer({
    storage:storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
      },
})

router.get('/',recipeController.homepage)

// add new category
router.post('/newCategory',recipeController.addCategory)
router.post('/newRecipe', upload.single('image'),recipeController.newRecipe)

router.get('/categories',recipeController.exploreCategories)
module.exports=router;