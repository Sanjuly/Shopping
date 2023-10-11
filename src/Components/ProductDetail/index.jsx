import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { XMarkIcon } from '@heroicons/react/24/solid'
import './styles.css'

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext)

    return (
        <aside className={`${context.isProductsDetailOpen ? 'flex' : 'hidden'} product-detail flex flex-col fixed bg-white border border-black/50`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-light text-xs'>{context.productToShow.title}</h2>
                <button>
                    <XMarkIcon
                    onClick={() => context.closeProductDetail()}
                    className='w-6 h-6 border border-black text-black cursor-pointer'></XMarkIcon>
                </button>
            </div>
                <figure className='w-full h-full'>
                    <img
                    className='w-80 h-72 ml-16 object-contain'
                    src={context.productToShow.image} alt={context.productToShow.title} />
                </figure>
                <p className='flex flex-col text-xs px-6 mb-6'>
                    <span className='font-light bg-white whitespace-nowrap overflow-hidden text-ellipsis hover:whitespace-normal'>{context.productToShow.description}</span>
                    <span className='font-bold bg-white'>${context.productToShow.price}</span>
                </p>
        </aside>
    )
}

export default ProductDetail