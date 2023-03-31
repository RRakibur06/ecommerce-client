import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Single from './pages/Single';
import Products from './pages/Products';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { CartContextProvider } from './context/cart/CartContext';
import Success from './pages/Success';
import { AuthContextProvider } from './context/auth/AuthContext';

const router = createBrowserRouter([
  {
    path : "/",
    element : <Home /> 
  },
  {
    path : "/products",
    element : <Products />
  },
  {
    path : "/cart",
    element : <Cart /> 
  },
  {
    path : "/:id",
    element : <Single /> 
  },
  {
    path : "/signin",
    element : <SignIn /> 
  },
  {
    path : "/signup",
    element : <SignUp /> 
  },
  {
    path : "/success",
    element : <Success /> 
  }
]);

function App() {

  return (
    <AuthContextProvider>
    <CartContextProvider>
      <div className="App">
        <RouterProvider router={router}/>
      </div>
    </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
