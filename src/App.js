import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import ProductView from "./pages/ProductView";

function App() {
  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(localStorage.getItem('access_token'));
  }, [])
  return (
    <>
      <BrowserRouter>
          {token ? (
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route path="/product-view/:id" element={<ProductView />} />
            </Routes>
          ) :(
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
            </Routes>
            )}
      </BrowserRouter>
    </>
  );
}

export default App;
