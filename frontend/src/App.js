import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Shop from './pages/Shop';
import Home from './pages/Home';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import OrderSuccess from './pages/OrderSuccess';
import PaymentMethod from "./pages/PaymentMethod";
import LoginSignup  from './pages/LoginSignup';
import SingleProduct from './pages/SingleProduct';
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/product/:id" element={<SingleProduct/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/login" element={<LoginSignup/>}/>
            <Route path="/checkout" element={<CheckOut/>}/>
            <Route path="/payment-method" element={<PaymentMethod/>} />
            {/* <Route path="/payment-confirmation" element={<PaymentConfirmationPage />} />*/}
            <Route path="/order-success" element={<OrderSuccess />} /> 
          </Routes>
        <Footer />
        </BrowserRouter>
        <ToastContainer position="top-center" />
        
    </div>
  );
}

export default App;
