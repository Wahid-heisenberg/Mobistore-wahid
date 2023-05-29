import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Header, Right, Container } from "./Stock";
import Topbar from "../components/Topbar/Topbar";
import { BreakLine } from "../components/Forms/AddProductForm";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
export const Title = styled.h1`
  font-weight: 500;
  font-size: 42px;
  color: #0c2e5a;
  align-self: baseline;
  margin-bottom: 16px;
`;
export const Desc = styled.h2`
  font-weight: 500;
  font-size: 32px;
  color: rgba(0, 0, 0, 0.7);
  align-self: baseline;
  margin-bottom: 24px;
`;
const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: baseline;
  padding: 0px 36px 16px 96px;
  gap: 22px;
`;
const SettingsItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #0c2e5a;
  font-size: 36px;
  font-weight: 500;
  gap: 8px;
  &:hover {
    text-decoration: underline;
  }
`;

function Settings() {
  return (
    <>
      <Container>
        <Sidebar defaultPage="Settings" />
        <Right>
          <Header>
            <Topbar title="Paramétres" />
          </Header>
          <BreakLine style={{ marginTop: "0px" }} />
          <Title>Mon Compte</Title>
          <Desc>
            Mettre à jour vos informations pour assurer la sécurité de votre
            compte
          </Desc>
          <SettingsContainer>
            <Link
              exact="true"
              to="/PersonalInformationForm"
              style={{ textDecoration: "none" }}
            >
              <SettingsItem>
                <AccountCircleOutlinedIcon style={{ fontSize: "44px" }} />{" "}
                <p> modifier les information de proprétaire</p>
              </SettingsItem>
            </Link>
            <Link
              exact="true"
              to="/PasswordChangeForm"
              style={{ textDecoration: "none" }}
            >
              <SettingsItem>
                <LockOutlinedIcon style={{ fontSize: "44px" }} />{" "}
                <p> Mot de passe et sécurité</p>
              </SettingsItem>
            </Link>
          </SettingsContainer>

          <BreakLine />

          <Title> Mes Informations</Title>
          <Desc>Accéder à vos informations</Desc>
          <SettingsContainer>
            <Link
              exact="true"
              to="/Historique"
              style={{ textDecoration: "none" }}
            >
              <SettingsItem>
                <HistoryOutlinedIcon style={{ fontSize: "44px" }} />{" "}
                <p> Historique</p>
              </SettingsItem>
            </Link>
            <Link exact="true" style={{ textDecoration: "none" }} to="/Profile">
              <SettingsItem>
                <AccountCircleOutlinedIcon style={{ fontSize: "44px" }} />{" "}
                <p> Accéder a vos Informations </p>
              </SettingsItem>
            </Link>
            <Link exact to="/Guide" style={{ textDecoration: "none" }}>
              <SettingsItem>
                <ArticleOutlinedIcon style={{ fontSize: "44px" }} />{" "}
                <p> Comment gérer votre application</p>
              </SettingsItem>
            </Link>
          </SettingsContainer>
          <BreakLine />
        </Right>
      </Container>
    </>
  );
}

export default Settings;
