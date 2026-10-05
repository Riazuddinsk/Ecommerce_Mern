import { useState } from "react";
import { Link, useNavigate } from "react-router"; 
import api from "../api/axios.js";
import { 
  FaUser, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCity, 
  FaMap, 
  FaHashtag, 
  FaArrowLeft 
} from "react-icons/fa";

export default function AddAddress() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    FullName: "",
    PhoneNumber: "",
    Street_Address: "",
    City: "",
    District:"",
    State: "",
    PinCode: "",
  });

  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/address/add", {
        ...form,
        userId: userId,
      });

      setMsg("Address added successfully!");
      
      setTimeout(() => {
        navigate("/checkout");
      }, 1500);

    } catch (error) {
      setMsg(error.response?.data?.message || "Failed to add address. Please try again.");
      setTimeout(() => {
        setMsg("");
      }, 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FaMapMarkerAlt className="text-indigo-600" />
              Add New Address
            </h1>
            <p className="text-gray-500 mt-2">Enter your delivery details below.</p>
          </div>
          <Link 
            to="/checkout" 
            className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors bg-indigo-50 px-4 py-2 rounded-lg"
          >
            <FaArrowLeft /> Back to Checkout
          </Link>
        </div>

        {msg && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
            msg.toLowerCase().includes("failed") 
              ? "bg-red-50 text-red-600 border border-red-200" 
              : "bg-green-50 text-green-700 border border-green-200"
          }`}>
            <span className="text-lg">{msg.toLowerCase().includes("failed") ? "⚠️" : "✅"}</span>
            {msg}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    name="FullName"
                    value={form.FullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <FaPhone />
                  </div>
                  <input
                    type="tel"
                    name="PhoneNumber"
                    value={form.PhoneNumber}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address (House No, Building, Area) *</label>
                <textarea
                  name="Street_Address"
                  value={form.Street_Address}
                  onChange={handleChange}
                  placeholder="e.g., 123 Main Street, Apartment 4B"
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                  required
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <FaCity />
                  </div>
                  <input
                    type="text"
                    name="City"
                    value={form.City}
                    onChange={handleChange}
                    placeholder="e.g., Mumbai"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <FaMap />
                  </div>
                  <input
                    type="text"
                    name="State"
                    value={form.State}
                    onChange={handleChange}
                    placeholder="e.g., Maharashtra"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">District *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <FaMap />
                  </div>
                  <input
                    type="text"
                    name="District"
                    value={form.District}
                    onChange={handleChange}
                    placeholder="e.g., Maharashtra"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">PIN / ZIP Code *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <FaHashtag />
                  </div>
                  <input
                    type="text"
                    name="PinCode"
                    value={form.PinCode}
                    onChange={handleChange}
                    placeholder="e.g., 400001"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    required
                  />
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-gray-100 mt-8">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto min-w-[200px] bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md shadow-indigo-200 active:scale-95 disabled:opacity-70 flex justify-center items-center float-right"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Save Address"
                )}
              </button>
              <div className="clear-both"></div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}