import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { SearchProvider } from "./SearchContext";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Stock from "./pages/Stock";
import Cards from "./pages/Cards";
import AddProductForm from "./components/Forms/AddProductForm";
import Statistiques from "./pages/Statistiques";
import Acceuil from "./pages/Acceuil";
import Achats from "./pages/Achats";
import Guide from "./pages/Guide";
import AddSellForm from "./components/Forms/AddSellForm";
import Profile from "./pages/Profile";
import AddWorkerForm from "./components/Forms/AddWorkerForm";
import PersonalInformationForm from "./components/Forms/PersonalInformationForm";
import ForgottenPassword from "./pages/ForgottenPassword";
import Settings from "./pages/Settings";
import PasswordChangeForm from "./components/Forms/PasswordChangeForm";
import Historique from "./pages/Historique";
import Home from "./pages/Home";

function Router() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/SignIn" element={<SignIn />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route
            exact="true"
            path="/ForgottenPassword"
            element={<ForgottenPassword />}
          />
          <Route path="/" element={<Home />} />

          {isAuthenticated && (
            <Route>
              <Route exact="true" path="/Cards" element={<Cards />} />
              <Route exact="true" path="/Acceuil" element={<Acceuil />} />
              <Route exact="true" path="/Stock" element={<Stock />} />
              <Route exact="true" path="/Historique" element={<Historique />} />
              <Route
                exact="true"
                path="/AddProductForm"
                element={<AddProductForm />}
              />
              <Route
                exact="true"
                path="/AddSellForm"
                element={<AddSellForm />}
              />
              <Route
                exact="true"
                path="/Statistiques"
                element={<Statistiques />}
              />
              <Route exact="true" path="/Transactions" element={<Achats />} />
              <Route exact="true" path="/Guide" element={<Guide />} />
              <Route exact="true" path="/Profile" element={<Profile />} />
              <Route exact="true" path="/Settings" element={<Settings />} />
              <Route
                exact="true"
                path="/AddWorkerForm"
                element={<AddWorkerForm />}
              />
              <Route
                exact="true"
                path="/PersonalInformationForm"
                element={<PersonalInformationForm />}
              />
              <Route
                exact
                path="/PasswordChangeForm"
                element={<PasswordChangeForm />}
              />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default Router;
