import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./modules/Footer";
import Header from "./modules/Header";
import Main from "./modules/Main";
import NavBar from "./modules/Navbar.tsx";
import CreateCustomerForm from "./modules/user/CreateCustomerForm.tsx";
import LandingPage from "./modules/user/LandingPage.tsx";
import CreateNewProductForm from "./modules/admin/CreateNewProductForm.tsx";

function App(): JSX.Element {
  return (
    <Router>
      <Header>
        <NavBar />
      </Header>
      <Main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-customer" element={<CreateCustomerForm />} />
          <Route path="/create-product" element={<CreateNewProductForm />} />
          {/* Add more routes as needed */}
        </Routes>
      </Main>
      <Footer />
    </Router>
  );
}

export default App;
