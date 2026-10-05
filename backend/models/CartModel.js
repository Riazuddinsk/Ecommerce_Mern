import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'BuyerUser'
    },
    items:[
        {
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'products'
        },
        quantity:{
            type:Number,
            required:true,
            default:1
        }
    }
    ]
})

export default mongoose.model("Cart", CartSchema);