import Product from "../models/ProductModel.js";

export const addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json({
      message: "Product Add Successfully",
      newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const update = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Item Updated Successfully...", update });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Server Error..." });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Item Deleted Successfully..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Server Error..." });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { userId, search, category } = req.query;

    let filter = {};

    if (userId) {
      filter.userId = userId;
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter).sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter).sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};