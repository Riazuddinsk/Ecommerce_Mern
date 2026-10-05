import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router"; // Use "react-router-dom" if required
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, setCartCount } = useCart();

  // Hide search bar on auth and admin pages
  const hideSearch =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/customerSignup" ||
    location.pathname === "/customerLogin" ||
    location.pathname === "/addProduct" ||
    location.pathname === "/products" ||
    location.pathname === "/cart" ||
    location.pathname === "/checkout" ||
    location.pathname.startsWith("/product/") ||
  location.pathname === "/add-address" ||
  location.pathname.startsWith("/edit-address/") ||
  location.pathname.startsWith("/editProduct/")

  const hideCart = 
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/customerSignup" ||
    location.pathname === "/customerLogin" ||
    location.pathname === "/addProduct" ||
    location.pathname === "/products" ||
    location.pathname.startsWith("/editProduct/")

  const hideProfile=
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/customerSignup" ||
    location.pathname === "/customerLogin"

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    navigate(`/?search=${encodeURIComponent(value)}`);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Load cart count when Navbar loads
  useEffect(() => {
    const loadCartCount = async () => {
      if (!userId) return;
      try {
        const res = await api.get(`/cart/${userId}`);
        const total = res.data?.items?.reduce(
          (sum, item) => sum + item.quantity,
          0
        ) || 0;
        setCartCount(total);
      } catch (error) {
        console.error("Error loading cart count:", error);
      }
    };

    loadCartCount();
  }, [userId, setCartCount]);

  const handleLogout = () => {
    localStorage.clear(); 
    window.location.href = "/customerLogin"; 
};

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20 gap-4">
          
          {/* 1. LOGO */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-1 group">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors hidden sm:block">
              <FaShoppingCart className="text-xl" />
            </div>
            <p className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              Nex<span className="text-indigo-600 font-normal">Shop</span>
            </p>
          </Link>

          {/* 2. SEARCH BAR (Desktop & Mobile - Outside Menu) */}
          {!hideSearch && (
            <div className="flex-1 max-w-2xl mx-auto">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 group-focus-within:text-indigo-500 transition-colors text-sm md:text-base" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={handleSearch}
                  className="w-full pl-9 md:pl-11 pr-4 py-2 md:py-2.5 bg-gray-100 border-transparent rounded-full text-xs md:text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-gray-700"
                />
              </div>
            </div>
          )}

          {/* 3. RIGHT ACTIONS (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* User Profile / Login */}
            {!hideProfile && userId ? (
              <div className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 py-1.5 px-4 rounded-full transition-colors cursor-pointer">
                <div className="bg-indigo-100 text-indigo-600 p-1.5 rounded-full">
                  <FaUser className="text-sm" />
                </div>
                <div className="text-sm">
                  <p className="text-gray-500 text-xs leading-none">Hello,</p>
                  <p className="font-semibold text-gray-900 leading-tight truncate max-w-[100px]">{userName}</p>
                </div>
              </div>
            ) :!hideProfile && (
              <Link
                to="/customerLogin"
                className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                <FaUser className="text-lg" />
                <span>Login</span>
              </Link>
            )}

            {/* Cart Icon */}
            {userId && !hideCart && (
              <Link to="/cart" className="relative p-2 group">
                <FaShoppingCart className="text-2xl text-gray-700 group-hover:text-indigo-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full border-2 border-white">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            )}

            {!hideProfile && userId ? (
                  <div className=""> 
                    <button 
                       onClick={()=>handleLogout()}
                       className="cursor-pointer bg-gray-50  border-indigo-100 border h-10 py-1.5 px-4 rounded-full hover:bg-gray-100 hover:border-indigo-200 transition-colors"
                       >Logout</button>
                  </div>
            ):(
              <div></div>
            )

            }
          </div>

          {/* 4. MOBILE MENU TOGGLE */}
          {!hideProfile && (
            <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none p-2 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer"
            >
              {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
          )

          }
        </div>
      </div>

      {/* 5. MOBILE MENU (Collapsible) */}
      {!hideProfile && (
        <div className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 py-4' : 'max-h-0 py-0'}`}>
        <div className="px-4 space-y-3 flex flex-col">
          
          {/* Mobile User Section */}
          {userId ? (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full flex-shrink-0">
                <FaUser className="text-base" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-500 text-xs">Logged in as</p>
                <p className="font-bold text-gray-900 truncate">{userName}</p>
              </div>

              {!hideProfile && userId ? (
                  <div className=""> 
                    <button 
                       onClick={()=>handleLogout()}
                       className="cursor-pointer bg-gray-50 border-indigo-100 border h-10 py-1.5 px-4 rounded-full hover:bg-gray-100 hover:border-indigo-200 transition-colors"
                       >Logout</button>
                  </div>
            ):(
              <div></div>
            )

            }
            </div>
          ) : (
            <Link
              to="/customerLogin"
              className="flex items-center justify-center gap-2 w-full bg-indigo-50 text-indigo-600 font-semibold py-3 rounded-xl hover:bg-indigo-100 transition-colors"
            >
              <FaUser />
              Login / Sign Up
            </Link>
          )}

          {/* Mobile Cart Section */}
          {userId && (
            <Link
              to="/cart"
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 transition-colors"
            >
              <div className="flex items-center gap-3 text-gray-700">
                <FaShoppingCart className="text-xl" />
                <span className="font-semibold">My Cart</span>
              </div>
              
              <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                {cartCount} Items
              </div>
            </Link>
          )}

        </div>
      </div>
      )

      }
    </nav>
  );
}