import "./App.css";
import Footer from "./modules/Footer";
import Header from "./modules/Header";
import Main from "./modules/Main";
import NavBar from "./modules/Navbar.tsx";
import CustomerList from "./modules/CustomerList";

function App(): JSX.Element {
  return (
    <>
      <Header>
        <NavBar />
      </Header>
      <Main>
        <CustomerList />
      </Main>
      <Footer />
    </>
  );
}

export default App;
