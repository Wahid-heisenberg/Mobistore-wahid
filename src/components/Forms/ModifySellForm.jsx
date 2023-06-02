import React from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  Question,
  Form,
  Field,
  Label,
  PriceContainer,
  PriceControler,
  SelectContainer,
  Select,
  FormControlers,
  Submit,
  BreakLine,
} from "./AddProductForm";
import { getCurrentDateTime } from "./AddSellForm";

import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Title } from "./AddSellForm";

import axios from "axios";
const Exit = styled.input`
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
`;
const ModifySellForm = (props) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [ClientFirstName, setClientFirstName] = useState("");
  const [ClientFamilyName, setClientFamilyName] = useState("");
  const [ClientPhoneNumber, setClientPhoneNumber] = useState("");
  const [ClientCardIdNumber, setClientCardIdNumber] = useState("");
  const [productName, setproductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productSerieNumber1, setProductSerieNumber1] = useState(0);
  const [productSerieNumber2, setProductSerieNumber2] = useState(0);
  const [price, setPrice] = useState(0); // initial price values
  const [price2, setPrice2] = useState(0);

  const [productName2, setproductName2] = useState("");
  const [productBrand2, setProductBrand2] = useState("");
  const [product__2__SerieNumber1, setProduct__2__SerieNumber1] = useState(0);
  const [product__2__SerieNumber2, setProduct__2__SerieNumber2] = useState(0);
  const [category, setCategory] = useState("Telephone");
  const [category2, setCategory2] = useState("Telephone");

  
  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  

  function shortenString(str) {
    if (str.length <= 19) {
      return str;
    } else {
      const firstSevenChars = str.slice(0, 7);
      const lastElevenChars = str.slice(-10);
      return `${firstSevenChars}...${lastElevenChars}`;
    }
  }

  const currentDate = getCurrentDateTime();

  const  selldata = new FormData();
  selldata.append("firstName", ClientFirstName)
  selldata.append("familyName",  ClientFamilyName)
  selldata.append("phoneNumber", ClientPhoneNumber)
  selldata.append("cardNumber", ClientCardIdNumber)
  selldata.append("image", selectedFile)
  selldata.append("transactionDate",currentDate )
  selldata.append("transactionType",props.transactionType )

  selldata.append("Name",productName)
  selldata.append("brand", productBrand)
  selldata.append("serieNumber1",productSerieNumber1)
  selldata.append("serieNumber2",productSerieNumber2)
  selldata.append("category",category)
  selldata.append("price",price)
//console.log(ClientFirstName,ClientFamilyName,ClientPhoneNumber,selectedFile,currentDate,props.transactionType)
console.log(productName,productBrand,productSerieNumber1,productSerieNumber2,category,price)
  const  exchangedata = new FormData();
  exchangedata.append("firstName", ClientFirstName)
  exchangedata.append("familyName",  ClientFamilyName)
  exchangedata.append("phoneNumber", ClientPhoneNumber)
  exchangedata.append("cardNumber", ClientCardIdNumber)
  exchangedata.append("image", selectedFile)
  exchangedata.append("transactionDate",currentDate )
  exchangedata.append("transactionType", props.transactionType)
  exchangedata.append("Name",productName)
  exchangedata.append("brand", productBrand)
  exchangedata.append("serieNumber1",productSerieNumber1)
  exchangedata.append("serieNumber2",productSerieNumber2)
  exchangedata.append("category",category)
  exchangedata.append("price",price)
  
  exchangedata.append("productName",productName2)
  exchangedata.append("cserieNumber1",product__2__SerieNumber1 )
  exchangedata.append("cserieNumber2",product__2__SerieNumber2)
  exchangedata.append("cbrand",productBrand2 )
  exchangedata.append("ccategory", category2)
  exchangedata.append("buyPrice",price2)
  exchangedata.append("sellPrice",price2*1.30)

