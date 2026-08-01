import express from "express";
import {AddCart,RemoveItem,UpdateCart,getCart} from "../controllers/cartController.js"

const router = express.Router()
router.post('/addToCart', AddCart)
router.post('/removeFromCart', RemoveItem)
router.post('/updateItem', UpdateCart)
router.get("/:userId", getCart);

export default router
