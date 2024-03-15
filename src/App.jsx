import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from "react";
//styles
import "./App.css";
//components
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Accounts from "./components/Accounts";
import NavBar from "./components/Navbar";
import EstoreList from './components/EstoreList';
import EstoreItem from './components/EstoreItem';
import Cart from './components/Cart';

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [products, setProducts] = useState(null);
  const [localCart, setLocalCart] = useState(null);

  console.log("token", token);
  return <div>
    <BrowserRouter>
    <NavBar token={token} setToken={setToken} setUserId={setUserId} userId={userId} setLocalCart={setLocalCart}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register setToken={setToken}/>} />    
        <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} userId={userId}/>} />
        <Route path="/account/:id" element={<Accounts token={token} />} />
        <Route path="/estore" element={<EstoreList token={token} setProducts={setProducts} localCart={localCart} setLocalCart={setLocalCart}/>} />
        <Route path="/estoreitem/:id" element={<EstoreItem token={token}/> } />
        <Route path="/cart/:id" element={<Cart token={token} userId={userId} products={products} localCart={localCart} setLocalCart={setLocalCart}/>} />
      </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
