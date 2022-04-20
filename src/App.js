import React, {useState, useEffect} from 'react';
import {commerce} from './lib/commerce';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Products, Navbar, Cart, Checkout} from './components'; 

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const res = await commerce.cart.update(productId, {quantity});
    setCart(res.cart);
  }
  const handleRemoveFromCart = async(productId)=>{
    const res = await commerce.cart.remove(productId);
    setCart(res.cart);
  }

  const handleEmptyCart = async()=>{
    const res = await commerce.cart.empty();
    setCart(res.cart);
  }
  useEffect(()=>{
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems= {cart.total_items}/>
        <Routes>
          <Route exact path="/" element={<Products products = {products} onAddToCart={handleAddToCart}/>} />
          <Route exact path="/cart" element={<Cart 
                                                cart={cart}
                                                handleUpdateCartQty={handleUpdateCartQty}
                                                handleRemoveFromCart={handleRemoveFromCart}
                                                handleEmptyCart={handleEmptyCart}/>} 
          />
          <Route exact path='/checkout' element={<Checkout cart={cart}/>}></Route>
        </Routes>      
      </div>
    </Router>   
  )
}

export default App;