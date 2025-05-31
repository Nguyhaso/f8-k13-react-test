import {createBrowserRouter} from "react-router";
import Product from '../pages/Product'
import Order from '../pages/Order'
import OrderDetail from '../pages/Order/details'


const router = createBrowserRouter([
  {
    path: "/order",
    element: <Order/>,
  },
  {
    path: "/order/:id",
    element: <OrderDetail/>,
  },
  {
    path: "/product",
    element: <Product/>,
  },
]);

export default router