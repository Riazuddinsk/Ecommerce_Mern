import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router"; // Use "react-router-dom" depending on your version
import { FaPlus, FaEdit, FaTrash, FaBoxOpen, FaRupeeSign, FaTag } from "react-icons/fa";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products?userId=${userId}`);
      setProducts(response.data);
    } catch (error) {
      setMsg("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/delete/${id}`);
      setMsg("Product Deleted Successfully");

      // Remove deleted product immediately from state
      setProducts((prev) => prev.filter((product) => product._id !== id));

      setTimeout(() => {
        setMsg("");
      }, 3000);
    } catch (error) {
      setMsg("Server Error");

      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
  };

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FaBoxOpen className="text-indigo-600" /> 
              My Products
            </h1>
            <p className="text-gray-500 mt-2">Manage your inventory, pricing, and product details.</p>
          </div>
          
          <Link
            to="/addProduct"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-md shadow-indigo-200 active:scale-95"
          >
            <FaPlus /> Add New Product
          </Link>
        </div>

        {/* Alert Message */}
        {msg && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
            msg.toLowerCase().includes("error") || msg.toLowerCase().includes("failed")
              ? "bg-red-50 text-red-600 border border-red-200" 
              : "bg-green-50 text-green-700 border border-green-200"
          }`}>
            <span className="text-lg">
              {msg.toLowerCase().includes("error") || msg.toLowerCase().includes("failed") ? "⚠️" : "✅"}
            </span>
            {msg}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-500 font-medium">Loading your inventory...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center max-w-2xl mx-auto mt-10">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-300 rounded-full flex items-center justify-center mb-6">
              <FaBoxOpen className="text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              You haven't added any products to your store yet. Start listing your items to reach more customers.
            </p>
            <Link
              to="/addProduct"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all"
            >
              <FaPlus /> Add Your First Product
            </Link>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col group"
              >
                
                {/* Product Image */}
                <div className="relative h-56 bg-gray-50 border-b border-gray-100 p-4">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <FaBoxOpen className="text-4xl mb-2 opacity-50" />
                      <span className="text-sm font-medium">No Image</span>
                    </div>
                  )}
                  {/* Category Badge Overlay */}
                  {product.category && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-gray-700 rounded-md shadow-sm">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1" title={product.title}>
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
                    {product.description || "No description provided."}
                  </p>

                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Selling Price</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900 flex items-center">
                          <FaRupeeSign className="text-sm" />{product.new_price}
                        </span>
                        {product.old_price && product.old_price > product.new_price && (
                          <span className="text-sm text-gray-400 line-through">₹{product.old_price}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Stock</p>
                      <span className={`text-sm font-bold ${product.quantity > 10 ? 'text-green-600' : product.quantity > 0 ? 'text-amber-500' : 'text-red-500'}`}>
                        {product.quantity} Units
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                    <Link
                      to={`/editProduct/${product._id}`}
                      className="flex items-center justify-center gap-2 w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2.5 rounded-lg font-medium transition-colors text-sm"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="flex items-center justify-center gap-2 w-full bg-red-50 hover:bg-red-100 text-red-700 py-2.5 rounded-lg font-medium transition-colors text-sm cursor-pointer"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}