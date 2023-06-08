import React from "react";
import styled from "styled-components";
import logoImg from "../bglogo.png";
import {mobile} from '../responsive'
const Container = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-height: 100%;
  overflow: hidden;
  ${mobile({ display:'none'})}
`;
const Logo = styled.img`
  width: 478.49px;
  height: 646.65px;
  margin-bottom: 15px;
`;
const Title = styled.h1`
  font-family: "Changa";
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 74px;
  color: #0c2e5a;
`;
function Left() {
  return (
    <>
      <Container>
        <Title>Bienvenue chez MOBI STORE !</Title>
        <Logo src={logoImg} />
      </Container>
    </>
  );
}

export default Left;
