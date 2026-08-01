import express from "express";
import {addProduct, updateProduct, deleteProduct, getProducts}from "../controllers/productsController.js"

const router = express.Router()

router.get('/', getProducts);
router.post('/add', addProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router
