import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import { Right, Header, Container } from "../../pages/Stock";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import sortDownImage from "./sort-down.png";
import axios from "axios";
import {mobile} from '../../responsive.js'
export const Question = styled.h2`
  font-weight: 600;
  font-size: 36px;
  color: #000000;
  opacity: 0.5;
  align-self: baseline;
  ${mobile({ fontSize:'24px'})}
`;
export const BreakLine = styled.hr`
  min-height: 8px;
  width: 100%;
  background-color: #007fc9;
  margin: 16px 0px;
`;
export const FormContainer = styled.div`
  max-width: 100%;
`;
export const Form = styled.form`
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 5%;
  grid-row-gap: 20px;
  padding: 0px 16px 24px 16px;
  ${mobile({ gridTemplateColumns:' repeat(1, 1fr)'})}
`;
export const Field = styled.input`
  margin-top: 8px;
  border: 1.6px solid #007fc9;
  width: 100%;
  border-radius: 6px;
  height: 52px;
  font-size: 32px;
  align-items: center;
  padding: 8px 20px;
  &:hover {
    box-shadow: inset 0px 0px 0px 1px #208fd0;
    transition: 0.4s ease-out;
  }
  &:focus {
    outline: none;
    box-shadow: inset 0px 0px 0px 1px #208fd0;
  }
  &::placeholder {
    font-size: 32px;
    opacity: 0.7;
    ${mobile({fontSize:'22px'})}
  }
  appearance: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ${mobile({fontSize:'22px',height:'42px',padding:'4px 10px'})}

`;
export const Label = styled.label`
  font-size: 29px;
  font-weight: lighter;
  ${mobile({ width:'100%',fontSize:'22px'})}
`;
export const PriceControler = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 200;
  font-size: 48px;

  background-color: #d9d9d9;
  opacity: 0.75;
  border: none;
  height: 52px;
  width: 52px;
  border: 1.6px solid #a9a9a9;
  position: absolute;
  top: 0;
  &.Add {
    right: 0;
  }
  &.Substract {
    left: 0;
  }
  ${mobile({fontSize:'36px',height:'42px'})}
`;
export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  position: relative;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 8px;
`;
export const Select = styled.select`
  border-radius: 6px;
  border: 1.6px solid #007fc9;
  box-shadow: inset 0px 0px 0px 0.3px #208fd0;
  height: 52px;
  width: 100%;
  font-size: 28px;
  padding: 8px 20px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url(${sortDownImage}) no-repeat;
  background-position: calc(100% - 8px);
  background-size: 36px;
  &:hover {
    box-shadow: inset 0px 0px 0px 1px #208fd0;
    transition: 0.4s ease-out;
  }
  &:focus {
    outline: none;
    box-shadow: inset 0px 0px 0px 1px #208fd0;
  }
  
  ${mobile({fontSize:'22px',padding:'4px 16px',height:'42px'})}
`;

export const FormControlers = styled.div`

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 24px 32px 0px 32px;

  gap: 16px;
  ${mobile({ position: 'relative',flexDirection:'column',padding:'20px 0px',gap:'12px'})}
`;

export const Submit = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #007fc9;
  font-size: 30px;
  padding: 6px 32px;
  height: 52px;
  border: 1.6px solid #007fc9;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    transform: scaleX(1.05);
    transition: all ease-out 0.4s;
  }
  ${mobile({fontSize:'22px', padding: '4px 24px',position:'absolute',left:'10px',top:'25%',width:'96%'})}
`;
export const Exit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007fc9;
  background-color: white;
  font-size: 30px;
  padding: 6px 32px;
  height: 52px;
  border: 1.6px solid #007fc9;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    transform: scaleX(1.05);
    transition: all ease-out 0.4s;
  }
  ${mobile({fontSize:'22px',  padding: '4px 24px',position:'absolute', top:'200%',left : '10px',width:'96%'})}
`;

