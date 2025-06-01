import Product from "../models/Product.js";

//Create new product
export const createProduct = async(req, res) =>{
    const {name, description, category, price, role, images} = req.body;
    try{
        const newProduct = new Product({
            name,
            description,
            category,
            price,
            role,
            images,
            userId: req.user.userId,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    }catch(error){
        res.status(500).json({message: "Failed to add product", error});
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