import {createBrowserRouter} from "react-router";
import Order from './order.tsx'
import Product from "./product.tsx"

const router = createBrowserRouter([
  {
    path: "/order",
    element: <Order/>,
  },
  {
    path: "/product",
    element: <Product/>,
  },
]);
export default router