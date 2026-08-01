import product from "../models/ProductModel.js"

export const addProduct = async(req, res)=>{
    try {
        const newProduct = await product.create(req.body)
        res.json({
            message:"Product Add Successfully",
            newProduct
        })
    } catch (error) {
        res.status(500).json({message:"Server Error...", error})
    }
}

export const updateProduct = async(req, res)=>{
    try {
        const update = await product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        res.json({message:"Item Update Succesfully...", update})
    } catch (error) {
        res.status(500).json({message:"Server Error...", error})
    }
}

export const deleteProduct = async(req, res)=>{
    try {
        await product.findByIdAndDelete(req.params.id)
        res.json({message:"Item Deleted Successfully..."})
    } catch (error) {
        res.status(500).json({message:"Server Error...", error})
    }
}

export const getProducts = async(req, res) => {
   try{

    const {search, catagory} = req.query;

    let filter = {};

    if(search){
      filter.title = {$regex: search, $options:'i'}; // case insensitive
    }

    if(catagory){
      filter.catagory = catagory;
    }

     const products = await product.find(filter).sort({ createdAt: -1});
     res.json(products)
   }catch(error){
     res.status(500).json({message:'Server Error', error});
   }
}