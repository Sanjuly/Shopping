import { useContext, useRef, useState } from 'react'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'

function MyAccount() {
    const context = useContext(ShoppingCartContext)
    const [view, setView] = useState('user-info')
    const form = useRef(null)
    //Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    
    const editAccount = () => {
        const formData = new FormData(form.current)
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        }
        //update account
        const stringifiedAccount = JSON.stringify(data)
        localStorage.setItem('account', stringifiedAccount)
        context.setAccount(data)
    }

    const renderUserInfo = () => {
        return (
            <div className='flex flex-col w-96'>
                <p>
                    <span className='font-light text-sm'>Name: </span>
                    <span>{parsedAccount?.name}</span>
                </p>
                <p>
                    <span className='font-light text-sm'>Email: </span>
                    <span>{parsedAccount?.email}</span>
                </p>
                <button
                    className='bg-black disabled:bg-black/40 text-white w-full py-3 mt-4 mb-2'
                    onClick={() => setView('edit-user-info')}>
                        Edit
                </button>
            </div>
        )
    }
    const renderEditUserInfo = () => {
        return (
            <form ref={form} className='flex flex-col w-96 gap-4'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='name' className='font-light text-sm'>Your name:</label>
                    <input 
                        type='text'
                        id='name'
                        name='name'
                        defaultValue={parsedAccount?.name}
                        placeholder='Peter'
                        className='border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='email' className='font-light text-sm'>Your email:</label>
                    <input 
                        type='text'
                        id='email'
                        name='email'
                        defaultValue={parsedAccount?.email}
                        placeholder='peter123@gmail.com'
                        className='border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='password' className='font-light text-sm'>Password:</label>
                    <input 
                        type='text'
                        id='password'
                        name='password'
                        defaultValue={parsedAccount?.password}
                        placeholder='*******'
                        className='border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4' />
                </div>
                    <button className='w-full py-3 text-white bg-black'
                    onClick={() => {setView('user-info'), editAccount()}}>
                        Edit
                    </button>
            </form>
        )
    }
    const renderView = () => view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()
    
    return (
        <Layout>
            <h1 className='font-medium text-xl text-center mt-6 mb-6 w-96'>My Account</h1> 
                {renderView()}
        </Layout>
    )
}

export default MyAccount