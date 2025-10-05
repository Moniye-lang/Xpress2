import Home from "./pages/Home";
import About from "./pages/About";
import Order from "./pages/Order";
import Product from "./pages/Product";
import Contact from "./pages/Contact";

import Nav from "./pages/Nav";
import Footer from "./pages/Footer";
import { Routes,Route } from "react-router-dom";

  export default function App(){
    
    return(
      <div>
        <Nav></Nav>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/About' element={<About/>}></Route>
          <Route path='/Order' element={<Order/>}></Route>
          <Route path='/Product' element={<Product/>}></Route>
          <Route path='/Contact' element={<Contact/>}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    )
  }