import {useState} from "react";
import {useNavigate, Link} from "react-router";
import api from "../api/axios.js";

export default function Login(){
    const [form, setForm] = useState({
        email:"",
        password:""
    })
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user.id);
            setMsg("Login Successful");

            setTimeout(()=>{
                navigate("/");
            },2000)
        } catch (error) {
            setMsg(error.response?.data?.message || "An error occured")
            setTimeout(()=>{
                setMsg("")
            },2000)
        }
    }

    return(
        <div className="bg-[url('bg.png')] cover h-full  flex gap-5 pb-20 justify-center">
         <div className="hidden sm:block w-full md:w-2/5 lg:w-4/7 p-10 text-center">
          <h1 className="font-bold text-6xl lg:mt-30">Login To Your Merchant Account</h1>
          <p className="text-xl mt-4 font-serif">Your Products, your Brands. Start selling with NexShop </p>
          <div className="  mt-5">
            <div className="lg:flex gap-17 mt-20 justify-center">
            <div >
                <p className=" mb-2"> Account Does Not Exist?</p>
                <Link to={"/signup"} className="inline-block text-center bg-green-500 border-s-2 shadow-xl shadow-gray-500 h-14 w-60  py-3 text-2xl rounded-3xl font-serif duration-200 hover:bg-green-400" >Signup</Link>
            </div>
            <div>
                <p className=" mt-10 lg:mt-0"> Login As Customer?</p>
               <Link to={"/customerLogin"} className= "bg-amber-50 border-s-2 inline-block shadow-xl shadow-gray-500 mt-1 h-14 w-60 text-center py-3 text- rounded-3xl font-serif duration-200 hover:bg-blue-400" >Login  AS Customer</Link>
            </div>
            </div>
          </div>
         </div>
         <div className=" w-full md:w-3/5 lg:w-3/7 text-center pl-8 pr-8 ">
            <p className="block sm:hidden font-bold text-3xl mt-6 italic">Nex<span className=" font-normal not-italic">Shop</span></p>
            <h1 className=" block sm:hidden font-bold text-5xl mt-8">Login To Your Merchant Account</h1>
            <p className="block sm:hidden text-xl mt-3 font-serif ">Your Products, your Brands. Start selling with NexShop </p>

            {msg &&(
                    <div className="mb-0 text-center mt-10 text-sm text-blue-600 font-medium"> {msg} </div>
             )}

            <div className="bg-blue-100 mt-5 md:mt-18 lg:mt-20 p-4 shadow-xl shadow-gray-400 rounded-3xl text-left">
                <form  onSubmit={handleSubmit} className="space-y-4 ">
                  
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
                    Login
                    </button>
                </form>
            </div>
            <div className="flex gap-10 mt-5 block sm:hidden">
               <p className=" "> Account Does not Exist?</p>
               <p className="ml-8"> Login As Customer?</p>
            </div>
            <div className="flex gap-10  block sm:hidden">
                <Link to={"/signup"} className=" bg-green-500 border-s-2 shadow-xl shadow-gray-500 mt-1 h-14 w-50 text-center py-3 text-2xl rounded-3xl font-serif duration-200 hover:bg-green-400" >Sign Up</Link>
                <Link to={"/customerLogin"} className="bg-amber-50 border-s-2 shadow-xl shadow-gray-500 mt-1 h-14 w-70 text-center py-3 text- rounded-3xl font-serif duration-200 hover:bg-blue-400" >Login As Customer</Link>
             
            </div>
         </div>
         
       </div>
    )
}