import mongoose from "mongoose";

const UserSchema2 = mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
);

export default mongoose.model('BuyerUser', UserSchema2)