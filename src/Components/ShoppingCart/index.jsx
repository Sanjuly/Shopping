import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'

const ShoppingCart = () => {
    const context = useContext(ShoppingCartContext)

    const openCheckoutSideMenu = () => {
        context.closeProductDetail()
    }
    return (
        <div className='flex items-center justify-end relative'
        onClick={() => openCheckoutSideMenu()}>
            <ShoppingBagIcon className='w-6 h-6 fill-none stroke-black cursor-pointer'></ShoppingBagIcon>
            <div className='flex justify-center items-center w-4 h-4  text-sx text-white absolute bottom-3.5 left-3.5 rounded-full bg-black'>
                {context.productsInCart.length}
            </div>
        </div>
    )
}
export default ShoppingCart 