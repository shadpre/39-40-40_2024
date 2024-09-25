import "./App.css";
import Footer from "./modules/Footer";
import Header from "./modules/Header";
import Main from "./modules/Main";
import NavBar from "./modules/Navbar.tsx";
import CreateCustomerForm from "./modules/user/CreateCustomerForm.tsx";

function App(): JSX.Element {
  return (
    <>
      <Header>
        <NavBar />
      </Header>
      <Main>
        <CreateCustomerForm></CreateCustomerForm>
      </Main>
      <Footer />
    </>
  );
}

export default App;
