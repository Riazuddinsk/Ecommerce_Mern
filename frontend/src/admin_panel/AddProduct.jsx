import { useState } from "react";
import api from "../api/axios.js";
import { 
  FaBoxOpen, FaTag, FaImage, FaRupeeSign, 
  FaListUl, FaWeightHanging, FaPalette, FaRuler, FaUpload ,FaArrowLeft
} from "react-icons/fa";
import { useParams, useNavigate, Link } from "react-router";

export default function AddProduct() {
  const userId = localStorage.getItem("userId");
  
  const categories = [
    "Electronics", "Men's Clothing", "Women's Clothing", "Kids Clothing", "Baby Clothing",
    "Footwear", "Accessories", "Beauty Products", "Groceries & Fresh Food", "Home Decor",
    "Furniture", "Kitchen Appliances", "Stationery", "Books", "Toys", "Games",
    "Fitness Accessories", "Pet Supplies", "Vehicles & Automotive", "Hardware", "Gardening",
    "Musical Instruments", "Gift Items", "Baby Products", "Medical Supplies",
    "Wedding Accessories", "Religious Items", "Digital Products", "Handmade Products",
    "Craft Supplies", "Antiques", "Collectibles", "Office Furniture", "Industrial Equipment",
    "Safety Equipment", "Solar Products", "Smart Home", "Others"
  ];

  const [form, setForm] = useState({
    title: "", description: "", new_price: "", old_price: "", quantity: "",
    category: "", tag: "", brand: "", size: "", color: "", weight: "", 
    image: "", image2: "", image3: "", image4: ""
  });
  
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while preserving aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG with lower quality level 
          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(compressedDataUrl);
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleLocalImageSelect = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Compress image down to max 800px width/height and 70% quality 
      const compressedBase64 = await compressImage(file, 800, 800, 0.7);
      setForm((prev) => ({ ...prev, [fieldName]: compressedBase64 }));
    } catch (err) {
      console.error("Image compression failed:", err);
      setMsg("⚠️️ Error compressing image. Try another file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    const normalizedForm = {
      ...form,
      image: form.image ? form.image.trim().replace(/\\/g, "/") : "",
      image2: form.image2 ? form.image2.trim().replace(/\\/g, "/") : "",
      image3: form.image3 ? form.image3.trim().replace(/\\/g, "/") : "",
      image4: form.image4 ? form.image4.trim().replace(/\\/g, "/") : "",
      userId
    };

    try {
      await api.post("/products/add", normalizedForm);
      setMsg("Product added successfully!");
      setForm({
        title: "", description: "", new_price: "", old_price: "", quantity: "",
        category: "", tag: "", brand: "", size: "", color: "", weight: "", 
        image: "", image2: "", image3: "", image4: ""
      });
    } catch (error) {
      console.error("Upload error details:", error);
      const errorMsg = error.response?.data?.message || error.message || "Server Error. Failed to add product.";
      setMsg(`⚠️ Error: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaBoxOpen className="text-indigo-600" /> 
            Add New Product
          </h1>
          <p className="text-gray-500 mt-2">Fill in the details below to list a new item in your store.</p>
        </div>

        <Link
            to="/products"
            className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors bg-indigo-50 px-4 py-2 rounded-lg w-fit"
          >
            <FaArrowLeft /> Back to Products
          </Link>
        </div>

        {msg && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
            msg.toLowerCase().includes("error") 
              ? "bg-red-50 text-red-600 border border-red-200" 
              : "bg-green-50 text-green-700 border border-green-200"
          }`}>
            <span className="text-lg">{msg.toLowerCase().includes("error") ? "⚠️" : "✅"}</span>
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">General Information</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., Wireless Noise-Cancelling Headphones"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  required
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter a detailed description of your product (minimum 100 characters)"
                  minLength={100}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><FaListUl /></div>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                    required
                  >
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Primary Image URL or Path *
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FaImage />
                    </div>
                    <input
                      type="text"
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="https://... or uploaded file"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      required
                    />
                  </div>
                  <label className="px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl cursor-pointer flex items-center gap-2 font-semibold text-sm transition-all shrink-0">
                    <FaUpload /> Browse
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLocalImageSelect(e, "image")}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {form.image && (
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={form.image}
                      alt="Preview 1"
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />
                    <span className="text-xs text-gray-400 truncate max-w-xs">Compressed preview 1</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Second Image URL or Path
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FaImage />
                    </div>
                    <input
                      type="text"
                      name="image2"
                      value={form.image2}
                      onChange={handleChange}
                      placeholder="https://... or uploaded file"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <label className="px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl cursor-pointer flex items-center gap-2 font-semibold text-sm transition-all shrink-0">
                    <FaUpload /> Browse
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLocalImageSelect(e, "image2")}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {form.image2 && (
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={form.image2}
                      alt="Preview 2"
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />
                    <span className="text-xs text-gray-400 truncate max-w-xs">Compressed preview 2</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Third Image URL or Path
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FaImage />
                    </div>
                    <input
                      type="text"
                      name="image3"
                      value={form.image3}
                      onChange={handleChange}
                      placeholder="https://... or uploaded file"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <label className="px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl cursor-pointer flex items-center gap-2 font-semibold text-sm transition-all shrink-0">
                    <FaUpload /> Browse
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLocalImageSelect(e, "image3")}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {form.image3 && (
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={form.image3}
                      alt="Preview 3"
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />
                    <span className="text-xs text-gray-400 truncate max-w-xs">Compressed preview 3</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fourth Image URL or Path
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FaImage />
                    </div>
                    <input
                      type="text"
                      name="image4"
                      value={form.image4}
                      onChange={handleChange}
                      placeholder="https://... or uploaded file"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <label className="px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl cursor-pointer flex items-center gap-2 font-semibold text-sm transition-all shrink-0">
                    <FaUpload /> Browse
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLocalImageSelect(e, "image4")}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {form.image4 && (
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={form.image4}
                      alt="Preview 4"
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />
                    <span className="text-xs text-gray-400 truncate max-w-xs">Compressed preview 4</span>
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Pricing & Inventory</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Selling Price *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><FaRupeeSign /></div>
                  <input
                    type="number"
                    name="new_price"
                    value={form.new_price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Original Price (MRP)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><FaRupeeSign /></div>
                  <input
                    type="number"
                    name="old_price"
                    value={form.old_price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 50"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Specifications</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="Brand Name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tag</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><FaTag /></div>
                  <input
                    type="text"
                    name="tag"
                    value={form.tag}
                    onChange={handleChange}
                    placeholder="e.g., New, Sale, Hot"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><FaRuler /></div>
                  <input
                    type="text"
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    placeholder="e.g., XL, 32, 5x7"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><FaPalette /></div>
                  <input
                    type="text"
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    placeholder="e.g., Matte Black"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Weight</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><FaWeightHanging /></div>
                  <input
                    type="text"
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    placeholder="e.g., 1.5 kg"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 pb-12">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto min-w-[200px] h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-95 disabled:opacity-70 flex justify-center items-center"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Publish Product"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}