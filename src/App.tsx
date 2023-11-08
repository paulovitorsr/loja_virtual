import {createBrowserRouter} from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { ProductDetail } from "./pages/Detail";

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/products/:id",
        element: <ProductDetail/>
      }
    ]
  }
])

export { router };