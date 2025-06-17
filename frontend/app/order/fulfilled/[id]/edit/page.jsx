"use client";
import { useEffect, useState } from "react";
import axios from '@/lib/axios';
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from 'lucide-react';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    role: "",
    status: "available",
    images: [],
  });

  const [newImageFile, setNewImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        const data = res.data.product;
        console.log(data.product);
        setForm({
          name: data.name || "",
          description: data.description || "",
          category: data.category || "",
          price: data.price || "",
          role: data.role || "",
          status: data.status || "available",
          images: data.images || [],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error loading product", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewImageFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!newImageFile) return;

    const data = new FormData();
    data.append("file", newImageFile);
    data.append("upload_preset", "p2p");

    try {
      setUploading(true);
      const res = await axios.post("https://api.cloudinary.com/v1_1/dbxllb1zl/image/upload", data);
      setForm({ ...form, images: [...form.images, res.data.secure_url] });
      setNewImageFile(null);
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, form);
      alert("Product updated!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4 py-10'>
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 sm:p-8">

        <button
          onClick={() => router.back()}
          className='flex items-center text-indigo-600 hover:text-indigo-800 transition mb-6'
        >
          <ArrowLeft className='w-4 h-4 mr-1' />
          Back
        </button>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-indigo-600 mb-1">Edit Product</h2>
          <p className="text-gray-500 text-sm">Update your product details below</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <p className="text-sm font-medium">Uploaded Images</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.images.map((img, idx) => (
                <img key={idx} src={img} alt={`Product ${idx}`} className="w-20 h-20 object-cover rounded" />
              ))}
            </div>
            <div className="mt-2">
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={!newImageFile || uploading}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mt-2"
              >
                {uploading ? "Uploading..." : "Upload New Image"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium">Product Name</label>
            <input
              name="name"
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="py-2 px-3 rounded border border-gray-300 outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              id="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="py-2 px-3 rounded border border-gray-300 outline-none resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <select
              name="category"
              id="category"
              value={form.category}
              onChange={handleChange}
              className="py-2 px-3 rounded border border-gray-300 outline-none"
            >
              <option value="">Select Category</option>
              {['Accounts', 'Drugs', 'Leads', 'Others'].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="price" className="text-sm font-medium">Price</label>
              <input
                name="price"
                id="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="py-2 px-3 rounded border border-gray-300 outline-none"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="role" className="text-sm font-medium">Role</label>
              <select
                name="role"
                id="role"
                value={form.role}
                onChange={handleChange}
                className="py-2 px-3 rounded border border-gray-300 outline-none"
              >
                <option value="">Select Role</option>
                {['Buyer', 'Seller'].map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="status" className="text-sm font-medium">Status</label>
            <select
              name="status"
              id="status"
              value={form.status}
              onChange={handleChange}
              className="py-2 px-3 rounded border border-gray-300 outline-none"
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
