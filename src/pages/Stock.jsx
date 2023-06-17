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
import realme from "../assets/realmi.png";
import { SearchContext } from "../SearchContext";
import {mobile} from '../responsive'
import {
  TopButtonsContainer,
  Button,
  BtnTitle,
} from "../components/Showcase/Showcase";

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
  margin: 0px 32px 12px 32px;
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
  ${mobile({ overflowX:'scroll',margin:"0px 12px 12px 12px"})}
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
  ${mobile({position:'relative'})}
  
`;

const ShowCaseContainer = styled.div`
  width: 100%;
  /* display: flex;
  flex-direction: column;
  gap: 16px; */
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
  ${mobile({ gridTemplateColumns:'repeat(1, 1fr)'})}
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
 ${mobile({width:'30%',fontSize:'24px'})}
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
    id: "33",
    image: sony,
    marque: "sony",
  },

  {
    id: "3",
    image: samsung,
    marque: "samsung",
  },
  {
    id: "159",
    image: realme,
    marque: "realme",
  },
  {
    id: "4",
    image: Condor,
    marque: "condor",
  },


  {
    id: "378",
    image: oppo,
    marque: "oppo",
  },
  {
    id: "1",
    image: hplogo,
    marque: "hp",
    category: ["Pc"],
  },
  {
    id: "6",
    image: lenovo,
    marque: "lenovo",
  },

];
const Buttons = [
  {
    id: 1,
    title: "Nouveau",
  },
  {
    id: 2,
    title: "Occasion",
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
          "https://mobistoreapplicaction.onrender.com/api/stock/afficherStock"
        );
        console.log(res);
        setAllProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllProducts();
  }, []);
  
const test = new FormData()
test.append("num",55)
  axios
  .post("https://mobistoreapplicaction.onrender.com/api/stock/work", test)
  .then((response) => {
    // Handle successful response from backend
    console.log("Service is working:", response.data);

  })
  .catch((error) => {
    // Handle error response from backend
    console.log("Error dans le service:", error);

  });

  console.log(AllProducts);

  const handleClick = (item) => {
    setActiveCard(item.marque);
    console.log(item.marque);
    // rest of the code for handling the click event
  };

  const show = activeCard ? "" : "false";
  console.log(activeCard);

  const [activeButton, setActiveButton] = useState("Nouveau");
  const handleClickButton = (item) => {
    setActiveButton(item);
  };

  let initialazedfilteredProducts = AllProducts.filter((item) =>
  String(item.productState) ===String(activeButton)
  );
  console.log(initialazedfilteredProducts)

  let filteredProducts;

  if (searchValue) {
    filteredProducts = initialazedfilteredProducts.filter((product) =>
      String(product.serieNumber1).startsWith(String(searchValue))
    );

    if (searchCategory && searchCategory !== "Tous") {
      filteredProducts = filteredProducts.filter(
        (product) => String(product.category) === String(searchCategory)
      );
    }
  } else {
    if (searchCategory && searchCategory !== "Tous") {
      filteredProducts = initialazedfilteredProducts.filter(
        (product) => String(product.category) === String(searchCategory)
      );
    } else {
      filteredProducts = initialazedfilteredProducts;
    }
  }

  let filteredproductsAccordingtoCards;
  if (activeCard === "Tous") {
    filteredproductsAccordingtoCards = filteredProducts;
  } else {
    filteredproductsAccordingtoCards = filteredProducts.filter(
      (product) => String(product.brand) === String(activeCard)
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
            <>
              <TopButtonsContainer>
                {Buttons.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => {
                      handleClickButton(item.title);
                    }}
                    className={
                      activeButton?.trim().toLowerCase() ===
                      item.title?.trim().toLowerCase()
                        ? "activebtn"
                        : ""
                    }
                  >
                    <BtnTitle>{item.title}</BtnTitle>
                  </Button>
                ))}
              </TopButtonsContainer>
              <CardsContainer>
                {CardsArray.map((card) => (
                  <Card
                    key={card.id * 3.14}
                    image={card.image}
                    number={
                      card.marque === "Tous"
                        ? initialazedfilteredProducts.length
                        : initialazedfilteredProducts.filter(
                            (item) => item.brand === card.marque
                          ).length
                    }
                    marque={card.marque}
                    category={card.category}
                    onClick={() => handleClick(card)}
                  />
                ))}
              </CardsContainer>
            </>
          )}

          {activeCard !== "" && (
            <>
       <ShowCaseContainer>
       <ProductsTable products={filteredproductsAccordingtoCards} />
       </ShowCaseContainer>

       

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