function AddProductForm() {
  const [selectedValue, setSelectedValue] = useState("Telephone");
  const [selectedStateValue, setSelecteStatedValue] = useState("Nouveau");
  const [SellPrice, SetSellPrice] = useState(0);
  const [BuyPrice, SetBuyPrice] = useState(0);
  const [productName, setproductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productSerieNumber1, setProductSerieNumber1] = useState(0);
  const [productSerieNumber2, setProductSerieNumber2] = useState(0);
  function handleChange(event) {
    setSelectedValue(event.target.value);
  }

  function handleChangeState(event) {
    setSelecteStatedValue(event.target.value);
  }
  console.log(
    SellPrice,
    BuyPrice,
    productName,
    productBrand,
    productSerieNumber1,
    productSerieNumber2
  );
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object to represent the form data
    const productData = {
      productName: productName,
      serieNumber1: productSerieNumber1,
      serieNumber2: productSerieNumber2,
      brand: productBrand,
      category :selectedValue,
      buyPrice: SellPrice,
      sellPrice: BuyPrice,
      productState : selectedStateValue
    };
    console.log("here");

    // Make HTTP request to backend API to insert form data into database
    axios
      .post("http://localhost:5000/api/stock/addproduct", productData)
      .then((response) => {
        console.log(response.data);
        alert("product added successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while creating the user.");
      });
  };

  return (
    <>
      <Container>
        <Sidebar defaultPage="Stock" />

        <Right>
          <Header>
            <Topbar title="Stock" state="desabled" />
          </Header>
          <Question>Voulez entrer les données de produit </Question>

          <BreakLine style={{ marginTop: "-16px" }} />
          <FormContainer>
            <Form onSubmit={handleSubmit}>
              <Label>
                Nom de produit
                <Field
                  type="text"
                  placeholder="Iphone  14"
                  value={productName}
                  onChange={(e) => setproductName(e.target.value)}
                  required
                />
              </Label>
              <Label>
                Marque
                <Field
                  type="text"
                  placeholder="Iphone "
                  value={productBrand}
                  onChange={(e) => setProductBrand(e.target.value)}
                  required
                />
              </Label>
              <Label>
                N°01 de série
                <Field
                  type="number"
                  value={productSerieNumber1 > 0 ? productSerieNumber1 : ""}
                  onChange={(e) => setProductSerieNumber1(+e.target.value)}
                  placeholder="1147487845"
                  required
                />
              </Label>
              <Label>
                N°02 de série
                <Field
                  type="number"
                  value={productSerieNumber2 > 0 ? productSerieNumber2 : ""}
                  onChange={(e) => setProductSerieNumber2(+e.target.value)}
                  placeholder="57854545454"
                  required
                />
              </Label>
              <Label htmlFor="Categories">
                Catégorie
                <SelectContainer>
                  <Select
                    name="Categories"
                    id="Categories"
                    value={selectedValue}
                    onChange={handleChange}
                    required
                  >
                    <option value="Telephone">Télephone</option>
                  </Select>
                </SelectContainer>
              </Label>
              <Label htmlFor="States">
              État d'article
                <SelectContainer>
                  <Select
                    name="States"
                    id="States"
                    value={selectedStateValue}
                    onChange={handleChangeState}
                    required
                  >
                    <option value="Nouveau">Nouveau</option>
                    <option value="Occasion">Occasion</option>
                  </Select>
                </SelectContainer>
              </Label>

              <Label>
                Prix d'achat
                <PriceContainer>
                  <PriceControler
                    className="Substract"
                    onClick={() => SetBuyPrice(BuyPrice - 1000)}
                  >
                    -
                  </PriceControler>
                  <Field
                    required
                    type="number"
                    value={BuyPrice > 0 ? BuyPrice : ""}
                    onChange={(e) => SetBuyPrice(+e.target.value)}
                    placeholder="180000.00"
                    style={{
                      marginTop: "0px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderRadius: "0px",
                      textAlign: "center",
                      letterSpacing: "1px",
                      padding: "0px 62px",
                    }}
                  />
                  <PriceControler
                    className="Add"
                    onClick={() => SetBuyPrice(BuyPrice - -1000)}
                  >
                    +
                  </PriceControler>
                </PriceContainer>
              </Label>

              <Label>
                Prix de vente
                <PriceContainer>
                  <PriceControler
                    className="Substract"
                    onClick={() => SetSellPrice(SellPrice - 1000)}
                  >
                    -
                  </PriceControler>
                  <Field
                    required
                    value={SellPrice > 0 ? SellPrice : ""}
                    onChange={(e) => SetSellPrice(+e.target.value)}
                    type="number"
                    placeholder="180000.00"
                    style={{
                      marginTop: "0px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderRadius: "0px",
                      textAlign: "center",
                      letterSpacing: "1px",
                      padding: "0px 62px",
                    }}
                  />
                  <PriceControler
                    className="Add"
                    onClick={() => SetSellPrice(SellPrice - -1000)}
                  >
                    +
                  </PriceControler>
                </PriceContainer>
              </Label>

              <span></span>

              <FormControlers>
                <Link
                  exact="true"
                  to="/Stock"
                  style={{ textDecoration: "none" }}
                >
                  <Exit> Annuler</Exit>
                </Link>
                <Submit type="submit" value="enregistré" />
              </FormControlers>
            </Form>
          </FormContainer>
        </Right>
      </Container>
    </>
  );
}

export default AddProductForm;
