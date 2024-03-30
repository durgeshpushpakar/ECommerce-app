import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController, viewCategoriesController } from "../controller/categoryController.js";

const router = express.Router();

//routes
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

// update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

// delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

// view all categories
router.get('/view-categories', requireSignIn, isAdmin, viewCategoriesController);

// get single category
router.get('/view-category/:id', requireSignIn, isAdmin, singleCategoryController);

export default router;