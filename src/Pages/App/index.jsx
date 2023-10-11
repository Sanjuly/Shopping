import { useContext } from 'react'
import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom'
import { ShoppingCartProvider, initializeLocalStore, ShoppingCartContext } from '../../Context'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import NavBar from '../../Components/NavBar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import './App.css'

const AppRoutes = () => {
  const context = useContext(ShoppingCartContext)
   //sign out
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)
  const isUserSignOut = context.signOut || parsedSignOut

    //Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    //Has an account
    const noAccountLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountLocalState = context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountLocalStorage || !noAccountLocalState


  let routes = useRoutes([
  {path: '/', element: hasUserAnAccount && !isUserSignOut ?  <Home /> : <Navigate replace to={'/sign-in'} />},
  {path: '/:category', element: hasUserAnAccount && !isUserSignOut ?  <Home /> : <Navigate replace to={'/sign-in'} />},
  {path: '/my-account', element: <MyAccount />},
  {path: '/my-order', element: <MyOrder />},
  {path: '/my-orders', element: <MyOrders />},
  {path: '/my-orders/last', element: <MyOrder />},
  {path: '/my-orders/:id', element: <MyOrder />},
  {path: '/sign-in', element: <SignIn />},
  {path: '*', element: <NotFound/>}
])
  return(routes)
}
const App = () => {
  //Initialize local storage and state for shopping cart
  initializeLocalStore()
  return (
    <>
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <NavBar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
    </>
  )
}
export default App
