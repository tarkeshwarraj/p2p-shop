import Product from "../models/Product.js";
import Order from "../models/Order.js";
import cloudinary from '../utils/cloudinary.js'
import mongoose from 'mongoose';

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url);
      }
    });

    stream.end(fileBuffer);
  });
};


export const addProduct = async (req, res) => {
  const { name, description, category, price, role, userId } = req.body;

  try {
    const files = req.files;
    const imageUrls = [];

    for (const file of files) {
      const imageUrl = await uploadToCloudinary(file.buffer);
      imageUrls.push(imageUrl);
    }

    const newProduct = new Product({
      name,
      description,
      category,
      price,
      role,
      images: imageUrls,
      userId: req.user.userId,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  const {name, category, productId } = req.query;
  const query = {};

  if(name) query.name = new RegExp(name, 'i');
  if(category) query.category = category;
  if(productId) query.productId = productId;

  try {
    const products = await Product.find(query).populate('userId');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};


//Get all product By Id
export const getProductByProductId = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate('userId', 'name rating');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

//Get Product By User
export const getProductByUser = async(req, res) => {
  try{
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

    const products = await Product.find({ userId });
    console.log(products)
    res.json(products);
  }catch(err){
    res.status(500).json({message: "Server error"});
  }
};


//Get Purchased Order By Buyer
export const getPurchasedProducts = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(req.user)

    const products = await Order.find({ buyerId: req.user.userId }).populate('productId');  //Poluted karna sa product collection sa ja kar uska bhi data la aata hai

    res.json(products);
  } catch (err) {
    console.error('Error fetching buyed products:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getSellingProducts = async (req, res) =>{
  try{
    const userId = req.user.userId;

    const products = await Product.find({
      userId,
      status: 'available'
    });

    res.json(products);
  }catch(err){
    console.error("Error fetching selling products:", err);
    res.status(500).json({message: 'Server error'});
  }
}

//Update Product
export const updateProduct = async (req, res) =>{
  const {id} = req.params;
  console.log(id);

  try{
    const updatedProduct  = await Product.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(updatedProduct);
  }catch(err){
    console.error('Update failed:', err.message);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
}


//Edit conditions
const steps = [
  'Order Placed',
  'Payment Completed',
  'Product Delivered',
  'Product Testing',
  'Payment Released',
  'sold'
];

//Delete Product
export const deleteProduct = async(req, res) => {
  const {id} = req.params;

  try{
    const product = await Product.findById(id);

     if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Prevent deletion if status is in the steps list
    if (steps.includes(product.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete product. Status is '${product.status}'`,
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Product deleted successfully' });

  }catch(err){
    console.error("Delete Product error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while deleting product",
    });
  }
};