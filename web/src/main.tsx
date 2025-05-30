import { createRoot } from 'react-dom/client'
import './index.css'
import router from "./page/router.tsx"

import {RouterProvider,} from "react-router";


const root = document.getElementById("root");

createRoot(root!).render(
  <>
    <RouterProvider router={router} />
  </>
)
