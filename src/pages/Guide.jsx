import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Right, Container, Header } from "./Stock";
import Topbar from "../components/Topbar/Topbar";
import GuideC from "../components/GuideC";
function Guide() {
  return (
    <>
      <Container>
        <Sidebar defaultPage="Guide" />
        <Right>
          <Header>
            <Topbar title="Guide" />
          </Header>
          <GuideC />
        </Right>
      </Container>
    </>
  );
}

export default Guide;
