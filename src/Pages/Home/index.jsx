import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import ProductDetail from '../../Components/ProductDetail'
import Layout from "../../Components/Layout"
import Card from "../../Components/Card"

function Home() {
    const context = useContext(ShoppingCartContext)
    //function for filtered
    const renderView = () => {
        if (context.filteredItems?.length > 0) {
            return (
                context.filteredItems?.map(item => (
                    <Card key={item.id} data={item} />
            )
        )
    )
} else {
        return (
            <>
                <div className='col-start-2'>
                    <h1 className='font-medium text-xl'>Not Found</h1>
                    <img 
                        src='/pexels-photo-3771127.jpeg' 
                        alt='not found'
                        className='w-80 h-96' />    
                </div>
            </>
        )
    }
}
    return (
        <Layout>
            <div className='flex justify-center items-center relative w-96 mb-2'>
                <h1 className='font-medium text-xl'>Exclusive Products</h1>    
            </div>
                <input 
                    type='text'
                    placeholder='Search products'
                    className='w-96 h-10 border border-gray-400 px-4 py-4 focus:outline-none'
                    onChange={(event) => context.setSearchByTitle(event.target.value)}/>
            <div className='grid grid-cols-4 gap-4 ml-60 mr-60'>
                {renderView()}
            </div>
                <ProductDetail />
        </Layout>           
    )
}
export default Home