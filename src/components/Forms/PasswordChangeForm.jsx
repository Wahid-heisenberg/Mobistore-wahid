import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import styled from "styled-components";
import { Right, Header, Container } from "../../pages/Stock";
import { FormControlers, Submit, Exit, BreakLine } from "./AddProductForm";
import { Title, Desc } from "../../pages/Settings";
import { Link } from "react-router-dom";
import KeyIcon from "@mui/icons-material/Key";
import LockIcon from "@mui/icons-material/Lock";
const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  width: 100%;
  padding: 16px 16%;
  margin-bottom: 4px;
`;
const InputContainer = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  border: 2px solid #007fc9;
  color: #0c2e5a;
  border-radius: 6px;
  height: 72px;
  width: 100%;
  font-size: 36px;
  padding: 8px 20px;
  gap: 10px;
  &:hover {
    box-shadow: inset 0px 0px 0px 1.5px #208fd0;
    transition: 0.4s ease-out;
  }
`;
const Input = styled.input`
  width: 100%;
  font-size: 36px;
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 36px;
    opacity: 0.7;
  }
`;
const Question = styled.p`
  text-decoration: none;
  font-weight: 700;
  font-size: 32px;
  color: #007fc9;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <Container>
        <Sidebar defaultPage="Settings" />
        <Right>
          <Header>
            <Topbar title="Paramétres" state="desabled" />
          </Header>
          <BreakLine style={{ marginTop: "0px" }} />

          <Title>Compte</Title>
          <Desc style={{ marginBottom: "12px" }}>Mot de passe et securité</Desc>
          <PasswordForm>
            <InputContainer>
              <LockIcon style={{ fontSize: "42px" }} />
              <Input
                type="password"
                placeholder="Mot de passe actuel"
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
                required
              />
            </InputContainer>
            <InputContainer>
              <KeyIcon style={{ fontSize: "42px" }} />
              <Input
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                placeholder="Nouveau mot de passe"
                required
              />
            </InputContainer>
            <InputContainer>
              <KeyIcon style={{ fontSize: "42px" }} />
              <Input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="Retapez le nouveau mot de passe "
                required
              />
            </InputContainer>
            <FormControlers style={{ justifyContent: "center", gap: "32px" }}>
              <Link
                exact="true"
                to="/Settings"
                style={{ textDecoration: "none" }}
              >
                <Exit> Annuler</Exit>
              </Link>
              <Submit
                style={{ width: "204px" }}
                type="submit"
                value="enregistré"
              />
            </FormControlers>
          </PasswordForm>
          <Link
            exact="true"
            to="/ForgottenPassword"
            style={{ textDecoration: "none" }}
          >
            <Question>Mot de passe oublie ?</Question>
          </Link>
        </Right>
      </Container>
    </>
  );
}

export default PasswordChangeForm;
