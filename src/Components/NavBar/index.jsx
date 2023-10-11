import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { NavLink } from "react-router-dom"
import ShoppingCart from '../ShoppingCart'
import './style.css'


function NavBar() {
    const context = useContext(ShoppingCartContext)
    const activeStyle = 'underline underline-offset-4'
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
    
    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true)
        localStorage.setItem('sign-out', stringifiedSignOut)
        context.setSignOut(true)
    }
    const renderView = () => {
        if (hasUserAnAccount && !isUserSignOut) {
            return (
            <>
                <li className='text-gray-600'>{parsedAccount.email}</li>
                <li><NavLink to='/my-orders' className={({ isActive}) => isActive ? activeStyle: undefined}>My Orders</NavLink></li>
                <li><NavLink to='/my-account' className={({ isActive}) => isActive ? activeStyle: undefined}>My Account</NavLink></li>
                <li><NavLink to='/sign-in' className={({ isActive}) => isActive ? activeStyle: undefined}
                    onClick={()=>handleSignOut()}>Sign Out</NavLink>{/**close section*/}
                </li>
            </>
            )
        } else {
            return (
            <>
                <li>
                    <NavLink to='/sign-in' className={({ isActive}) => isActive ? activeStyle: undefined}
                    onClick={()=>handleSignOut()}>
                        Sign in {/**initial section*/}
                    </NavLink>
                </li>
            </>
            )
        }
    }
return (
    <nav className='flex justify-between py-4 px-10 w-full bg-white border-b-2 border-gray-100 fixed z-10 text-sm font-light top-0'>
        <ul className='navbar flex items-center gap-3'>
                <li className='text-lg font-bold mr-4'>
                <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>
                    S H O P P I N G
                </NavLink>
                </li>
                <li><NavLink to='/'  onClick={() => context.setSearchByCategory('')} className={({ isActive}) => isActive ? activeStyle: undefined}>All</NavLink></li>
                <li><NavLink to='/clothing' onClick={() => context.setSearchByCategory('clothing')} className={({ isActive}) => isActive ? activeStyle: undefined}>Clothing</NavLink></li>
                <li><NavLink to='/jewelery' onClick={() => context.setSearchByCategory('jewelery')} className={({ isActive}) => isActive ? activeStyle: undefined}>Jewelery</NavLink></li>
                <li><NavLink to='/electronics' onClick={() => context.setSearchByCategory('electronics')} className={({ isActive}) => isActive ? activeStyle: undefined}>Electronics</NavLink></li>
        </ul>
        <ul className='flex items-center gap-2'>
            {renderView()}
            <ShoppingCart />
        </ul>
    </nav>
    )
}

export default NavBar