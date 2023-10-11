import { useContext, useRef, useState } from 'react'
import { ShoppingCartContext } from '../../Context'
import {Link, Navigate } from 'react-router-dom'
import Layout from '../../Components/Layout'

function SignIn() {
    const context = useContext(ShoppingCartContext)
    const [view, setView] = useState('user-info')
    const form = useRef(null)
    //Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    //Has an account
    const noAccountLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountLocalState = context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountLocalStorage || !noAccountLocalState
    
    const handleSignIn = () => {
        const stringifiedSignOut = JSON.stringify(false)
        localStorage.setItem('sign-out', stringifiedSignOut)
        context.setSignOut(false)
        return <Navigate replace to={'/'} />
    }
    const createAnAccount = () => {
        const formData = new FormData(form.current)
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        }
        const stringifiedAccount = JSON.stringify(data)
        localStorage.setItem('account', stringifiedAccount)
        context.setAccount(data)
        handleSignIn()
    }
    {/*if (localStorage.getItem('account')) {
        localStorage.removeItem('account')
    }
    window.addEventListener('beforeunload', function () {
        if (localStorage.getItem('account')) {
            localStorage.removeItem('account')
        }
    })*/}
    const renderLogIn = () => {
        return (
            <div className='flex flex-col w-96'>
                <p>
                    <span className='font-light text-sm'>Email: </span>
                    <span>{parsedAccount?.email}</span>
                </p>
                <p>
                    <span className='font-light text-sm'>Password: </span>
                    <span>{parsedAccount?.password}</span>
                </p>
                <Link to='/'>
                    <button
                        className='bg-black disabled:bg-black/40 text-white w-full py-3 mt-4 mb-2'
                        onClick={() => handleSignIn()}
                        disabled={!hasUserAnAccount}>
                            Log in
                    </button>
                </Link>
                    <div className='text-center'>
                        <a className='font-light text-xs underline underline-offset-4' href='/'>Forgot my password</a>
                    </div>
                    <button
                        className='border border-black disabled:text-black/40 disabled:border-black/40 mt-6 py-3'
                        onClick={() => setView('create-user-info')}
                        disabled={hasUserAnAccount}>
                            Sign up
                    </button>
            </div>
        )
    }
    const renderCreateUserInfo = () => {
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
                <Link to='/'>
                    <button className='w-full py-3 text-white bg-black'
                    onClick={() => createAnAccount()}>
                        Create Account
                    </button>
                </Link>
            </form>
        )
    }
    const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn()
    
    return (
        <Layout>
            <h1 className='font-medium text-xl text-center mt-6 mb-6 w-96'>Welcome</h1> 
                {renderView()}
        </Layout>
    )
}

export default SignIn