import './App.css';
import Login from './pages/login/login';
import SignUp from './pages/signup/signup';
import Home from './pages/homePage/homePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route,Routes,Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import getData from './redux/action/action';
import Navbar from './components/navbar/navbar';
import Cart from './pages/cart/cart';
import AllProducts from './components/allProducts/allProducts';


function App(){
  const {isLoggedIn,user} = useSelector(state =>state)

  console.log(user)
  const dispatch = useDispatch()
  let token = localStorage.getItem('token')
  useEffect(()=>{
    dispatch(getData(token))
  },[])

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/login" element = {isLoggedIn?<Navigate to = "/"/>: <Login />} />
        <Route path = "/signup" element = {<SignUp />} />
        <Route path = "/cart" element = {<Cart />} />
        <Route path = '/allproducts' element = {<AllProducts />} />
      </Routes>
    </div>
  )
}

export default App;
