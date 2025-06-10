import Product from "../models/Product.js";

//Create new product
export const addProduct = async(req, res) =>{
    const {name, description, category, price, role, userId } = req.body;
    try{

      console.log("Files:", req.files);
      console.log("Body:", req.body);

        const imageUrls = req.files.map((file) => file.path); // or file.secure_url //Get Cloudinary images URLs

        const newProduct = new Product({
            name,
            description,
            category,
            price,
            role,
            images: imageUrls, //Correct way
            userId: req.user.userId,
        });

        console.log(newProduct);

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    }catch(error){
      console.error("Add Product Error:", error);
      
      // Send a JSON response with error info
    res.status(500).json({
    message: "Failed to add product",
    error: error.message || error.toString(),
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });
    }
}

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("userId", "name rating");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};



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



//Get product By Product Id
// export const getProductByProductId = async( req, res) =>{
//     const {productId } = req.params;

//     try{
//         const product = await Product.findOne({productId}).populate("userId", "name rating");
        
//         if(!product){
//             return res.status(404).json({message: "product not found"});
//         }

//         res.status(200).json(product);
//     }catch (error){
//         res.status(500).json({message: "Error fetching product", error});
//     }
// };