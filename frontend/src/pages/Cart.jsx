import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { Link } from "react-router"; 
import { useCart } from "../context/CartContext";
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const userId = localStorage.getItem("userId");
  const { refreshCartCount } = useCart();

  const loadCart = async () => {
    try {
      const res = await api.get(`/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId) => {
    await api.post(`/cart/removeFromCart`, { userId, productId });
    loadCart();
    await refreshCartCount();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const changeQut = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItem(productId);
      return;
    }
    await api.post(`/cart/updateItem`, { userId, productId, quantity });
    await refreshCartCount();
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const totals = cart.items.reduce(
    (acc, item) => {
      const qty = item.quantity;
      const oldPrice = item.productId.old_price || 0;
      const newPrice = item.productId.new_price || 0;

      acc.totalQuantity += qty;
      acc.mrpTotal += oldPrice * qty;
      acc.subTotal += newPrice * qty;
      return acc;
    },
    { totalQuantity: 0, mrpTotal: 0, subTotal: 0 }
  );

  const discountTotal = totals.mrpTotal - totals.subTotal;

  

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FaShoppingCart className="text-3xl text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Shopping Cart</h1>
        </div>

        {cart.items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center flex flex-col items-center">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
              <FaShoppingCart className="text-4xl text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <FaArrowLeft />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">

            <div className="lg:w-2/3 flex flex-col gap-6">
              {cart.items.map((item) => (
                <div
                  key={item.productId._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 transition-all hover:shadow-md"
                >
                  <Link
                    to={`/product/${item.productId._id}`}
                    state={{ product: item.productId }}
                    className=" md:w-32 lg:w-32  w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100"
                  >
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </Link>

                  <div className="flex-1 w-full flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${item.productId._id}`} state={{ product: item.productId }}>
                        <h3 className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2">
                          {item.productId.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{item.productId.brand}</p>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <span className="text-xl font-bold text-gray-900">₹{item.productId.new_price}</span>
                      {item.productId.old_price > item.productId.new_price && (
                        <span className="text-sm text-gray-400 line-through">₹{item.productId.old_price}</span>
                      )}
                    </div>
                  </div>

                  <div className="w-full sm:w-auto flex sm:flex-col items-center justify-between gap-4">
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
                      <button
                        onClick={() => changeQut(item.productId._id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-200 rounded-md transition-colors  cursor-pointer"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="w-10 text-center font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => changeQut(item.productId._id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId._id)}
                      className="text-red-500 hover:text-red-700 flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer"
                    >
                      <FaTrash />
                      <span className="sm:hidden">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 text-gray-600 mb-6">
                  <div className="flex justify-between">
                    <span>Items ({totals.totalQuantity}):</span>
                    <span className="font-medium text-gray-900">₹{totals.mrpTotal}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span className="font-medium">- ₹{discountTotal}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                    <span className="text-2xl font-bold text-indigo-600">₹{totals.subTotal}</span>
                  </div>
                </div>

                {discountTotal > 0 && (
                  <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm text-center font-medium mb-6">
                    🎉 You will save ₹{discountTotal} on this order
                  </div>
                )}

                <Link
                  to="/checkout"
                  className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-colors shadow-sm shadow-indigo-200 mb-4"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/"
                  className="w-full flex justify-center items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                >
                  <FaArrowLeft size={14} />
                  Continue Shopping
                </Link>
                
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}