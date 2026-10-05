import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { Link, useSearchParams } from "react-router";
import { MdCurrencyExchange, MdSecurity } from "react-icons/md";
import { FaTruck, FaHeadset, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";

export default function Home() {
  const [current, setCurrent] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [catagory, setCatagory] = useState("");
  const { setCartCount, refreshCartCount } = useCart();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const slides = [
    { url: "/images/1.png" },
    { url: "/images/2.png" },
    { url: "/images/3.png" },
    { url: "/images/4.png" },
    { url: "/images/5.png" },
    { url: "/images/6.png" },
    { url: "/images/7.png" },
  ];

  const infiniteSlides = [slides[slides.length - 1], ...slides, slides[0]];

  useEffect(() => {
    const autoplay = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(autoplay);
  }, []);

  useEffect(() => {
    if (current === infiniteSlides.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(1);
      }, 1000);
    }
    if (current === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(slides.length);
      }, 1000);
    }
  }, [current, infiniteSlides.length, slides.length]);

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  }, [isTransitioning]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("userId");

  const loadProduct = async () => {
    try {
      const res = await api.get(
        `/products/all?search=${search}&category=${catagory}`
      );
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [search, catagory]);

  const addToCart = async (productId) => {
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }
    try {
      await api.post("/cart/addToCart", { userId, productId });
      setCartCount((prev) => prev + 1);
      await refreshCartCount();
      alert("Product added to cart!");
    } catch (error) {
      console.error(error);
      alert("Failed to add product to cart");
    }
  };

  const categories = [
    { category: "Accessories", image: "/images/accessories.png" },
    { category: "Antiques", image: "/images/Antiques.png" },
    { category: "Baby Clothing", image: "/images/baby clothing.png" },
    { category: "Baby Products", image: "/images/Baby Products.png" },
    { category: "Beauty Products", image: "/images/beauty products.png" },
    { category: "Books", image: "/images/Books.png" },
    { category: "Electronics", image: "/images/Electronics.png" },
    { category: "Furniture", image: "/images/furniture.png" },
    { category: "Men's Wear", image: "/images/mens wear.png" },
    { category: "Women's Wear", image: "/images/womens wear.png" },
    { category: "Toys", image: "/images/Toys.png" },
  ]; 

  const [categoryIndex, setCategoryIndex] = useState(1);
  const [categoryTransition, setCategoryTransition] = useState(true);
  const infiniteCategories = [
    categories[categories.length - 1],
    ...categories,
    ...categories,
    ...categories,
  ];
  const CARD_WIDTH = 250;

  const nextCategory = () => setCategoryIndex((prev) => prev + 2);
  const prevCategory = () => setCategoryIndex((prev) => prev - 2);

  useEffect(() => {
    if (categoryIndex >= categories.length * 2) {
      setTimeout(() => {
        setCategoryTransition(false);
        setCategoryIndex(categories.length);
      }, 700);
    }
    if (categoryIndex <= 0) {
      setTimeout(() => {
        setCategoryTransition(false);
        setCategoryIndex(categories.length);
      }, 700);
    }
  }, [categoryIndex]);

  useEffect(() => {
    if (!categoryTransition) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCategoryTransition(true);
        });
      });
    }
  }, [categoryTransition]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCategoryIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-12 pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="relative h-[100px] md:h-[250px] lg:h-[350px] w-full rounded-3xl overflow-hidden shadow-lg bg-gray-900 group">
          <div
            className={`flex h-full w-full ${
              isTransitioning ? "transition-transform duration-1000 ease-in-out" : ""
            }`}
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {infiniteSlides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.url})` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          <div className="flex items-center gap-4 p-6">
            <div className="bg-indigo-50 p-3 rounded-full text-indigo-600">
              <FaTruck className="text-2xl" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Free Shipping</p>
              <p className="text-sm text-gray-500 font-medium hidden md:block">On Orders Over ₹500</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6">
            <div className="bg-indigo-50 p-3 rounded-full text-indigo-600">
              <MdCurrencyExchange className="text-2xl" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Easy Return</p>
              <p className="text-sm text-gray-500 font-medium hidden md:block">7 Days Return Policy</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6">
            <div className="bg-indigo-50 p-3 rounded-full text-indigo-600">
              <MdSecurity className="text-2xl" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Secure Payment</p>
              <p className="text-sm text-gray-500 font-medium hidden md:block">100% Secure Checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6">
            <div className="bg-indigo-50 p-3 rounded-full text-indigo-600">
              <FaHeadset className="text-2xl" />
            </div>
            <div>
              <p className="font-bold text-gray-900">24/7 Support</p>
              <p className="text-sm text-gray-500 font-medium hidden md:block">Always Here To Help</p>
            </div>
          </div>
        </div>

        <div className="mt-16 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Shop By Category</h2>
            {catagory && (
              <button
                onClick={() => setCatagory("")}
                className="flex items-center gap-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              >
                <FaTimes /> Clear Filter ({catagory})
              </button>
            )}
          </div>

          <div className="relative w-full group">
            <button
              onClick={prevCategory}
              className="absolute -left-4 cursor-pointer top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-xl text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100"
            >
              &#10094;
            </button>

            <div className="overflow-hidden px-4 py-2">
              <div
                className={`flex gap-6 ${categoryTransition ? "transition-transform duration-700 ease-in-out" : ""}`}
                style={{ transform: `translateX(-${categoryIndex * CARD_WIDTH}px)` }}
              >
                {infiniteCategories.map((item, index) => (
                  <div key={`${item.category}-${index}`} className="min-w-[220px] shrink-0 flex flex-col items-center group/card cursor-pointer" onClick={() => setCatagory(item.category)}>
                    <div
                      className={`h-56 w-full rounded-2xl overflow-hidden relative bg-cover bg-center transition-all duration-300 ${
                        catagory === item.category ? "ring-4 ring-indigo-500 shadow-lg" : "shadow-sm group-hover/card:shadow-md"
                      }`}
                      style={{ backgroundImage: `url("${item.image}")` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover/card:via-black/30 transition-all" />
                      <p className="absolute bottom-4 left-0 right-0 text-white font-bold text-lg text-center tracking-wide">
                        {item.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextCategory}
              className="absolute -right-4 cursor-pointer top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-xl text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100"
            >
              &#10095;
            </button>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
             <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
               {catagory ? `${catagory} Products` : "Featured Products"}
             </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const discount = Math.round(((product.old_price - product.new_price) / product.old_price) * 100);

              return (
                <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col group">
                  <Link to={`/product/${product._id}`} state={{ product }} className="relative block h-64 overflow-hidden bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover p-4 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                    />
                    {product.tag && (
                      <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-full ${
                        product.tag.toLowerCase() === "new" ? "bg-indigo-600" : "bg-red-500"
                      }`}>
                        {product.tag}
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg border border-green-200">
                        {discount}% OFF
                      </span>
                    )}
                  </Link>

                  <div className="p-5 flex flex-col flex-grow">
                    <Link to={`/product/${product._id}`} state={{ product }}>
                      <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 hover:text-indigo-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    
                    <div className="mt-auto pt-4">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-gray-900">₹{product.new_price}</span>
                        {product.old_price > product.new_price && (
                          <span className="text-sm text-gray-400 line-through">₹{product.old_price}</span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => addToCart(product._id)}
                        className="w-full bg-indigo-600 text-white cursor-pointer font-medium px-4 py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all"
                      >
                        <FaShoppingCart /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found for this category.</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {["Lower_banner_1.png", "Lower_banner_2.png", "Lower_banner_3.png"].map((banner, i) => (
            <div key={i} className="rounded-2xl overflow-hidden shadow-sm group relative cursor-pointer">
              <img 
                src={`/images/${banner}`} 
                alt={`Promo ${i+1}`} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>
          ))}
        </div>

      </div>

      <footer className="bg-gray-900 text-gray-300 mt-20 pt-16 pb-8 px-4 sm:px-6 lg:px-8 rounded-3xl mx-auto max-w-7xl ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <h4 className="text-white text-lg font-bold mb-6 tracking-wide uppercase">About</h4>
            <ul className="space-y-3">
              {["Contact Us", "About Us", "Careers", "Press", "Corporate Info", "Stores"].map(link => (
                <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-bold mb-6 tracking-wide uppercase">Group Info</h4>
            <ul className="space-y-3">
              {["Myntra", "Cleartrip", "Shopsy"].map(link => (
                <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-bold mb-6 tracking-wide uppercase">Help</h4>
            <ul className="space-y-3">
              {["Payments", "Shipping", "Cancellation", "Returns", "FAQ"].map(link => (
                <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-bold mb-6 tracking-wide uppercase">Policy</h4>
            <ul className="space-y-3">
              {["Return Policy", "Terms of Use", "Security", "Privacy", "Sitemap"].map(link => (
                <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-sm">
            <span className="flex items-center gap-1 md:gap-2 lg:gap-2 hover:text-white cursor-pointer"><span className="text-yellow-500">★</span> Become a Seller</span>
            <span className="flex items-center gap-1  md:gap-2 lg:gap-2 hover:text-white cursor-pointer"><span className="text-yellow-500">★</span> Advertise</span>
            <span className="flex items-center gap-1  md:gap-2 lg:gap-2 hover:text-white cursor-pointer"><span className="text-yellow-500">★</span> Gift Cards</span>
            <span className="flex items-center gap-1  md:gap-2 lg:gap-2 hover:text-white cursor-pointer"><span className="text-yellow-500">?</span> Help Center</span>
          </div>
          <p className="text-sm text-gray-500">© 2026 NexShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}