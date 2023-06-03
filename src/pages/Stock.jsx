import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import Showcase from "../components/Showcase/Showcase";
import Card from "../components/Card";
import axios from "axios";
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
import oppo from "../assets/oppo.png";
import { SearchContext } from "../SearchContext";

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

const CardsArray = [
  {
    id: "0",
    image: Tous,
    marque: "Tous",
  },
  {
    id: "2",
    image: apple,
    marque: "apple",
  },
  {
    id: "8",
    image: Redmi,
    marque: "redmi",
  },
  {
    id: "5",
    image: huawwei,
    marque: "huawwei",
  },
  {
    id: "1",
    image: hplogo,
    marque: "hp",
    category: ["Pc"],
  },
  {
    id: "3",
    image: samsung,
    marque: "samsung",
  },
  {
    id: "4",
    image: Condor,
    marque: "condor",
    category: ["Telephone"],
  },
  {
    id: "6",
    image: lenovo,
    marque: "lenovo",
  },
  {
    id: "33",
    image: sony,
    marque: "sony",
  },
  {
    id: "378",
    image: oppo,
    marque: "oppo",
  },
];

function Stock() {
  const [activeCard, setActiveCard] = useState("");
  const [AllProducts, setAllProducts] = useState([]);
  const { searchValue, searchCategory } = useContext(SearchContext);
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/stock/afficherStock"
        );
        console.log(res);
        setAllProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllProducts();
  }, []);

  console.log(AllProducts);

  const handleClick = (item) => {
    setActiveCard(item.marque);
    console.log(item.marque);
    // rest of the code for handling the click event
  };

  const show = activeCard ? "" : "false";
  console.log(activeCard);

  let filteredProducts;

  if (searchValue) {
    filteredProducts = AllProducts.filter((product) =>
      String(product.serieNumber1).startsWith(String(searchValue))
    );

    if (searchCategory && searchCategory !== "Tous") {
      filteredProducts = filteredProducts.filter(
        (product) => String(product.category) === String(searchCategory)
      );
    }
  } else {
    if (searchCategory && searchCategory !== "Tous") {
      filteredProducts = AllProducts.filter(
        (product) => String(product.category) === String(searchCategory)
      );
    } else {
      filteredProducts = AllProducts;
    }
  }

  let filteredproductsAccordingtoCards;
  if (activeCard === "Tous") {
    filteredproductsAccordingtoCards = filteredProducts;
  } else {
    filteredproductsAccordingtoCards = filteredProducts.filter((product) =>
      String(product.brand) === String(activeCard)
    );
    
  }


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
                  number={ card.marque ==='Tous'?AllProducts.length : AllProducts.filter((item) => item.brand === card.marque).length}
                  marque={card.marque}
                  category={card.category}
                  onClick={() => handleClick(card)}
                />
              ))}
            </CardsContainer>
          )}

          {activeCard !== "" && (
            <>
              <ProductsTable products={filteredproductsAccordingtoCards} />
              <ReturnButton onClick={() => setActiveCard("")}>
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
