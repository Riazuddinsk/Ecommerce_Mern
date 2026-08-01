import Cart from "../models/CartModel.js"

export const AddCart = async(req, res)=>{
    try {
        const {userId,productId} = req.body
        console.log("userId:", userId);
        console.log("productId:", productId);

        let cart = await Cart.findOne({userId})
        if(!cart){
            cart = new Cart({userId, items:[{productId, quantity:1}]})
        }else{
            const item = cart.items.find(
                i=>i.productId.toString()===productId
            )
            if(!item){
                cart.items.push({productId, quantity:1})
            }else{
                item.quantity+=1
            }
        }
        await cart.save()
        res.json({
            message:"Item Add Successfully",
            cart
        })
    } catch (error) {
        res.status(500).json({message:"Server Error", error})
    }
}
export const RemoveItem = async(req, res)=>{
    try {
        const{userId,productId} = req.body
        let cart =await Cart.findOne({userId})
        if(!cart){
          return  res.status(400).json("Cart Not Found")
        }
        cart.items = cart.items.filter(
            i=>i.productId.toString()!==productId
        )
        await cart.save();
        res.json({
            message:'Item deleted from cart',
            cart
        })
    } catch (error) {
        res.status(500).json({message:"Server Error", error})
    }
}

export const UpdateCart = async(req, res)=>{
    try {
        const{userId,productId, quantity} = req.body
        let cart = await Cart.findOne({userId})
        if(!cart){
            return res.status(400).json({message:"Cart not found"})
        }

        const item = cart.items.find(
            i=>i.productId.toString()===productId
        )
        if(!item){
            return res.status(400).json({message:"Item not find"})
        }
        item.quantity=quantity
        await cart.save();
        res.json({
            message:'Item Update successfully',
            cart
        })
    } catch (error) {
        res.status(500).json({message:"Server Error", error})
    }
}

export const getCart = async(req, res)=>{
    try {
        const {userId}= req.params;

        const cart = await Cart.findOne({userId}).populate('items.productId');

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error',error})
    }
}