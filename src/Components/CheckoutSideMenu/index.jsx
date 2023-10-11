import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { Link } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/solid'
import OrderCard from '../../Components/OrderCard'
import { totalPrice } from '../../utils'
import './styles.css'


const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext)

    const handleDelete = (id) => {
        const filteredProducts = context.productsInCart?.filter(product => product.id !=id)
        context.setProductsInCart(filteredProducts)//modify productsInCart
    }
    const handleCheckout = () => {
        const orderToAdd = {
            date: '29.09.23',
            products: context.productsInCart,
            totalProducts: context.productsInCart.length,
            totalPrice: totalPrice(context.productsInCart)
        }
        if (Array.isArray(context.myOrder)) {
            context.setMyOrder([...context.myOrder, orderToAdd])
        } else {
            context.setMyOrder(orderToAdd)
        }
        context.setProductsInCart([])//for clean array
        context.closeIsCheckoutSideMenu()
        context.setSearchByTitle(null)
        context.setSearchByCategory()
    }
    return (
        <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu fixed flex flex-col bg-white/90 border border-black/50`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-bold text-md'>My Order</h2>
                <button>
                    <XMarkIcon
                    onClick={() => context.closeIsCheckoutSideMenu()}
                    className='w-6 h-6 border border-black text-black cursor-pointer'></XMarkIcon>
                </button>
            </div>
            <div className='px-4 overflow-y-scroll flex-1'>
            {
                context.productsInCart.map(product => (
                    <OrderCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        imageUrl={product.image}
                        handleDelete={handleDelete}
                        />
                ))
            }
            </div>
            <div className='px-6 mb-4'>
                <p className='flex justify-between items-center mb-3'>
                    <span className='font-light text-2xl'>Total:</span>
                    <span className='font-medium text-2xl'>{totalPrice(context.productsInCart).toFixed(2)}</span>  
                </p>
                <Link to='/my-orders/last'>
                    <button className='bg-gray-400 py-3 text-black text-lg font-bold w-full'
                    onClick={() => handleCheckout()}>Checkout</button>
                </Link>
            </div>
        </aside>
    )
}

export default CheckoutSideMenu