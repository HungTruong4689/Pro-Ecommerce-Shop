
import { Container } from 'react-bootstrap'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {
  return (
    <Router >
      <Header />
      <main className="py-5">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact/>
            <Route path="/login" element={<LoginScreen/>} />
            <Route path="/register" element={<RegisterScreen/>} />
            <Route path="/profile" element={<ProfileScreen/>} />
            <Route path="/shipping" element={<ShippingScreen/>} />
            <Route path="/placeorder" element={<PlaceOrderScreen/>} />
            <Route path="/order/:id" element={<OrderScreen/>} />
            <Route path="/payment" element={<PaymentScreen/>} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
            <Route path="/admin/orderlist" element={<OrderListScreen/>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
