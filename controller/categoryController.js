import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "name is required" });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exists"
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: "New category created",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating Category"
        })
    }
}

//update category
export const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { newName } = req.body;
        const existingCategory = await categoryModel.findById(id);
        if (existingCategory) {
            const updatedCategory = await categoryModel.findByIdAndUpdate(id, { name: newName, slug: slugify(newName) });
            res.status(200).send({
                success: true,
                message: "Category updated",
                updatedCategory
            })
        }
        else {
            res.status(500).send({
                success: false,
                message: "Error while updating category"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category"
        })
    }
}

// delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await categoryModel.findById(id);
        if (category) {
            await categoryModel.findByIdAndDelete(id);
            return res.status(200).send({
                success: true,
                message: "Category Deleted",
                category
            })
        }
        else {
            res.status(500).send({
                success: true,
                message: "Error while deleting category- Catregory doesn't exists",
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting category"
        })
    }
}

// view categories
export const viewCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.status(201).send({
            success: true,
            message: "All categories fetched",
            categories
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in fetching Categories"
        })
    }
}

// view categories
export const singleCategoryController = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await categoryModel.findById(id);
        res.status(201).send({
            success: true,
            message: "category fetched",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in fetching Categories"
        })
    }
}