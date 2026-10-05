import Address from "../models/AdressModel.js"

export const saveAddress = async(req, res)=>{
    try {
        const address = await Address.create(req.body)
        res.json({message:"Address saved successfully", address})
    } catch (error) {
        res.status(500).json({message:"Error to saving address....", error})
    }
}

export const getAddress = async(req, res)=>{
    try {
        const addresses = await Address.find({
            userId:req.params.userId
        })
        res.json(addresses)
    } catch (error) {
        res.status(500).json({message:"Error to get address....", error})
    }
}

export const updateAddress = async(req, res)=>{
    try {
        const update = await Address.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        res.json({message:"Address Update Succesfully...", update})
    } catch (error) {
        res.status(500).json({message:"Server Error...", error})
    }
}

export const deleteAddress = async(req, res)=>{
    try {
        await Address.findByIdAndDelete(req.params.id)
        res.json({message:"Address Deleted Successfully..."})
    } catch (error) {
        res.status(500).json({message:"Server Error...", error})
    }
}