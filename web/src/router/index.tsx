import {createBrowserRouter} from "react-router";
import Product from '../pages/Product'



const router = createBrowserRouter([

  {
    path: "/product",
    element: <Product/>,
  },
]);

export default router