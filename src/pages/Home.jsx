import React from "react";
import styled from "styled-components";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import logoImg from "../bglogo.png";
import { Link } from "react-router-dom";
import {mobile} from '../responsive'
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("https://i.ibb.co/s9R0bSb/background.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 12px;
  ${mobile({overflowY:'hidden'})}
`;
const Title = styled.h1`
  font-weight: 600;
  font-size: 64px;
  color: #0c2e5a;
  ${mobile({fontSize:'42px',marginTop:'24px' })}
`;

const Logo = styled.img`
  height: 456px;
  aspect-ratio: 3/4;
  margin: 24px;
  ${mobile({margin:'8px' ,height :'55%'})}
`;
const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 116px;
  aspect-ratio: 1/1;
  border-radius: 100%;
  border: 2px solid #007fc9;
  z-index: 1;
  &:hover {
    border: none;
    background-color: #007fc9;
  }
  margin-bottom: 32px;
`;
function Home() {
  return (
    <Container>
      <Title>Bienvenue chez MOBI STORE !</Title>
      <Logo src={logoImg} />
      <Link exact="true" to="/SignIn">
        <Circle className="Circle" href="www.google.com">
          <ArrowForwardOutlinedIcon
            className="Arrow"
            style={{ fontSize: 66 }}
          />
        </Circle>
      </Link>
    </Container>
  );
}

export default Home;
