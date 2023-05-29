import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../logo.png";
const BoxesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 32px;
  padding: 8px 32px 32px 32px;
`;
const Box = styled.div`
  border-radius: 8px;
  display: flex;
  flex: 1;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  max-height: 80%;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding: 36px 48px;
  &:hover {
    box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.25);
  }
`;
const Boxx = styled.div`
  border-radius: 8px;
  display: flex;
  flex: 1;
  gap: 16px;
  flex-direction: row;
  align-items: center;
  max-height: 80%;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding: 36px 48px;
  &:hover {
    box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.25);
  }
`;
const FormLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 24px;
  background-color: #27a033;
  color: #ffffff;
  &:hover {
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.25));
  }
`;

const BoxTitle = styled.h3`
  font-weight: 800;
  font-size: 32px;
  color: #007fc9;
`;
const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0px;
  max-height: 56px;
  justify-content: center;
`;

const Img = styled.img`
  height: 96px;
  aspect-ratio: 1/1;
`;

function AccTop() {
  return (
    <>
      <BoxesContainer>
        <Boxx>
          <BoxTitle>Bienvenue chez MobiStore</BoxTitle>
          <ImgContainer>
            <Img src={Logo} alt="Logo" />
          </ImgContainer>
        </Boxx>
        <Box>
          <BoxTitle>Nouvelle Ajout</BoxTitle>
          <Link
            exact="true"
            to="/AddSellForm"
            style={{ textDecoration: "none" }}
          >
            <FormLink>Ajouter une Transaction</FormLink>
          </Link>
        </Box>
      </BoxesContainer>
    </>
  );
}

export default AccTop;
