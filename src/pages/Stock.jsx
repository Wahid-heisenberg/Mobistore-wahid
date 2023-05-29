import React from "react";
import styled from "styled-components";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import Showcase from "../components/Showcase/Showcase";
import Card from "../components/Card";
import axios from "axios";
import { useState } from "react";
import ProductsTable from "../components/ProductsTable";
import hplogo from "../assets/HP.png";
import huawwei from "../assets/huawwei-logo.png";
import apple from "../assets/APPLE.png";
import lenovo from "../assets/Lenovo-Logo.png";
import samsung from "../assets/samsung.png";
import sony from "../assets/Sony-Logo.png";
import Redmi from "../assets/Redmi-logo.png";
import Condor from "../assets/condor-logo.png";
import Tous from "../assets/Tous.png";
import { useEffect } from "react";
export const Container = styled.section`
  display: flex;
  flex-direction: row;
  max-height: 100vh;
  min-height: 100vh;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 11 */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;
export const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0px 34px 8px 34px;
  width: 100%;
  max-height: 100vh;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 11 */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 1;
`;
export const Header = styled.header`
  position: sticky;
  top: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  z-index: 5;
`;

const ShowCaseContainer = styled.div`
  width: 100%;
`;
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 3%;
  grid-column-gap: 5%;
  width: 100%;
  padding: 16px 12px;
  margin-bottom: 32px;
  background-color: white;
  padding-top: 32px;
`;

const ReturnButton = styled.button`
  width: 20%;
  height: 48px;
  border: 2px solid #007fc9;
  color: #007fc9;
  font-size: 32px;
  background-color: white;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: baseline;
  margin-left: 2%;
  font-weight: 400;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #007fc9;
    color: white;
    transition: 0.3s all ease-in-out;
  }
`;
/*const Products = [
  {
      id:1,
      Nom: "asus",
      Nserie1 : 1444,
      Nserie2 : 45477,
      Pachat : 1548 ,
      Pvente : 84878,
      },
{
  id:2,
  Nom: "Hp",
  Nserie1 : 1444,
  Nserie2 : 45477,
  Pachat : 1548 ,
  Pvente : 84878,
      },
{
id:3,    Nom: "Hp", Nserie1 : 1444,
Nserie2 : 45477,
Pachat : 1548 ,
Pvente : 84878,
},
{
id:4,
Nom: "Hp",
Nserie1 : 1444,
Nserie2 : 45477,
Pachat : 1548 ,
Pvente : 84878,
}

]
*/
const CardsArray = [
  {
    id: "0",
    number: "120",
    image: Tous,
    marque: "Tous",
    category: ["Pc", "Telephone", "Earpud"],
  },
  {
    id: "2",
    number: "25",
    image: apple,
    marque: "Apple",
    category: ["Pc", "Telephone", "Earpud"],
  },
  {
    id: "8",
    number: "15",
    image: Redmi,
    marque: "Redmi",
    category: ["Pc", "Telephone", "Earpud"],
  },
  {
    id: "5",
    number: "10",
    image: huawwei,
    marque: "huawwei",
    category: ["Pc", "Telephone", "Earpud"],
  },
  {
    id: "1",
    number: "20",
    image: hplogo,
    marque: "Hp",
    category: ["Pc"],
  },

  {
    id: "3",
    number: "15",
    image: samsung,
    marque: "Samsung",
    category: ["Pc", "Telephone", "Earpud"],
  },

  {
    id: "4",
    number: "5",
    image: Condor,
    marque: "Condor",
    category: ["Telephone"],
  },

  {
    id: "6",
    number: "3",
    image: lenovo,
    marque: "Lenovo",
    category: ["Pc", "Telephone", "Earpud"],
  },
  {
    id: "33",
    number: "69",
    image: sony,
    marque: "Sony",
    category: ["Pc", "Telephone", "Earpud"],
  },
];

function Stock() {
  const [activeCard, setActiveCard] = useState("");
  const [AllProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stock/afficherStock");
        console.log(res);
        setAllProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllProducts();
  }, [activeCard]);

  console.log(AllProducts);

  const handleClick = (item) => {
    setActiveCard(item.marque);
    console.log(item.marque);
    // rest of the code for handling the click event
  };

  const show = activeCard ? "" : "false";
  console.log(activeCard);

  return (
    <>
      <Container>
        <Sidebar defaultPage="Stock" />
        <Right>
          <Header>
            <Topbar title="Stock" />
            <ShowCaseContainer>
              <Showcase
                showbuttons={show}
                form="/AddProductForm"
                buttonTitle="Ajouter un Produit"
              />
            </ShowCaseContainer>
          </Header>

          {activeCard === "" && (
            <CardsContainer>
              {CardsArray.map((card) => (
                <Card
                  key={card.id * 3.14}
                  image={card.image}
                  number={AllProducts.length}
                  marque={card.marque}
                  category={card.category}
                  onClick={() => handleClick(card)}
                />
              ))}
            </CardsContainer>
          )}

          {activeCard !== "" && (
            <>
              <ProductsTable products={AllProducts} />
              <ReturnButton onClick={() => setActiveCard("")}>
                {" "}
                Retour
              </ReturnButton>
            </>
          )}
        </Right>
      </Container>
    </>
  );
}

export default Stock;
