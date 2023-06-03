import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Right, Header, Container } from "./Stock";
import Topbar from "../components/Topbar/Topbar";
import Showcase from "../components/Showcase/Showcase";
import styled from "styled-components";
import SoldProductsTable from "../components/SoldProductsTable";
const ShowCaseContainer = styled.div`
  width: 100%;
`;
const ProductsTableContainer = styled.div`
  width: 100%;
`;

function Achats() {

  return (
    <>
      <Container>
        <Sidebar defaultPage="Transactions" />
        <Right>
          <Header>
            <Topbar title="Transactions" />
            <ShowCaseContainer>
              <Showcase
                form="/AddSellForm"
                buttonTitle="Ajouter une transaction"
              />
            </ShowCaseContainer>
          </Header>
          <ProductsTableContainer>
            <SoldProductsTable />
          </ProductsTableContainer>
        </Right>
      </Container>
    </>
  );
}

export default Achats;
