import React from "react";
import Topbar from "../components/Topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import { Right } from "./Stock";
import { Container } from "./Stock";
import Graph from "../components/Graph";
import styled from "styled-components";
import AccTop from "../components/AccTop";
// import {mobile} from '../responsive'
const GraphContainer = styled.div`
  width: 72%;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: contain;
  flex-direction: column;
  position: relative;
  padding: 0px;
  /* overflow-x: scroll; */
`;
const GraphYaxisTitle = styled.h3`
  font-weight: 300;
  font-size: 20px;
  color: #0c2e5a;
  position: absolute;
  left: -48px;
  top: -24px;
`;
const GraphXaxisTitle = styled.h3`
  font-weight: 300;
  font-size: 20px;
  color: #0c2e5a;
  position: absolute;
  right: -136px;
  bottom: 24px;
`;
const Acceuil = () => {
  return (
    <>
      <Container>
        <Sidebar />
        <Right>
          <Topbar title="Acceuil" />
          <AccTop />
          <GraphContainer>
            <GraphYaxisTitle>Profit</GraphYaxisTitle>
            <Graph />
            <GraphXaxisTitle>mois</GraphXaxisTitle>
          </GraphContainer>
        </Right>
      </Container>
    </>
  );
};

export default Acceuil;
