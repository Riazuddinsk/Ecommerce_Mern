import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
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
        required:true,
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
      }
      
},{timestamps:true})

export default mongoose.model("products", ProductSchema);