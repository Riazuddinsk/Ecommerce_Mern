import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    userId:{
        required:true,
        type:String,
        ref:'BuyerUser'
    },
    State:String,
    District:String,
    Street_Address:String,
    PinCode:String,
    PhoneNumber:String,
    FullName:String,
    City:String
},{
    timestamps:true
})

export default mongoose.model("Address",addressSchema)