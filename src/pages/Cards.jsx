import React from "react";
import styled from "styled-components";
import { Right, Header, Container } from "./Stock";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import Showcase from "../components/Showcase/Showcase";
import Card from "../components/Card";

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 70px;
  grid-column-gap: 48px;
  background-color: #f9f6f6;
  width: 100%;
  padding: 16px 8px 16px 32px;
  margin-bottom: 36px;
`;

const CardsArray = [
  {
    id: "1",
    number: "88",
    image:
      "https://i.ibb.co/k0rskVn/5a3a2721ec4cc1-15350861151376054596794637.png",
  },
  {
    id: "2",
    number: "250",
    image:
      "https://i.ibb.co/k0rskVn/5a3a2721ec4cc1-15350861151376054596794637.png",
  },
  {
    id: "3",
    number: "15",
    image: "https://i.ibb.co/1m8tn0D/logo-removebg.png",
  },
  {
    id: "4",
    number: "10",
    image:
      "https://i.ibb.co/k0rskVn/5a3a2721ec4cc1-15350861151376054596794637.png",
  },
  {
    id: "5",
    number: "44",
    image: "https://i.ibb.co/1m8tn0D/logo-removebg.png",
  },
  {
    id: "6",
    number: "43",
    image: "https://i.ibb.co/1m8tn0D/logo-removebg.png",
  },
  {
    id: "7",
    number: "43",
    image: "https://i.ibb.co/1m8tn0D/logo-removebg.png",
  },
  {
    id: "8",
    number: "43",
    image: "https://i.ibb.co/1m8tn0D/logo-removebg.png",
  },
  {
    id: "9",
    number: "43",
    image: "https://i.ibb.co/1m8tn0D/logo-removebg.png",
  },
  {
    id: "10",
    number: "43",
    image: "https://i.ibb.co/1m8tn0D/logo-removebg.png",
  },
];
function Cards() {
  return (
    <>
      <Container>
        <Sidebar defaultPage="Stock" />

        <Right>
          <Header>
            <Topbar title="Stock" />
            <Showcase />
          </Header>
          <CardsContainer>
            {CardsArray.map((item) => (
              <Card
                key={item.id}
                number={item.number + " "}
                image={item.image}
              />
            ))}
          </CardsContainer>
        </Right>
      </Container>
    </>
  );
}

export default Cards;
