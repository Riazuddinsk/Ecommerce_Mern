import { useState } from "react";
import { Link } from "react-router"; 
import api from "../api/axios";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaStore, FaShoppingBag } from "react-icons/fa";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile_number: "",
    password: "",
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
      const response = await api.post("/auth/signup", form);
      setMsg(response.data.message || "Merchant account created successfully!");

      setForm({
        name: "",
        email: "",
        mobile_number: "",
        password: "",
      });

      setTimeout(() => {
        setMsg("");
      }, 4000);
    } catch (error) {
      setMsg(error.response?.data?.message || error.message || "An error occurred");
      
      setTimeout(() => {
        setMsg("");
      }, 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 font-sans">
      
      <div className="lg:w-5/12 bg-gradient-to-br from-indigo-800 to-blue-900 text-white flex flex-col justify-between p-8 lg:p-16 shadow-2xl z-10">
        <div>
          <Link to="/" className="flex items-center gap-2 text-3xl font-bold tracking-wider mb-12 cursor-pointer">
            <FaShoppingBag className="text-amber-300" />
            <span>Nex<span className="font-light">Shop</span> <span className="text-sm font-normal text-indigo-300 tracking-normal ml-1">Merchant</span></span>
          </Link>
          
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Start Selling <br /> With Us Today.
          </h1>
          <p className="text-lg text-indigo-100 mb-12">
            Your Products. Your Brands. Create a merchant account to reach millions of shoppers and grow your business with NexShop.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-indigo-200 font-medium uppercase tracking-widest">Just looking to shop?</p>
          <Link
            to="/customerSignup"
            className="inline-flex items-center gap-3  bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-4 rounded-2xl font-medium transition-all backdrop-blur-sm"
          >
            <FaUser className="text-amber-300 text-xl" />
            Join as a Customer
          </Link>
        </div>
      </div>

      <div className="lg:w-7/12 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Store Account</h2>
            <p className="text-gray-500">Register your business to get started</p>
          </div>

          {msg && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-medium text-center transition-all ${
              msg.toLowerCase().includes("error") 
                ? "bg-red-50 text-red-600 border border-red-200" 
                : "bg-green-50 text-green-700 border border-green-200"
            }`}>
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name / Business Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FaStore />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Acme Corp"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Business Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="merchant@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FaPhone />
                </div>
                <input
                  type="number"
                  name="mobile_number"
                  placeholder="Enter 10-digit number"
                  value={form.mobile_number}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FaLock />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-indigo-700 cursor-pointer hover:bg-indigo-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-indigo-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 cursor-pointer border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Create Merchant Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-gray-600">
              Already have a merchant account?{" "}
              <Link to="/login" className="text-indigo-600  font-bold hover:underline">
                Log in here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center lg:hidden">
             <Link to="/customerSignup" className="text-gray-500 cursor-pointer text-sm font-medium hover:text-indigo-600 flex items-center justify-center gap-2">
                <FaUser /> Join as a Customer
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
}