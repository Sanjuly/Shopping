import { ChevronRightIcon } from "@heroicons/react/24/solid"

const OrdersCards = props => {
 // eslint-disable-next-line react/prop-types
    const { totalPrice, totalProducts } = props

    return (
        <div className='flex justify-between items-center mb-3 border border-black p-4 w-96 bg-white'>
            <div className='flex justify-between w-full'>
                <p className='flex flex-col'>
                    <span className='text-sm font-light'>📅 22.08.2023</span>
                    <span className='text-sm font-bold'>🛒 {totalProducts} articles</span>
                </p>
                <p className='flex items-center'>
                    <span className='text-2x1 font-medium'>${totalPrice}</span>
                    <button className='p-1 ml-8 mr-2 text-xs font-light border border-black bg-blue-100' type="submit">Proceed to payment</button>
                    <ChevronRightIcon className='w-4 h-4 border border-black text-black cursor-pointer'></ChevronRightIcon>
                </p>
            </div>
        </div>
    )
}
export default OrdersCards