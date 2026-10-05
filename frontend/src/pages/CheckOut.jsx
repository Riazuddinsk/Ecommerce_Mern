import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { Link } from "react-router"; 
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaBox
} from "react-icons/fa";
import { FaTrash } from "react-icons/fa"

export default function CheckOut() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState(null);
  const [selected, setSelected] = useState("");
  const [pay, setPay] = useState("Cash On Delivery"); 
  const [isSuccess, setIsSuccess] = useState(false);

  const loadProduct = async () => {
    try {
      const res = await api.get(`/cart/${userId}`);
      setCart(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadAddress = async () => {
    try {
      const res = await api.get(`/address/${userId}`);
      setAddress(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProduct();
    loadAddress();
  }, []);

  if (!cart || !address) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const totals = cart.items.reduce(
    (acc, item) => {
      acc.qty += item.quantity;
      acc.mrp += item.productId.old_price * item.quantity;
      acc.sub += item.productId.new_price * item.quantity;
      return acc;
    },
    { qty: 0, mrp: 0, sub: 0 }
  );

  const discountTotal = totals.mrp - totals.sub;

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
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full border border-gray-100">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Order Confirmed!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order was successfully placed via{" "}
            <span className="font-semibold text-gray-800">{pay}</span>.
          </p>
          <Link
            to="/"
            className="block w-full bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Secure Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">

          <div className="lg:w-2/3 flex flex-col gap-6">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <FaMapMarkerAlt className="text-indigo-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Select Shipping Address</h2>
              </div>

              {address.length === 0 ? (
                <div className="text-center p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-600 mb-4">You don't have any saved addresses.</p>
                  
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {address.map((item) => (
                    <div key={item._id} className="relative">
                      <label
                        key={item._id}
                        className={`relative flex cursor-pointer rounded-xl border p-4 min-h-40 transition-all focus:outline-none ${selected === item._id
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
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-gray-900">{item.FullName}</p>
                            {selected === item._id && (
                              <FaCheckCircle className="text-indigo-600" />
                            )}
                          </div>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                            {item.Street_Address}, {item.City}, {item.District}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.State} - <span className="font-medium">{item.PinCode}</span>
                          </p>
                          <p className="mt-3 text-sm font-medium text-gray-500 flex items-center gap-2">
                            📞 {item.PhoneNumber}
                          </p>
                        </div>
                      </label>

                      <div className="flex">
                        <button
                          onClick={(e) => {
                            e.preventDefault(); // Prevents clicking the label
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
              <div className="mt-5"><Link to="/add-address" className="text-indigo-600 font-medium ml-80">
                    + Add New Address
                  </Link></div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <FaCreditCard className="text-indigo-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`relative flex items-center gap-4 cursor-pointer rounded-xl border p-4 transition-all ${pay === "Online Payment"
                    ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600"
                    : "border-gray-200 bg-white hover:border-indigo-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Online Payment"
                    checked={pay === "Online Payment"}
                    onChange={() => setPay("Online Payment")}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-gray-300 cursor-pointer"
                  />
                  <FaCreditCard className={pay === "Online Payment" ? "text-indigo-600" : "text-gray-400"} size={24} />
                  <span className="font-semibold text-gray-900">Online Payment</span>
                </label>

                <label
                  className={`relative flex items-center gap-4 cursor-pointer rounded-xl border p-4 transition-all ${pay === "Cash On Delivery"
                    ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600"
                    : "border-gray-200 bg-white hover:border-indigo-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Cash On Delivery"
                    checked={pay === "Cash On Delivery"}
                    onChange={() => setPay("Cash On Delivery")}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-gray-300 cursor-pointer"
                  />
                  <FaMoneyBillWave className={pay === "Cash On Delivery" ? "text-indigo-600" : "text-gray-400"} size={24} />
                  <span className="font-semibold text-gray-900">Cash on Delivery</span>
                </label>
              </div>
            </div>

          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <FaBox className="text-indigo-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              </div>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {cart.items.map((item) => (
                  <div key={item.productId._id} className="flex items-center gap-4 py-2">
                    <div className="h-16 w-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={item.productId.image}
                        alt={item.productId.title}
                        className="h-full w-full object-cover mix-blend-multiply p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {item.productId.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      ₹{item.quantity * item.productId.new_price}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({totals.qty}):</span>
                  <span className="font-medium text-gray-900">₹{totals.mrp}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span className="font-medium">- ₹{discountTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges:</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-gray-900">Total Payable:</span>
                <span className="text-2xl font-bold text-indigo-600">₹{totals.sub}</span>
              </div>

              <button
                onClick={handlePayment}
                className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 cursor-pointer"
              >
                Place Order — ₹{totals.sub}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}