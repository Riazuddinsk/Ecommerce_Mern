import { Link } from "react-router";
import api from "../api/axios";
import { useState } from "react";

export default function Signup2(){
    const [form, setForm] = useState({
        name:"",
        email:"",
        password:""
    })
    const [msg, setMsg] = useState("")

    const handleChange =(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        try {
            const response = await api.post("/auth2/usersignup",form)
            setMsg(response.data.message)

            setForm({
                name:"",
                email:"",
                password:""
            })
            setTimeout(()=>{
                setMsg("")
            },4000)
        } catch (error) {
            setMsg("An Error Ocurred...")
        }
    }

    return(
        <div className="bg-[url('bg.png')] cover h-full  flex gap-5 pb-20 justify-center">
         <div className="hidden sm:block w-full md:w-2/5 lg:w-4/7 p-10 text-center">
          <h1 className="font-bold text-6xl lg:mt-30">Create Your Account</h1>
          <p className="text-xl mt-4 font-serif">Shop your favorite products with NexShop </p>
          <div className="  mt-5">
            <div className="lg:flex gap-17 mt-20 justify-center">
            <div >
                <p className=" mb-2"> Account Already Exist?</p>
                <Link to={"/customerLogin"} className="inline-block text-center bg-green-500 border-s-2 shadow-xl shadow-gray-500 h-14 w-60  py-3 text-2xl rounded-3xl font-serif duration-200 hover:bg-green-400" >Login</Link>
            </div>
            <div>
                <p className=" mt-10 lg:mt-0"> Want to sell on NexShop?</p>
               <Link to={"/signup"} className= "bg-amber-50 border-s-2 inline-block shadow-xl shadow-gray-500 mt-1 h-14 w-60 text-center py-3 text- rounded-3xl font-serif duration-200 hover:bg-blue-400" >Become a Seller</Link>
            </div>
            </div>
          </div>
         </div>
         <div className=" w-full md:w-3/5 lg:w-3/7 text-center pl-8 pr-8 ">
            <p className="block sm:hidden font-bold text-3xl mt-6 italic">Nex<span className=" font-normal not-italic">Shop</span></p>
            <h1 className=" block sm:hidden font-bold text-5xl mt-8">Create Your Account</h1>
            <p className="block sm:hidden text-xl mt-3 font-serif ">Shop your favorite products with NexShop </p>

            {msg &&(
                    <div className="mb-0 text-center mt-10 text-sm text-blue-600 font-medium"> {msg} </div>
             )}

            <div className="bg-blue-100 mt-5 md:mt-18 lg:mt-20 p-4 shadow-xl shadow-gray-400 rounded-3xl text-left">
                <form  onSubmit={handleSubmit} className="space-y-4 ">
                  <p className="font-bold text-xl font-serif mb-2">Name:</p>
                  <input 
                    type="text"
                    name='name'
                    placeholder="Enter Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className=" w-full px-5 py-2 border border-gray-400 bg-amber-50 h-15 rounded-3xl focus:outline-none focus:ring-1 focus:ring-blue-400"
                    required
                   />
                   <p className="font-bold text-xl font-serif mb-2">Email:</p>
                    <input 
                    type="email"
                    name='email'
                    placeholder="Enter Your Email"
                    value={form.email}
                    onChange={handleChange}
                    className=" w-full px-5 py-2 border border-gray-400 bg-amber-50 h-15 rounded-3xl focus:outline-none focus:ring-1 focus:ring-blue-400"
                    required
                   />
                   <p className="font-bold text-xl font-serif mb-2">Password:</p>
                    <input 
                    type="password"
                    name='password'
                    placeholder="Enter Your password"
                    value={form.password}
                    onChange={handleChange}
                    className=" w-full px-5 py-2 border border-gray-400 bg-amber-50 h-15 rounded-3xl focus:outline-none focus:ring-1 focus:ring-blue-400"
                    required
                   />
                   <button
                   type="submit"
                   className="w-full h-15 bg-blue-500 text-white py-2 px-4 rounded-3xl text-2xl cursor-pointer duration-200 hover:bg-blue-600 "
                   >
                    Sign Up
                    </button>
                </form>
            </div>
            <div className="flex gap-10 mt-5 block sm:hidden">
               <p className=" "> Account Already Exist?</p>
               <p className="ml-8"> Want to sell on NexShop?</p>
            </div>
            <div className="flex gap-10  block sm:hidden">
                <Link to={"/customerLogin"} className=" bg-green-500 border-s-2 shadow-xl shadow-gray-500 mt-1 h-14 w-50 text-center py-3 text-2xl rounded-3xl font-serif duration-200 hover:bg-green-400" >Login</Link>
                <Link to={"/signup"} className="bg-amber-50 border-s-2 shadow-xl shadow-gray-500 mt-1 h-14 w-70 text-center py-3 text- rounded-3xl font-serif duration-200 hover:bg-blue-400" >Become a Seller</Link>
             
            </div>
         </div>
         
       </div>
    )
}