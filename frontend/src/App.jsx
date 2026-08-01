import {createBrowserRouter, RouterProvider, Outlet} from "react-router";
import Signup from "./pages/Signup"
import Login from "./pages/Login";
import Signup2 from "./pages/CoustomerSignup";
import Login2 from "./pages/CustomerLogin";
import AddProduct from "./admin_panel/AddProduct";
import EditProduct from "./admin_panel/EditProduct"
import ProductList from "./admin_panel/ProductList";

function Layout() {
  return (
    <>
    <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element:<Layout />,
    children:[
      { path:"/signup",element:<Signup/> },
      { path:"/login",element:<Login/> },
      { path:"/customerSignup",element:<Signup2/>},
      { path:"/customerLogin", element:<Login2/>},
      { path:"/addProduct", element:<AddProduct/>},
      { path:"/editProduct/:id", element:<EditProduct/>},
      { path:"/products", element:<ProductList/>}
    ]
  }
])

export default function App(){
  return <RouterProvider router={router} />
}
