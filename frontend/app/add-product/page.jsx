'use client';

import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

const AddProduct = () => {
  const router = useRouter();
  const [images, setImages] = useState([null, null]);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [role, setRole] = useState('');
  const [files, setFiles] = useState([null, null]); // for actual File upload

  
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

    // append multiple images
files.forEach((file) => {
  // console.log(file);
  formData.append('images', file); // "images" matches the field name multer expects
});

    try{
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/add`, formData,{
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
    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">.

    {/* Back button */}
    <button
      onClick={()=> router.back()}
      className='flex items-center text-indigo-600 hover:text-indigo-800 transition mb-6'
    >
      <ArrowLeft className='w-4 h-4 mr-1'/>
      Back
    </button>

      {/* Header Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-indigo-600 tracking-wide mb-2">
          Add New Product
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Fill in the details below to showcase your amazing product!
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Product Images */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
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
                  className="max-w-24 h-24 object-cover border rounded cursor-pointer"
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
        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-name" className="text-base font-medium">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-description" className="text-base font-medium">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Category Dropdown */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="category" className="text-base font-medium">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e)=> setCategory(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Category</option>
            {['Accounts', 'Drugs', 'Leads', 'Others'].map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Price & Offer Price */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label htmlFor="product-price" className="text-base font-medium">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        
        {/* Select Role */}
          <div className="flex-1 flex flex-col gap-1 w-32">
          <label htmlFor="category" className="text-base font-medium">
            My Role
          </label>
          <select
            id="my-role"
            value={role}
            onChange={(e)=>{setRole(e.target.value)}}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Role</option>
            {['Buyer', 'Seller'].map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        </div>

        {/* Submit Button */}
        <button className="px-8 py-2.5 bg-indigo-500 hover:bg-indigo-600 transition text-white font-medium rounded">
          ADD
        </button>
      </form>
    </div>
  </div>
  );
};

export default AddProduct;