//   console.log(productName2,product__2__SerieNumber1,product__2__SerieNumber2)
// console.log(productBrand2,category2 ,price2 )
console.log(props.transactionId)
  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.transactionType === "Echange") {
      axios
        .patch(`http://localhost:5000/api/transaction/updateTransaction/${props.transactionId}`, exchangedata)
        .then((response) => {
          console.log(response.data);
          alert("Echange modifier!");
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while creating the transaction.");
        });
  
      console.log("here");
    } else {
      axios
        .patch(`http://localhost:5000/api/transaction/updateTransaction/${props.transactionId}`, selldata)
        .then((response) => {
          console.log(response.data);
          alert("Vente modifier !");
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while creating the transaction.");
        });
    }

  };


  return (
    <>
      <Question style={{ marginLeft: "16px" }}>
        Voulez entrer les données modifiers de transaction{" "}
      </Question>
      <BreakLine style={{ marginTop: "-16px" }} />
      <Form onSubmit={handleSubmit}>
        <Title>Informations de client</Title>
        <span></span>
        <Label>
          Prénom
          <Field
            type="text"
            placeholder="wahid"
            required
            onChange={(e) => setClientFirstName(e.target.value)}
            value={ClientFirstName}
          />
        </Label>
        <Label>
          Nom
          <Field
            type="text"
            placeholder="Slimani"
            required
            onChange={(e) => setClientFamilyName(e.target.value)}
            value={ClientFamilyName}
          />
        </Label>
        <Label>
          Numéro de telephone
          <Field
            type="number"
            placeholder="0541129179"
            required
            onChange={(e) => setClientPhoneNumber(+e.target.value)}
            value={ClientPhoneNumber}
          />
        </Label>
        <Label>
          Numéro de la carte d'identité
          <Field
            type="number"
            placeholder="54889478"
            value={ClientCardIdNumber ? ClientCardIdNumber : ""}
            required
            onChange={(e) => setClientCardIdNumber(+e.target.value)}
          />
        </Label>
        <Label>
          Photo de la carte d'identité
          <input
            type="file"
            accept="image/*"
            id="file"
            onChange={handleFileInputChange}
            name={selectedFile}
          />
          <label htmlFor="file" className="Upload">
            <UploadFileOutlinedIcon
              style={{ marginRight: "8px", fontSize: "36px" }}
            />
            <p>
              {!selectedFile
                ? "Carte d'identité"
                : shortenString(selectedFile.name)}
            </p>
          </label>
        </Label>
        <span></span>
        <BreakLine
          style={{
            maxHeight: "8px",
            minWidth: "209%",
            marginBottom: "8px",
          }}
        />
        <span></span>
        {props.transactionType === "Vente" ? (
          <>
            <Title style={{ marginTop: "16px" }}>Information d'article</Title>
            <span></span>
            <Label>
              Nom d'article
              <Field
                type="text"
                placeholder="iphone 14"
                onChange={(e) => setproductName(e.target.value)}
                value={productName}
                required
              />
            </Label>
            <Label>
              Marque
              <Field
                type="text"
                placeholder="apple"
                value={productBrand}
                onChange={(e) => setProductBrand(e.target.value)}
                required
              />
            </Label>
            <Label>
              N°01 de série
              <Field
                type="number"
                placeholder="11474878"
                onChange={(e) => setProductSerieNumber1(+e.target.value)}
                value={productSerieNumber1 > 0 ? productSerieNumber1 : ""}
              />
            </Label>
            <Label>
              N°02 de série
              <Field
                type="number"
                onChange={(e) => setProductSerieNumber2(+e.target.value)}
                value={productSerieNumber2 > 0 ? productSerieNumber2 : ""}
                placeholder="5785454454"
              />
            </Label>
            <Label htmlFor="Categories">
              Catégorie
              <SelectContainer>
                <Select
                  name="Categories"
                  id="Categories"
                  required
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="Telephone">Télephone</option>
                  <option value="PC">PC</option>
                  <option value="Earpud">Earpud</option>
                </Select>
              </SelectContainer>
            </Label>
            <Label>
              Prix
              <PriceContainer>
                <PriceControler
                  className="Substract"
                  onClick={() => setPrice(price > 1000 ? price - 1000 : price)}
                >
                  -
                </PriceControler>
                <Field
                  type="number"
                  value={price > 0 ? price : ""}
                  placeholder="180000.00"
                  style={{
                    marginTop: "0px",
                    borderRight: "none",
                    borderLeft: "none",
                    borderRadius: "0px",
                    textAlign: "center",
                    letterSpacing: "1px",
                  }}
                />
                <PriceControler
                  className="Add"
                  onClick={() => setPrice(price + 1000)}
                >
                  {" "}
                  +{" "}
                </PriceControler>
              </PriceContainer>
            </Label>
          </>
        ) : (
          <>
            <Title style={{ marginTop: "16px" }}>
              Information d'article de magazin
            </Title>
            <span></span>
            <Label>
              Nom d'article
              <Field
                type="text"
                placeholder="Iphone 14"
                value={productName}
                onChange={(e) => setproductName(e.target.value)}
              />
            </Label>
            <Label>
              Marque
              <Field
                type="text"
                placeholder="Iphone"
                onChange={(e) => setProductBrand(e.target.value)}
                value={productBrand}
              />
            </Label>
            <Label>
              Numéro de série 1
              <Field
                type="number"
                placeholder="1147487845"
                onChange={(e) => setProductSerieNumber1(+e.target.value)}
                value={productSerieNumber1 > 0 ? productSerieNumber1 : ""}
                required
              />
            </Label>
            <Label>
              Numéro de série 2
              <Field
                type="number"
                placeholder="57854545454"
                value={productSerieNumber2 > 0 ? productSerieNumber2 : ""}
                onChange={(e) => setProductSerieNumber2(+e.target.value)}
              />
            </Label>
            <Label htmlFor="Categories">
              Catégorie
              <SelectContainer>
                <Select
                  name="Categories"
                  id="Categories"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  required
                >
                  <option value="Telephone">Télephone</option>
                  <option value="PC">PC</option>
                  <option value="Earpud">Earpud</option>
                </Select>
              </SelectContainer>
            </Label>

            <Label>
              Prix
              <PriceContainer>
                <PriceControler
                  className="Substract"
                  onClick={() => setPrice(price > 1000 ? price - 1000 : price)}
                >
                  {" "}
                  -{" "}
                </PriceControler>
                <Field
                  type="number"
                  value={price > 0 ? price : ""}
                  onChange={(e) => setPrice(+e.target.value)}
                  placeholder="180000.00"
                  style={{
                    marginTop: "0px",
                    borderRight: "none",
                    borderLeft: "none",
                    borderRadius: "0px",
                    textAlign: "center",
                    letterSpacing: "1px",
                  }}
                />
                <PriceControler
                  className="Add"
                  onClick={() => setPrice(price + 1000)}
                >
                  {" "}
                  +{" "}
                </PriceControler>
              </PriceContainer>
            </Label>
            <Title style={{ marginTop: "16px" }}>
              Information d'article de client
            </Title>
            <span></span>
            <Label>
              Nom d'article
              <Field
                type="text"
                placeholder="iphone 14"
                onChange={(e) => setproductName2(e.target.value)}
                value={productName2}
              />
            </Label>
            <Label>
              Marque
              <Field
                type="text"
                placeholder="apple"
                onChange={(e) => setProductBrand2(e.target.value)}
                value={productBrand2}
              />
            </Label>
            <Label>
              Numéro de série 1
              <Field
                type="number"
                placeholder="1147487845"
                onChange={(e) => setProduct__2__SerieNumber1(+e.target.value)}
                value={
                  product__2__SerieNumber1 > 0 ? product__2__SerieNumber1 : ""
                }
                required
              />
            </Label>
            <Label>
              Numéro de série 2
              <Field
                type="number"
                placeholder="578545454"
                onChange={(e) => setProduct__2__SerieNumber2(e.target.value)}
                required
                value={
                  product__2__SerieNumber2 > 0 ? product__2__SerieNumber2 : ""
                }
              />
            </Label>
            <Label htmlFor="Categories">
              Catégorie
              <SelectContainer>
                <Select
                  name="Categories"
                  id="Categories"
                  required
                  onChange={(e) => setCategory2(e.target.value)}
                  value={category2}
                >
                  <option value="Telephone">Télephone</option>
                  <option value="PC">PC</option>
                  <option value="Earpud">Earpud</option>
                </Select>
              </SelectContainer>
            </Label>
            <Label>
              Prix
              <PriceContainer>
                <PriceControler
                  className="Substract"
                  onClick={() =>
                    setPrice2(price2 > 1000 ? price2 - 1000 : price2)
                  }
                >
                  {" "}
                  -{" "}
                </PriceControler>
                <Field
                  type="number"
                  placeholder="180000.00"
                  required
                  onChange={(e) => setPrice2(+e.target.value)}
                  value={price2 > 0 ? price2 : ""}
                  style={{
                    marginTop: "0px",
                    borderRight: "none",
                    borderLeft: "none",
                    borderRadius: "0px",
                    textAlign: "center",
                    letterSpacing: "1px",
                  }}
                />
                <PriceControler
                  className="Add"
                  onClick={() => setPrice2(price2 + 1000)}
                >
                  {" "}
                  +{" "}
                </PriceControler>
              </PriceContainer>
            </Label>
          </>
        )}
        <FormControlers>
          <Exit type="button" value="Annuler" />
          <Submit type="submit" value="enregistré" />
        </FormControlers>
      </Form>
    </>
  );
};

export default ModifySellForm;
