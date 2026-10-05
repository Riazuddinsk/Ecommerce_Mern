import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, Link } from "react-router"; 
import api from "../api/axios.js";
import {
  FaShoppingCart, FaBolt, FaCheckCircle,
  FaMapMarkerAlt, FaCreditCard, FaMoneyBillWave,
  FaMinus, FaPlus
} from "react-icons/fa";
import { FaTrash } from "react-icons/fa"
import { useCart } from "../context/CartContext.jsx";

export default function Product() {
  const { id } = useParams();
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const { refreshCartCount } = useCart();

  // 1. Read product directly from the Link state
  const stateProduct = location.state?.product || null;

  const [product, setProduct] = useState(stateProduct);
  const [loading, setLoading] = useState(!stateProduct);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState([]);
  const [selected, setSelected] = useState("");
  const [pay, setPay] = useState("Cash on Delivery");
  const [isSuccess, setIsSuccess] = useState(false);

  const checkoutRef = useRef(null);

  const loadAddress = async () => {
    if (!userId) return;
    try {
      const res = await api.get(`/address/${userId}`);
      setAddress(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAddress();
  }, []);

  useEffect(() => {
    if (product) return;

    const fetchFallback = async () => {
      try {
        setLoading(true);
        const res = await api.get("/products/all");
        const found = res.data.find((item) => String(item._id) === String(id));
        setProduct(found || null);
      } catch (error) {
        console.error("Failed to load product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFallback();
  }, [id, product]);

  const handleAddToCart = async () => {
    if (!userId) {
      alert("Please log in first!");
      return;
    }

    try {
      setIsAdding(true);
      await api.post("/cart/addToCart", {
        userId,
        productId: product._id,
        quantity 
      });
      await refreshCartCount();
      setMessage("Item added to cart successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Could not add to cart. Try again.");
    } finally {
      setIsAdding(false);
    }
  };

  const toggleCheckout = () => {
    if (!userId) {
      alert("Please log in first to buy!");
      return;
    }
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        checkoutRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handlePayment = () => {
    if (!selected) {
      alert("Please select a shipping address first!");
      return;
    }
    setIsSuccess(true);
  };

  const deleteAddress = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Address? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/address/delete/${id}`);
     
      setAddress((prev) => prev.filter((product) => product._id !== id));

      setTimeout(() => {
      }, 3000);
    } catch (error) {

      setTimeout(() => {
      }, 3000);
    }
  };

  const swapMainImage = (sideImage) => {
    

  setProduct((prev) => {
    const mainImage = prev.image;

    return {
      ...prev,
      image: prev[sideImage],
      [sideImage]: mainImage,
    };
  });
};
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-bold text-gray-900">Product not found</h2>
        <p className="text-gray-500 mb-4">The item you are looking for doesn't exist or has been removed.</p>
        <Link to="/" className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
          Back to Shop
        </Link>
      </div>
    );
  }

  const discountPercent = product.old_price && product.old_price > product.new_price
    ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
    : 0;
  const total = product.new_price * quantity;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center max-w-md w-full">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Order Placed!</h2>
          <p className="text-gray-600 mb-8">
            Your purchase of <span className="font-semibold text-gray-900">{product.title}</span> was successful via {pay}.
          </p>
          <Link to="/" className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md shadow-indigo-200">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans pb-24">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          <div className="">
            <div className="flex justify-center h-80 lg:h-120 md:h-120  lg:w-100 md:w-100   items-center bg-gray-50 border border-gray-100 rounded-3xl p-8 relative overflow-hidden group">
            {product.tag && (
              <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-full z-10 ${product.tag.toLowerCase() === "new" ? "bg-indigo-600" : "bg-red-500"
                }`}>
                {product.tag}
              </span>
            )}
            <img
              src={product.image}
              alt={product.title}
               onClick={() => swapMainImage("image")}
              className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="h-40  lg:w-100 md:w-100 mt-5 rounded-3xl flex gap-2 justify-center items-center">
            <div className=" w-24 md:w-31 lg:w-31 h-30 lg:h-38 md:lg-38 rounded-3xl">
              <img
              src={product.image2}
              alt={product.title}
               onClick={() => swapMainImage("image2")}
              className="w-full h-full object-cover cursor-pointer rounded-3xl mix-blend-multiply hover:scale-105 transition-transform duration-500"
            />
            </div>
            <div className=" w-24 md:w-31 lg:w-31 h-30 lg:h-38 md:lg-38 rounded-3xl">
              <img
              src={product.image3}
              alt={product.title}
               onClick={() => swapMainImage("image3")}
              className="w-full h-full object-cover cursor-pointer rounded-3xl mix-blend-multiply hover:scale-105 transition-transform duration-500"
            />
            </div>
            <div className=" w-24 md:w-31 lg:w-31 h-30 lg:h-38 md:lg-38 rounded-3xl">
              <img
              src={product.image4}
              alt={product.title}
               onClick={() => swapMainImage("image4")}
              className="w-full h-full object-cover cursor-pointer rounded-3xl mix-blend-multiply hover:scale-105 transition-transform duration-500"
            />
            </div>
          </div>
          </div>

          <div className="flex flex-col justify-center">

            <div className="mb-2">
              <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">{product.brand || product.category}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-gray-900">
                ₹{product.new_price}
              </span>
              {product.old_price && product.old_price > product.new_price && (
                <span className="text-xl text-gray-400 line-through">
                  ₹{product.old_price}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-lg border border-green-200">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <div className="mb-8">
              <p className="text-gray-600 leading-relaxed text-base">
                {product.description || "No description provided for this item."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-y border-gray-100 py-6 mb-8">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Color</p>
                <p className="font-semibold text-gray-900">{product.color || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Size</p>
                <p className="font-semibold text-gray-900">{product.size || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Weight</p>
                <p className="font-semibold text-gray-900">{product.weight || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Availability</p>
                <p className={`font-semibold ${product.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
                  {product.quantity > 0 ? `In Stock (${product.quantity})` : "Out of Stock"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <span className="font-semibold text-gray-900">Quantity</span>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-10 flex items-center justify-center cursor-pointer text-gray-600 hover:text-indigo-600 hover:bg-white rounded-full transition-colors shadow-sm"
                >
                  <FaMinus size={14} />
                </button>
                <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.min(product.quantity || 99, prev + 1))}
                  className="w-10 h-10 flex items-center cursor-pointer justify-center text-gray-600 hover:text-indigo-600 hover:bg-white rounded-full transition-colors shadow-sm"
                >
                  <FaPlus size={14} />
                </button>
              </div>
            </div>

            {message && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm font-medium flex items-center gap-2 transition-all">
                <FaCheckCircle /> {message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdding || product.quantity === 0}
                className="flex-1 bg-white border-2 border-indigo-600 cursor-pointer text-indigo-600 hover:bg-indigo-50 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaShoppingCart />
                {isAdding ? "Adding..." : "Add to Cart"}
              </button>
              <button
                type="button"
                onClick={toggleCheckout}
                disabled={product.quantity === 0}
                className={`flex-1 font-bold py-3.5 px-6 rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${isOpen ? "bg-gray-800 hover:bg-gray-900 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
                  }`}
              >
                <FaBolt />
                {isOpen ? "Cancel Checkout" : "Buy Now"}
              </button>
            </div>

          </div>
        </div>

        {isOpen && (
          <div ref={checkoutRef} className="mt-8 bg-white rounded-3xl shadow-sm border border-indigo-100 p-6 md:p-10 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Express Checkout</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              <div className="space-y-8">

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FaMapMarkerAlt className="text-indigo-600" />
                    <h3 className="text-lg font-bold text-gray-900">Delivery Address</h3>
                  </div>

                  {address.length === 0 ? (
                    <div className="text-center p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                      <p className="text-gray-500 mb-2">No saved addresses found.</p>
                      <Link to="/add-address" className="text-indigo-600 font-medium hover:underline">
                        + Add New Address
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {address.map((item) => (
                        <div key={item._id} className="relative">
                          <label
                            key={item._id}
                            className={`relative flex cursor-pointer min-h-37 rounded-xl border p-4 transition-all focus:outline-none ${selected === item._id
                                ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600"
                                : "border-gray-200 bg-white hover:border-indigo-300"
                              }`}
                          >
                            <input
                              type="radio"
                              name="address"
                              value={item._id}
                              checked={selected === item._id}
                              onChange={() => setSelected(item._id)}
                              className="sr-only"
                            />
                            <div className="flex w-full flex-col">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-semibold text-gray-900">{item.FullName}</p>
                                {selected === item._id && <FaCheckCircle className="text-indigo-600" />}
                              </div>
                              <p className="text-sm text-gray-600">{item.Street_Address}, {item.City}</p>
                              <p className="text-sm text-gray-600">{item.State} - {item.PinCode}</p>
                              <p className="mt-2 text-sm font-medium text-gray-500">📞 {item.PhoneNumber}</p>
                            </div>
                          </label>
                          <div className="flex">

                            <button
                              onClick={(e) => {
                                e.preventDefault(); 
                                deleteAddress(item._id);
                              }}
                              className="absolute top-30 right-4 text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                              title="Delete Address"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>

                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FaCreditCard className="text-indigo-600" />
                    <h3 className="text-lg font-bold text-gray-900">Payment Method</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className={`relative flex items-center gap-3 cursor-pointer rounded-xl border p-4 transition-all ${pay === "Online Payment" ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600" : "border-gray-200 bg-white hover:border-indigo-300"
                      }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="Online Payment"
                        checked={pay === "Online Payment"}
                        onChange={() => setPay("Online Payment")}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-600 border-gray-300"
                      />
                      <FaCreditCard className={pay === "Online Payment" ? "text-indigo-600" : "text-gray-400"} />
                      <span className="font-semibold text-gray-900 text-sm">Online Payment</span>
                    </label>

                    <label className={`relative flex items-center gap-3 cursor-pointer rounded-xl border p-4 transition-all ${pay === "Cash on Delivery" ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600" : "border-gray-200 bg-white hover:border-indigo-300"
                      }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="Cash on Delivery"
                        checked={pay === "Cash on Delivery"}
                        onChange={() => setPay("Cash on Delivery")}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-600 border-gray-300"
                      />
                      <FaMoneyBillWave className={pay === "Cash on Delivery" ? "text-indigo-600" : "text-gray-400"} />
                      <span className="font-semibold text-gray-900 text-sm">Cash on Delivery</span>
                    </label>
                  </div>
                </div>

              </div>

              <div>
                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 h-full flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Order Summary</h3>

                  <div className="flex gap-4 mb-6">
                    <div className="h-20 w-20 bg-white rounded-lg border border-gray-200 p-2 flex-shrink-0">
                      <img src={product.image} alt="Thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 line-clamp-2 text-sm">{product.title}</p>
                      <p className="text-gray-500 text-sm mt-1">Qty: {quantity}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm mb-6 flex-grow">
                    <div className="flex justify-between text-gray-600">
                      <span>Item Total</span>
                      <span className="font-medium text-gray-900">₹{product.new_price * quantity}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span className="font-medium text-green-600">FREE</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Payable</span>
                    <span className="text-2xl font-bold text-indigo-600">₹{total}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handlePayment}
                    className="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md shadow-indigo-200 active:scale-95"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}