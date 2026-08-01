import { useState } from "react";
import api from "../api/axios.js"

export default function AddProduct(){
  const categories = [
  "Electronics",
  "Mobiles",
  "Laptops",
  "Tablets",
  "Smart Watches",
  "Headphones",
  "Speakers",
  "Cameras",
  "Televisions",
  "Gaming Consoles",
  "Computer Accessories",
  "Printers",
  "Monitors",
  "Keyboards",
  "Mouse",
  "Power Banks",
  "Chargers",
  "Phone Cases",
  "Screen Protectors",
  "Storage Devices",
  "Men's Clothing",
  "Women's Clothing",
  "Kids Clothing",
  "Baby Clothing",
  "T-Shirts",
  "Shirts",
  "Jeans",
  "Pants",
  "Shorts",
  "Jackets",
  "Hoodies",
  "Sweaters",
  "Blazers",
  "Suits",
  "Sarees",
  "Kurtis",
  "Lehengas",
  "Hijabs",
  "Abayas",
  "Nightwear",
  "Shoes",
  "Sneakers",
  "Sandals",
  "Slippers",
  "Boots",
  "Sports Shoes",
  "Formal Shoes",
  "Bags",
  "Backpacks",
  "Wallets",
  "Handbags",
  "Travel Bags",
  "Luggage",
  "Jewelry",
  "Necklaces",
  "Rings",
  "Bracelets",
  "Earrings",
  "Watches",
  "Perfumes",
  "Beauty Products",
  "Skincare",
  "Hair Care",
  "Makeup",
  "Lipstick",
  "Foundation",
  "Nail Polish",
  "Face Wash",
  "Soap",
  "Shampoo",
  "Conditioner",
  "Body Lotion",
  "Deodorants",
  "Groceries",
  "Rice",
  "Flour",
  "Cooking Oil",
  "Spices",
  "Tea",
  "Coffee",
  "Snacks",
  "Soft Drinks",
  "Juices",
  "Chocolate",
  "Biscuits",
  "Dairy Products",
  "Frozen Food",
  "Vegetables",
  "Fruits",
  "Meat",
  "Fish",
  "Eggs",
  "Bakery",
  "Home Decor",
  "Furniture",
  "Sofas",
  "Beds",
  "Dining Tables",
  "Chairs",
  "Wardrobes",
  "Curtains",
  "Carpets",
  "Wall Art",
  "Lighting",
  "Kitchen Appliances",
  "Cookware",
  "Dinner Sets",
  "Water Bottles",
  "Storage Containers",
  "Cleaning Supplies",
  "Stationery",
  "Books",
  "Notebooks",
  "Pens",
  "Pencils",
  "Markers",
  "School Bags",
  "Office Supplies",
  "Art Supplies",
  "Toys",
  "Educational Toys",
  "Action Figures",
  "Dolls",
  "Board Games",
  "Puzzles",
  "Sports Equipment",
  "Cricket",
  "Football",
  "Basketball",
  "Books",
  "Badminton",
  "Gym Equipment",
  "Yoga Mats",
  "Cycling",
  "Camping",
  "Fitness Accessories",
  "Pet Food",
  "Pet Toys",
  "Pet Accessories",
  "Dog Supplies",
  "Cat Supplies",
  "Car Accessories",
  "Bike Accessories",
  "Helmets",
  "Car Care",
  "Motor Oils",
  "Tools",
  "Hardware",
  "Garden Tools",
  "Plants",
  "Seeds",
  "Fertilizers",
  "Musical Instruments",
  "Guitars",
  "Keyboards",
  "Drums",
  "Microphones",
  "Party Supplies",
  "Gift Items",
  "Greeting Cards",
  "Gift Wrap",
  "Baby Products",
  "Diapers",
  "Baby Toys",
  "Baby Care",
  "Medical Supplies",
  "Vitamins",
  "Health Devices",
  "Thermometers",
  "Blood Pressure Monitors",
  "Fashion Accessories",
  "Belts",
  "Caps",
  "Sunglasses",
  "Scarves",
  "Umbrellas",
  "Wedding Accessories",
  "Religious Items",
  "Islamic Books",
  "Prayer Mats",
  "Tasbeeh",
  "Quran",
  "Digital Products",
  "Software",
  "Gift Cards",
  "E-Books",
  "Online Courses",
  "Handmade Products",
  "Craft Supplies",
  "Antiques",
  "Collectibles",
  "Office Furniture",
  "Industrial Equipment",
  "Safety Equipment",
  "Solar Products",
  "Smart Home",
  "Security Cameras",
  "Door Locks",
  "LED Lights",
  "Bicycles",
  "Scooters",
  "Electric Vehicles",
  "Luxury Items",
  "Others"
];
      const [form, setForm] = useState({
        title:"",
        description:"",
        new_price:"",
        old_price:"",
        quantity:"",
        category:"",
        tag:"",
        brand:"",
        size:"",
        color:"",
        weight:"",
        image:""
      })
      const [msg, setMsg] = useState("")

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            await api.post("/products/add",form)
            setMsg("Item add successfully")
            setForm({
              title: "",
              description: "",
              new_price: "",
              old_price: "",
              quantity: "",
              category: "",
              tag: "",
              brand: "",
              size: "",
              color: "",
              weight: "",
              image: ""
            })
            setTimeout(()=>{
                setMsg("")
            },5000)
        } catch (error) {
            setMsg("Server Error")
            setTimeout(()=>{
                setMsg("")
            },5000)
        }
    }

    return(
      
          <div className="bg-[url('/addProductBg.png')] bg-cover bg-center min-h-screen flex gap-0  py-10 justify-center">
            <form onSubmit={handleSubmit} className=" h-1vh w-lvw ">
                <h1 className="font-bold text-3xl font-serif text-center" >Add Your Products</h1>
                {msg && (
                  <p className="text-green-600 text-center mt-4 mb-2">{msg}</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:px-8 px-15 mt-5">
                    <div className="bg-transparent shadow-olive-700 shadow-2xl backdrop-blur-sm mt-10 h-135 w-full  rounded-3xl p-4">
                       <p className="text-2xl text-black font-bold  font-serif overflow-hidden text-center ">Basic Information</p>
                       <p className="text-xm mt-10 font-bold ">Product Name:</p>
                       <input
                       name="title"
                       value={form.title}
                       onChange={handleChange}
                       type="text"
                       placeholder="Enter your product name"
                       className="h-12 w-full bg-amber-100 rounded-3xl text-black text-xm p-4 mt-2 border-gray-400 border-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                       />
                       <p className="text-xm mt-5 font-bold">Description:</p>
                       <textarea
                       name="description"
                       value={form.description}
                       onChange={handleChange}
                       type="text"
                       minLength={100}
                       placeholder="Enter product's description (minimum 100 characters)"
                       className="h-25 w-full bg-amber-100 rounded-3xl text-black text-xm p-4 mt-2 border-gray-400 border-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                       />
                       <p className="text-xm mt-5 font-bold">Category:</p>
                       <select
                       name="category"
                       value={form.category}
                       onChange={handleChange}
                       className="h-12 w-full bg-amber-100 rounded-3xl text-black text-xm p-2 mt-2 border-gray-400 border-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                       >
                       <option value="">Select Category</option>
                        {categories.map((category) => (
                        <option key={category} value={category}> {category} </option>
                        ))}
                       </select> 
                       <p className="text-xm mt-5 font-bold">Image URL:</p>
                       <input
                       name="image"
                       value={form.image}
                       onChange={handleChange}
                       type="text"
                       placeholder="Enter your image url"
                       className="h-12 w-full bg-amber-100 rounded-3xl text-black text-xm p-4 mt-2 mb-8 border-gray-400 border-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                       />
                    </div>
                    <div className="bg-transparent shadow-olive-700 shadow-2xl backdrop-blur-sm mt-10 h-135  rounded-3xl p-4">
                        <p className="text-2xl text-black font-bold font-serif overflow-hidden text-center">Advance Information</p>
                        <p className="text-xm mt-10 font-bold">Price:</p>
                        <input
                         name="new_price"
                         value={form.new_price}
                         onChange={handleChange}
                         type="text"
                         placeholder="Enter your items's price"
                         className="h-12 w-full bg-amber-100 rounded-3xl text-black text-xm p-4 mt-2 mb-2 border-gray-400 border-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                       />
                       <p className="text-xm mt-5 font-bold">Quantity:</p>
                        <input
                         name="quantity"
                         value={form.quantity}
                         onChange={handleChange}
                         type="text"
                         placeholder="Enter your item's quantity"
                         className="h-12 w-full bg-amber-100 rounded-3xl text-black text-xm p-4 mt-2 mb-2 border-gray-400 border-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                       />
                       <p className="text-xm mt-5 font-bold">Brand:</p>
                        <input
                         name="brand"
                         value={form.brand}
                         onChange={handleChange}
                         type="text"
                         placeholder="Enter your item's brand name"
                         className="h-12 w-full bg-amber-100 rounded-3xl text-black text-xm p-4 mt-2 mb-2 border-gray-400 border-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                       />
                       <p className="text-xm mt-5 font-bold">Size:</p>
                        <input
                         name="size"
                         value={form.size}
                         onChange={handleChange}
                         type="text"
                         placeholder="Enter your item's size (eg: xl / 32 / 5x7 m^2)"
                         className="h-12 w-full bg-amber-100 rounded-3xl text-black text-xm p-4 mt-2 mb-2 border-gray-400 border-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                       />
                    </div>
                    <div className="bg-transparent shadow-olive-700 shadow-2xl backdrop-blur-sm mt-10 h-135  rounded-3xl p-4">
                        <p className="text-2xl text-black font-bold  font-serif overflow-hidden text-center">Optional</p>
                        <p className="text-xm mt-10 font-bold">Color:</p>
                        <input
                         name="color"
                         value={form.color}
                         onChange={handleChange}
                         type="text"
                         placeholder="Enter your items's color"
                         className="h-12 w-full bg-amber-100 rounded-3xl text-black text-xm p-4 mt-2 mb-2 border-gray-400 border-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                       />
                       <p className="text-xm mt-5 font-bold">Weight:</p>
                        <input
                         name="weight"
                         value={form.weight}
                         onChange={handleChange}
                         type="text"
                         placeholder="Enter your item's weight"
                         className="h-12 w-full bg-amber-100 rounded-3xl text-black text-xm p-4 mt-2 mb-2 border-gray-400 border-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                       />
                       <p className="text-xm mt-5 font-bold">Old Price:</p>
                        <input
                         name="old_price"
                         value={form.old_price}
                         onChange={handleChange}
                         type="text"
                         placeholder="Enter your item's old price"
                         className="h-12 w-full bg-amber-100 rounded-3xl text-black text-xm p-4 mt-2 mb-2 border-gray-400 border-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                       />
                       <p className="text-xm mt-5 font-bold">tag:</p>
                        <input
                         name="tag"
                         value={form.tag}
                         onChange={handleChange}
                         type="text"
                         placeholder="Enter your item's tag (eg: new / offers )"
                         className="h-12 w-full bg-amber-100 rounded-3xl text-black text-xm p-4 mt-2 mb-2 border-gray-400 border-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                       />
                    </div>
                </div>
                <div className="flex lg:justify-end justify-center">
                  <button 
                type="submit"
                className=" h-15 bg-red-600 text-white lg:mr-15 py-2 px-4 rounded-3xl text-2xl cursor-pointer duration-200 hover:bg-yellow-900 mt-10 w-70 "
                >
                Add Product</button>
                </div>
                
            </form>
            </div>
            
    )
}