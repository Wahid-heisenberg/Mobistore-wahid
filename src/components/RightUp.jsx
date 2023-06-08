import React from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import styled from "styled-components";
import { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import {mobile} from '../responsive'

export const Container = styled.form`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  background-color: #0c2e5a;
  padding: 10%;
  ${mobile({ width :'100%',overflowY:'scroll',padding:'5%'})}
`;
export const Input = styled.input`
  width: 100%;
  border: none;
  height: 80px;
  background-color: transparent;
  color: white;
  font-family: "Changa";
  font-style: normal;
  font-size: 36px;
  &:focus {
    outline: none;
  }
  ${mobile({ height:'40px',fontSize:'24px'})}
  &::placeholder {
    font-family: "Changa";
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    color: #ffffff;
    opacity: 0.6;
    ${mobile({ fontSize:'24px'})}
  }
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 48px;
  line-height: 103px;
  color: #f5f5f5;
  margin-bottom: 36px;
  display: flex;
  align-items: center;
  gap: 4px;
  ${mobile({ fontSize:'26px',marginBottom:'24px'})}
`;
export const TextFieldContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-right: 16px;
`;
export const InputContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 36px;
  border-bottom: 5px solid #ffffff;
  padding: 1px;
  opacity: 0.75;
   min-width: 100%;
   
  
  &:hover,
  &:focus {
    border-bottom: 5px solid white;
    opacity: 1;
    ${mobile({borderBottom:'3px solid white'})}
  }
  &:hover ${Input}::placeholder, &:focus ${Input}::placeholder {
    color: white;
    opacity: 0.6;
  }
  ${mobile({ marginBottom:'24px',borderBottom:'3px solid white'})}
`;
export const Btn = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
padding: 8px 24px;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  color: #0c2e5a;
  border-radius: 6px;
  border: none;
  margin-top: 36px;
  margin-bottom: 17px;
  border: 3px solid #0c2e5a;
  cursor: pointer;
  &:hover {
    transform: scale(1.03);
    color: #219dfd;
    transition: 0.3s ease-out;
    border: 3px solid #219dfd;
  }
  ${mobile({fontSize:'24px',padding: '4px 24px'})}
`;
export const Qst = styled.span`
  text-decoration: none;
  font-weight: 600;
  font-size: 29px;
  line-height: 53px;
  color: #ffffff;
  opacity: 0.8;
  &:hover {
    transform: scale(1.005);
    font-weight: 700;
    transition: 0.3s ease-out;
    text-decoration: underline;
  }
  ${mobile({fontSize:'18px'})}
`;

export const Hr = styled.hr`
  width: 90%;
  height: 1px;
  color: white;
  margin: 18px;
`;

function RightUp() {
  const [username, setUserName] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Create an object to represent the form data
    const formData = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };
  
    // Make HTTP request to backend API to insert form data into database
    axios
      .post("http://localhost:5000/api/user/signup", formData)
      .then((response) => {
        // Handle successful response from backend
        console.log("Successfully registered:", response.data);
  
        // Store the JWT token received in the response
        const token = response.data.token;
  
        // Save the token in local storage for future use
        localStorage.setItem("token", token);
  
        // Update UI with success message
        alert("Vous avez cree un compte avec success");
  
        // Redirect to the desired page or update the UI accordingly
        navigate("/Acceuil");
      })
      .catch((error) => {
        // Handle error response from backend
        console.error("Error registering:", error);
  
        // Update UI with error message
        alert("Erreur de connexion. Veuillez réessayer.");
      });
  };
  return (
    <>
      <Container onSubmit={handleSubmit}>
        <Title>Créer un compte</Title>
        <InputContainer className="Input">
          <TextFieldContainer>
            <AccountCircleOutlinedIcon
              className="Icon"
              sx={{ color: "white", mr: 1, fontSize: "30px" }}
            />
            <Input
              type="text"
              onChange={(event) => setUserName(event.target.value)}
              value={username}
              placeholder="Nom d’utilisateur"
              required
            />
          </TextFieldContainer>
        </InputContainer>

        <InputContainer className="Input">
          <TextFieldContainer>
            <LockIcon
              className="Icon"
              sx={{ color: "white", mr: 1, fontSize: "30px"}}
            />

            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
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

        <InputContainer className="Input">
          <TextFieldContainer>
            <CheckCircleOutlinedIcon
              className="Icon"
              sx={{ color: "white", mr: 1, fontSize: "30px" }}
            />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              name=""
              id=""
              placeholder="Confirmer le mot de passe"
              required
            />
          </TextFieldContainer>
          {!showConfirmPassword && (
            <VisibilityOffIcon
              className="Icon"
              sx={{ color: "white", mr: 1, my: 0.5 }}
              onClick={handleShowConfirmPassword}
            />
          )}
          {showConfirmPassword && (
            <RemoveRedEyeIcon
              className="Icon"
              sx={{ color: "white", mr: 1, my: 0.5 }}
              onClick={handleShowConfirmPassword}
            />
          )}
        </InputContainer>

        <Btn value="Crée un compte" type="submit" />
        <Hr />
        <Qst>
          {" "}
          Vous avez déja un compte ?
          <Link exact='true' to="/SignIn" style={{ textDecoration: "none" }}>
            <span
              style={{ color: "#21d8fd", cursor: "pointer", marginLeft: "6px" }}
            >
              Se connecter ici
            </span>
          </Link>
        </Qst>
      </Container>
    </>
  );
}

export default RightUp;
