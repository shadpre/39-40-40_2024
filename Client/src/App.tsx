
import './App.css'
import Footer from './modules/Footer'
import Header from './modules/Header'
import Main from './modules/Main'
import NavBar from "./modules/Navbar.tsx";
function App() : JSX.Element {
  return (
      <>
    <Header>
      <NavBar/>
    </Header>
    <Main />
    <Footer />
    </>
  )
}

export default App
