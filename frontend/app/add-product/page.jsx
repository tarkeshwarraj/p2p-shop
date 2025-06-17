'use client';

import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import axios from '@/lib/axios';

const AddProduct = () => {
  const router = useRouter();
  const [images, setImages] = useState([null, null]);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [role, setRole] = useState('');
  const [files, setFiles] = useState([null, null]); // for actual File upload
  const [status, setStatus] = useState('available')

  
  //Forum handle change
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newFiles = [...files];
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      newFiles[index] = file;
      setImages(newImages);
      setFiles(newFiles);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('role', role);
    formData.append('status', status);

    // append multiple images
files.forEach((file) => {
  // console.log(file);
  formData.append('images', file); // "images" matches the field name multer expects
});

    try{
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/add`, formData,{
        withCredentials: true, //Required to send cookies
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product Added:', res.data);

    }catch(err){
      console.error("Error adding product:", err.response?.data || err.message || err);
      alert("Failed to add product")
    }
  };
  
  
    // useEffect(()=>{
    //   if(!user){
    //     router.push('/auth');
    //   }
    // },[user, router])

  return (
  <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4 py-10'>
    <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 sm:p-8">

      {/* Back button */}
      <button
        onClick={() => router.back()}
        className='flex items-center text-indigo-600 hover:text-indigo-800 transition mb-6'
      >
        <ArrowLeft className='w-4 h-4 mr-1' />
        Back
      </button>

      {/* Header Section */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-1">Add Product</h2>
        <p className="text-gray-500 text-sm">Enter your product details below</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Product Images */}
        <div>
          <p className="text-sm font-medium">Product Image</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((image, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  accept="image/*"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => handleImageChange(e, index)}
                />
                <img
                  className="w-20 h-20 object-cover border rounded cursor-pointer"
                  src={
                    image
                      ? image
                      : 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png'
                  }
                  alt={`Upload ${index + 1}`}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="product-name" className="text-sm font-medium">Product Name</label>
          <input
            id="product-name"
            type="text"
            placeholder="Enter name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="py-2 px-3 rounded border border-gray-300 outline-none"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="product-description" className="text-sm font-medium">Description</label>
          <textarea
            id="product-description"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="py-2 px-3 rounded border border-gray-300 outline-none resize-none"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-sm font-medium">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="py-2 px-3 rounded border border-gray-300 outline-none"
          >
            <option value="">Select Category</option>
            {['Accounts', 'Drugs', 'Leads', 'Others'].map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>

        {/* Price and Role */}
        <div className="flex gap-3">
          <div className="flex-1 flex flex-col gap-1">
            <label htmlFor="product-price" className="text-sm font-medium">Price</label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="py-2 px-3 rounded border border-gray-300 outline-none"
              required
            />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <label htmlFor="role" className="text-sm font-medium">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="py-2 px-3 rounded border border-gray-300 outline-none"
            >
              <option value="">Select Role</option>
              {['Buyer', 'Seller'].map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded transition"
        >
          Add Product
        </button>
      </form>
    </div>
  </div>
);

};

export default AddProduct;
