import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext()

//we initialize the variables with localStore
// eslint-disable-next-line react-refresh/only-export-components
export const initializeLocalStore = () => {
    const accountInLocalStorage = localStorage.getItem('account')
    const signOutInLocalStore = localStorage.getItem('sign-out')
    let parsedAccount
    let parsedSignOut

    if (!accountInLocalStorage) {
        localStorage.setItem('account', JSON.stringify({}))
        parsedAccount = {}
    } else {
        // eslint-disable-next-line no-unused-vars
        parsedAccount = JSON.parse(accountInLocalStorage)
    }
    if (!signOutInLocalStore) {
        localStorage.setItem('sign-out', JSON.stringify(false))
        parsedSignOut= false
    } else {
        // eslint-disable-next-line no-unused-vars
        parsedSignOut  =JSON.parse(signOutInLocalStore);
    }

}
// eslint-disable-next-line react/prop-types
export const ShoppingCartProvider = ({children}) =>  {
    //Shopping Cart - increment quantity
    const [count, setCount] = useState(0)
    //product detail - open -close
    const [isProductsDetailOpen , setIsProductsDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductsDetailOpen(true)
    const closeProductDetail = () => setIsProductsDetailOpen(false)
    //product detail -show product
    const [productToShow , setProductToShow] = useState({})//information get object
    //add Products to cart
    const[productsInCart, setProductsInCart] = useState([])
    //checkout-side-menu
    const [isCheckoutSideMenuOpen , setIsCheckoutSideMenuOpen ] = useState(false)
    const openIsCheckoutSideMenu = () => setIsCheckoutSideMenuOpen (true)
    const closeIsCheckoutSideMenu = () => setIsCheckoutSideMenuOpen (false)

    //Shopping Cart - my Order
    const [myOrder, setMyOrder] = useState([])//to need several value

    //get products
    const [items, setItems] = useState(null)
    
    //get products by title and category
    const [searchByTitle, setSearchByTitle] = useState(null)
    const [searchByCategory, setSearchByCategory] = useState(null)    

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')        
        .then(res => res.json())
        .then(data =>  setItems(data))
    }, [])  

    //filtered of products
    const [filteredItems, setFilteredItems] = useState(null)    
    //function for filtered
    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    //filtered of category
    const [filteredByCategory, setFilteredByCategory] = useState(null)
    //function for filtered
    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
    }
    //we use useEffect to save filtering information
    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
            return filteredItemsByTitle(items, searchByTitle)
        }
        if (searchType === 'BY_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory)
        }
        if (searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
        if (!searchType) {
            return items
        }
    }
    
    useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, searchByTitle, searchByCategory])

    //my account
    const [account, setAccount ] = useState({})
    //sign out
    const [signOut, setSignOut ] = useState(false)


return(
    <ShoppingCartContext.Provider value={{
        count,
        setCount,
        items,
        setItems,
        isProductsDetailOpen,
        setIsProductsDetailOpen,
        openProductDetail,
        closeProductDetail,
        productToShow,
        setProductToShow,
        productsInCart,
        setProductsInCart,
        isCheckoutSideMenuOpen,
        setIsCheckoutSideMenuOpen,
        openIsCheckoutSideMenu,
        closeIsCheckoutSideMenu,
        myOrder,
        setMyOrder,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        setFilteredItems,
        filteredItemsByTitle,
        searchByCategory,
        setSearchByCategory,
        filteredByCategory,
        setFilteredByCategory,
        filteredItemsByCategory,
        account,
        setAccount,
        signOut,
        setSignOut
    }}>
        {children}
    </ShoppingCartContext.Provider>
    )
}
