import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../../Components/OrderCard'
import Layout from "../../Components/Layout"
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

function MyOrder() {
    const context = useContext(ShoppingCartContext)
    const currentPath = window.location.pathname
    let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
    if (index === 'last') index = context.myOrder?.length - 1

    return (
        <Layout>
            <div className='flex justify-center items-center relative w-96 mb-5'>
                <Link to='/my-orders'>
                    <ChevronLeftIcon className='absolute left-6 bottom-1 w-4 h-4 border border-black text-black cursor-pointer'></ChevronLeftIcon>
                </Link>
                <h1 className='font-medium text-xl'>My Order</h1>
            </div>
            <div className='flex flex-col w-96 py-4 px-2 border border-black rounded-lg bg-white'> 
                {
                context.myOrder?.[index]?.products?.map(product => (
                    <OrderCard 
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        imageUrl={product.image}
                        price={product.price}
                        />
                    ))    
                }
            </div>
        </Layout>
    )
}
export default MyOrder