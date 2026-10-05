import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      title:{
        required:true,
        type:String,
      },
      description:{
        required:true,
        type:String,
      },
      new_price:{
        required:true,
        type:Number,
      },
      old_price:{
        type:Number,
      },
      quantity:{
        required:true,
        type:Number,
      },
      category:{
        required:true,
        type:String,
      },
      tag:{
        type:String,
      },
      brand:{
        required:true,
        type:String,
      },
      size:{
        type:String
      },
      color:{
        type:String
      },
      weight:{
        type:String
      },
      image:{
        required:true,
        type:String
      },
      image2:{
        required:true,
        type:String
      },
      image3:{
        required:true,
        type:String
      },
      image4:{
        required:true,
        type:String
      }
      
},{timestamps:true})

export default mongoose.model("products", ProductSchema);