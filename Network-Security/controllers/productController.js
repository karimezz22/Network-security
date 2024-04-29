//controllers/productController
const Product = require("../models/product");
const upload = require("../utils/upload");

const createProduct = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Product image is required." });
    }

    const imageUrl = await upload(file, { folder: `${process.env.APP_Name}/products` });

    await Product.create({ ...req.body, image: imageUrl });

    res.status(201).json({ message: "Product created successfully"});
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ deleted: false }, '_id name description image');
    if (!products.length) {
      return res.status(404).json({ message: "No Products found" });
    }
    res.status(200).json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    next(error);
  }
};

const getDeletedProducts = async (req, res, next) => {
  try {
    const deletedProducts = await Product.find({ deleted: true }, '_id name description image');
    if (!deletedProducts.length) {
      return res.status(404).json({ message: "No Deleted Products found" });
    }
    res.status(200).json({ message: "Deleted Products fetched successfully", data: deletedProducts });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product fetched successfully", data: product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    if (req.file && req.file.path) {
      const imageUrl = await upload(req.file, { folder: `${process.env.APP_Name}/products` });
      productData.image = imageUrl;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    next(error);
  }
};

const toggleProductDeletedStatus = async (productId, deletedStatus) => {
  const updatedProduct = await Product.findByIdAndUpdate(productId, { deleted: deletedStatus }, { new: true });

  if (!updatedProduct) {
    throw new Error("Product not found");
  }

  return updatedProduct;
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    await toggleProductDeletedStatus(productId, true);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const restoreProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    await toggleProductDeletedStatus(productId, false);
    res.status(200).json({ message: "Product restored successfully" });
  } catch (error) {
    next(error);
  }
};

const searchProducts = async (req, res, next) => {
  try {
    const query = req.params.query;
    const products = await Product.find({ $text: { $search: query } }, 'name description image');
    if (!products.length) {
      return res.status(404).json({ message: 'No products found for the given query.' });
    }
    res.status(200).json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getDeletedProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  restoreProduct,
  searchProducts,
};
