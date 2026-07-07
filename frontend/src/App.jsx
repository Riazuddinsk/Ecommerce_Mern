import {createBrowserRouter, RouterProvider, Outlet} from "react-router";
import Signup from "./pages/Signup"
import Login from "./pages/Login";

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
      {
        path:"/signup",element:<Signup/>
  
      },
      {
        path:"/login",element:<Login/>
      }
    ]
  }
])

export default function App(){
  return <RouterProvider router={router} />
}
