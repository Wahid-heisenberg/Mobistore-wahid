import React from "react";
import { Link } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useState } from "react";

import {
  InputContainer,
  Container,
  Btn,
  Input,
  Title,
  Qst,
  Hr,
  TextFieldContainer,
} from "./RightUp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Right() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Create an object to represent the form data
    const formData = {
      username: username,
      password: password,
    };
  
    // Make HTTP request to backend API to authenticate user
    axios
      .post("http://localhost:5000/api/user/signin", formData)
      .then((response) => {
        // Handle successful response from backend
        console.log("Successfully logged in:", response.data);
        alert("Bienvenu");
  
        // Store the JWT token received in the response
        const token = response.data.token;
  
        // Save the token in local storage for future use
        localStorage.setItem("token", token);
  
        // Redirect to the desired page or update the UI accordingly
        navigate("/Acceuil");
        window.location.reload();
      })
      .catch((error) => {
        // Handle error response from backend
        console.log("Error logging in:", error);
        alert("Erreur de connexion. Veuillez réessayer.");
      });
  };
  

  return (
    <>
      <Container onSubmit={handleSubmit}>
        <Title>Connecter à votre compte</Title>
        <InputContainer className="Input">
          <TextFieldContainer>
            <AccountCircleOutlinedIcon
              className="Icon"
              sx={{ color: "white", mr: 1, fontSize: "30px" }}
            />
            <Input
              type="text"
              required
              value={username}
              name=""
              id="username"
              placeholder="Nom d’utilisateur"
              onChange={(event) => setUserName(event.target.value)}
            />
          </TextFieldContainer>
        </InputContainer>

        <InputContainer className="Input">
          <TextFieldContainer>
            <LockIcon
              className="Icon"
              sx={{ color: "white", mr: 1, fontSize: "30px" }}
            />

            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              name=""
              id="password"
              placeholder="Mot de passe"
              required
            />
          </TextFieldContainer>

          {!showPassword && (
            <VisibilityOffIcon
              className="Icon"
              sx={{ color: "white", mr: 1, my: 0.5 }}
              onClick={handleShowPassword}
            />
          )}
          {showPassword && (
            <RemoveRedEyeIcon
              className="Icon"
              sx={{ color: "white", mr: 1, my: 0.5 }}
              onClick={handleShowPassword}
            />
          )}
        </InputContainer>
        <Btn value="Connexion" type="submit" style={{marginBottom:'32px'}}/>
        <Link
          exact="true"
          to="/ForgottenPassword"
          style={{ textDecoration: "none" }}
        >
          <Qst > Mot de passe oublier?</Qst>
        </Link>

        <Hr />
        <Link exact="true" to="/SignUp" style={{ textDecoration: "none" }}>
          <Qst> Créer un compte </Qst>
        </Link>
      </Container>
    </>
  );
}

export default Right;
