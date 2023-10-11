import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout'
import OrdersCards   from '../../Components/OrdersCards'

function MyOrders() {
    const context = useContext(ShoppingCartContext)
    
    return (
        <Layout>
            <div className='flex justify-center items-center relative w-96 mb-5'>
                <h1 className='font-medium text-xl'>My Orders</h1>    
            </div>
            {
                context.myOrder.map((myOrder, index) => (
                <Link key={index} to={`/my-orders/${index}`}>
                    <OrdersCards
                        totalPrice={myOrder.totalPrice}
                        totalProducts={myOrder.totalProducts}
                    />
                </Link>
                ))
            }
        </Layout>
    )
}
export default MyOrders