import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import app from "./app";
import Stock from "./pages/Stock";
import Cards from "./pages/Cards";
import AddProductForm from "./components/Forms/AddProductForm";
import Statistiques from "./pages/Statistiques";
import Acceuil from "./pages/Acceuil";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
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
  return (
    <BrowserRouter>
      <Routes>
        <Route exact="true" path="/" Component={app} />
        <Route exact="true" path="/Cards" Component={Cards} />
        <Route exact="true" path="/Home" Component={Home} />
        <Route exact="true" path="/Stock" Component={Stock} />
        <Route exact="true" path="/Historique" Component={Historique} />
        <Route exact="true" path="/AddProductForm" Component={AddProductForm} />
        <Route exact="true" path="/AddSellForm" Component={AddSellForm} />
        <Route exact="true" path="/Acceuil" Component={Acceuil} />
        <Route exact="true" path="/SignIn" Component={SignIn} />
        <Route exact="true" path="/SignUp" Component={SignUp} />
        <Route
          exact="true"
          path="/ForgottenPassword"
          Component={ForgottenPassword}
        />
        <Route exact="true" path="/Statistiques" Component={Statistiques} />
        <Route exact="true" path="/Transactions" Component={Achats} />
        <Route exact="true" path="/Guide" Component={Guide} />
        <Route exact="true" path="/Profile" Component={Profile} />
        <Route exact="true" path="/Settings" Component={Settings} />
        <Route exact="true" path="/AddWorkerForm" Component={AddWorkerForm} />
        <Route
          exact="true"
          path="/PersonalInformationForm"
          Component={PersonalInformationForm}
        />
        <Route
          exact="true"
          path="/PasswordChangeForm"
          Component={PasswordChangeForm}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
