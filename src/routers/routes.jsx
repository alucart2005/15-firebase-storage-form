import { BrowserRouter, Routes,Route } from "react-router-dom"
import { Home } from "../page/Home"
import { ProductosConfig } from "../page/ProductosConfig"

export function MyRoutes() {
  return(
    <>    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/" element={<ProductosConfig/>}/>
    </Routes>
    </BrowserRouter>

    </>
  )
}