import express from "express"
import {saveAddress, getAddress, updateAddress, deleteAddress} from "../controllers/addressController.js"

const router = express.Router()

router.post('/add', saveAddress)
router.get('/:userId', getAddress)
router.put('/update/:id', updateAddress)
router.delete('/delete/:id', deleteAddress)

export default router