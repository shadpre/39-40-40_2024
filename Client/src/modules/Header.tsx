export default function Header({ children } : { children? : React.ReactNode} ) : JSX.Element {
    return(
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto p-4">
            {children}
        </div>
      </header>
    )}