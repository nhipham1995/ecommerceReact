import React, {useState, useEffect} from 'react';
import {commerce} from './lib/commerce';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Products, Navbar, Cart, Checkout} from './components'; 

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [order, setOrder] = useState({});



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

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };
  
  const handleEmptyCart = async()=>{
    const res = await commerce.cart.empty();
    setCart(res.cart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    console.log(checkoutTokenId, newOrder);
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      console.log(newOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
      console.log('error')
    }
    return;
  };

  const demo = () =>{
    console.log('hoho');
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
          <Route exact path="/" element={<Products 
                                            products = {products} 
                                            onAddToCart={handleAddToCart}/>} />
          <Route exact path="/cart" element={<Cart 
                                                cart={cart}
                                                handleUpdateCartQty={handleUpdateCartQty}
                                                handleRemoveFromCart={handleRemoveFromCart}
                                                handleEmptyCart={handleEmptyCart}/>} 
          />
          <Route exact path='/checkout' element={<Checkout 
                                                    cart={cart} 
                                                    onCaptureCheckout={handleCaptureCheckout} 
                                                    error={errorMessage}  
                                                    order={order}
                                                    demo={demo}
                                                    />}
                                                    />
        </Routes>      
      </div>
    </Router>   
  )
}

export default App;