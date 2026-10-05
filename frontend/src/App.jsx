import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Signup from "./pages/Signup"
import Login from "./pages/Login";
import Signup2 from "./pages/CoustomerSignup";
import Login2 from "./pages/CustomerLogin";
import AddProduct from "./admin_panel/AddProduct";
import EditProduct from "./admin_panel/EditProduct"
import ProductList from "./admin_panel/ProductList";
import Cart from "./pages/Cart"
import Home from "./pages/Home"
import Navbar from "./components/Navbar";
import CheckOut from "./pages/CheckOut";
import Product from "./pages/Product"
import AddAddress from "./pages/AddAddress"
import EditAddress from "./pages/EditAddress"
import SellerRoute from "../src/components/SallerRoutes"

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/customerSignup", element: <Signup2 /> },
      { path: "/customerLogin", element: <Login2 /> },
      { path: "/", element: <Home /> },
      { path: "/product/:id", element: <Product /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <CheckOut /> },
      { path: "/add-address", element: <AddAddress /> },
      { path: "/edit-address/:id", element: <EditAddress /> },
      {
        element: <SellerRoute />, // The Gatekeeper
        children: [
          { path: "/addProduct", element: <AddProduct /> },
          { path: "/editProduct/:id", element: <EditProduct /> },
          { path: "/products", element: <ProductList /> },
        ],
      },
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
