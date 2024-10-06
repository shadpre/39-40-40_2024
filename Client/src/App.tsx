import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./modules/Footer";
import Header from "./modules/Header";
import Main from "./modules/Main";
import NavBar from "./modules/Navbar.tsx";
import CreateCustomerForm from "./modules/user/CreateCustomerForm.tsx";
import CreateNewProductForm from "./modules/admin/CreateNewProductForm.tsx";
import PaperOverview from "./modules/user/PaperOverview.tsx";

import NotFound from "./modules/errorPages/NotFound.tsx";
import Forbidden from "./modules/errorPages/Forbidden.tsx";
import ServerError from "./modules/errorPages/ServerError.tsx";
import NoContent from "./modules/errorPages/NoContent.tsx";
import SingleProductView from "./modules/views/SingleProductView.tsx";
import PropertyAdmin from "./modules/admin/PropertyAdmin.tsx";

export default function App(): JSX.Element {
  return (
    <Router>
      <Header>
        <NavBar />
      </Header>
      <Main>
        <Routes>
          <Route path="/" element={<PaperOverview />} />
          <Route path="/create-customer" element={<CreateCustomerForm />} />
          <Route path="/create-product" element={<CreateNewProductForm />} />
          <Route path="/paper/:PaperID" element={<SingleProductView />} />
          <Route path="/properties" element={<PropertyAdmin />} />
          <Route path="/204" element={<NoContent />} />
          <Route path="/403" element={<Forbidden />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/500" element={<ServerError />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
      <Footer />
    </Router>
  );
}
