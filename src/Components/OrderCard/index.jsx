import { XMarkIcon } from '@heroicons/react/24/solid'

const OrderCard = props => {
    // eslint-disable-next-line react/prop-types
    const {id, title, imageUrl, price, handleDelete} = props
    let renderXMarkIcon

    if (handleDelete) {
        renderXMarkIcon= <XMarkIcon onClick={() => handleDelete(id)} className='w-4 h-4 border border-black text-black cursor-pointer'></XMarkIcon>
    }    
    return (
        <div className='flex justify-between items-center mb-3'>
            <div className='flex items-center gap-2'>
                <figure className='w-14 h-14'>
                    <img className='w-full h-full object-contain' src={imageUrl} alt={title}/>
                </figure>
                <p className='text-sm font-light'>{title}</p>
            </div>
            <div className='flex items-center gap-2'>
                <p className='text-sm font-medium'>{price}</p>
                {renderXMarkIcon}
            </div>
        </div>
        )}
export default OrderCard