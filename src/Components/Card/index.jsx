import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'

const Card = (data) => {
    const context = useContext(ShoppingCartContext)

    const showProduct = (productDetail) => {
        context.openProductDetail()
        context.setProductToShow(productDetail)
    }
    const addProductsToCart = (event, productData) => {
        event.stopPropagation()
        context.setCount(context.count + 1 )
        context.closeProductDetail()
        context.setProductsInCart([...context.productsInCart, productData])
        context.openIsCheckoutSideMenu()
    }

    const renderIcon = (id) => {
        const isInCart = context.productsInCart.filter(product => product.id === id).length > 0
        
        if (isInCart) {
            return (
                <button 
                    className='absolute top-0 right-0 flex justify-center items bg-white'>
                    <CheckIcon className='w-6 h-6 text-white bg-black/50'></CheckIcon>
                </button>
            )
        }   else {
            return(
                <button 
                    className='absolute top-0 right-0 flex justify-center items bg-white'
                    onClick={(event) => addProductsToCart(event, data.data)}>
                    <PlusIcon className='w-6 h-6 border border-black/60 text-gray-400'></PlusIcon>
                </button>
            )
        }
    }
    return (
        <div 
            className='mt-4'>
            <section className='w-62 border border-gray-300'>
                <figure className='relative w-full cursor-pointer'>
                    <img
                    className='w-full h-72 p-4 object-contain'
                    onClick={() => showProduct(data.data)}
                    src={data.data.image} alt={data.data.title} />
                    {renderIcon(data.data.id)}
                </figure>
            </section>
            <section>
                <p className='flex flex-col text-xs'>
                    <span className='font-semibold capitalize'>{data.data.category}</span>
                    <span className='font-light truncate'>{data.data.title}</span>
                    <span className='font-bold'>${data.data.price}</span>
                </p>
            </section>
        </div>
    )
}

export default Card