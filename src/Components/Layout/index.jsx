// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {
    return (
        <div className="flex flex-col items-center mt-20 w-full max-h-full text-lg layout">
            {children}
        </div>
    )
}
export default Layout