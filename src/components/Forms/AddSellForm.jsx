import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import { Right, Header, Container } from "../../pages/Stock";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
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
  Exit,
  BreakLine,
} from "./AddProductForm";
import axios from "axios";
export const Title = styled.h3`
  font-weight: 500;
  font-size: 34px;
  color: #0c2e5a;
  align-self: baseline;
`;

function AddSellForm() {
  const [itemsNumber, SetItemsNumber] = useState(1);
  const [selectedValue, setSelectedValue] = useState("");

  const [ClientFirstName, setClientFirstName] = useState("");
  const [ClientFamilyName, setClientFamilyName] = useState("");
  const [ClientPhoneNumber, setClientPhoneNumber] = useState("");
  const [ClientCardIdNumber, setClientCardIdNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const [productName, setProductName] = useState(["", "", "", "", ""]);
  const [productBrand, setProductBrand] = useState(["", "", "", "", ""]);
  const [productSerieNumber1, setProductSerieNumber1] = useState([
    0, 0, 0, 0, 0,
  ]);
  const [productSerieNumber2, setProductSerieNumber2] = useState([
    0, 0, 0, 0, 0,
  ]);

  const [prodaEchName, setProdaEchName] = useState(["", "", "", "", ""]);
  const [prodaEchBrand, setProdaEchBrand] = useState(["", "", "", "", ""]);
  const [prodaEchSerie1, setProdaEchSerie1] = useState([0, 0, 0, 0, 0]);
  const [prodaEchSerie2, setProdaEchSerie2] = useState([0, 0, 0, 0, 0]);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [prices, setPrices] = useState([0, 0, 0, 0, 0, 0, 0, 0]); // initial price values
  const [prices2, setPrices2] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const handleIncrement = (index) => {
    const updatedPrices = [...prices];
    updatedPrices[index] += 1000;
    setPrices(updatedPrices);
  };

  const handleDecrement = (index) => {
    if (prices[index] >= 1000) {
      // ensure price doesn't go below 0
      const updatedPrices = [...prices];
      updatedPrices[index] -= 1000;
      setPrices(updatedPrices);
    }
  };

  // initial price values

  const handleIncrement2 = (index) => {
    const updatedPrices2 = [...prices2];
    updatedPrices2[index] += 1000;
    setPrices2(updatedPrices2);
  };

  const handleDecrement2 = (index) => {
    if (prices2[index] >= 1000) {
      // ensure price doesn't go below 0
      const updatedPrices2 = [...prices2];
      updatedPrices2[index] -= 1000;
      setPrices2(updatedPrices2);
    }
  };
  const handlePriceChange = (index, newPrice) => {
    const updatedPrices = [...prices];
    updatedPrices[index] = parseFloat(newPrice); // convert string to number
    setPrices(updatedPrices);
  };

  const handlePriceChange2 = (index, newPrice) => {
    const updatedPrices2 = [...prices2];
    updatedPrices2[index] = parseFloat(newPrice); // convert string to number
    setPrices2(updatedPrices2);
  };

  function handleChange(event) {
    setSelectedValue(event.target.value);
  }

  const handleProductName = (index, newName) => {
    const updatedProductnames = [...productName];
    updatedProductnames[index] = newName;
    setProductName(updatedProductnames);
  };
  const handleProductBrand = (index, newBrand) => {
    const updatedProductBrands = [...productBrand];
    updatedProductBrands[index] = newBrand;
    setProductBrand(updatedProductBrands);
  };

  const handleSerienumber1 = (index, newSerieNumber1) => {
    const updatedSerieNumbers1 = [...productSerieNumber1];
    updatedSerieNumbers1[index] = newSerieNumber1;
    setProductSerieNumber1(updatedSerieNumbers1);
  };
  const handleSerienumber2 = (index, newSerieNumber2) => {
    const updatedSerieNumbers2 = [...productSerieNumber2];
    updatedSerieNumbers2[index] = newSerieNumber2;
    setProductSerieNumber2(updatedSerieNumbers2);
  };

  const handleProdaEchName = (index, newProdaEch) => {
    const updatedProdaEchName = [...prodaEchName];
    updatedProdaEchName[index] = newProdaEch;
    setProdaEchName(updatedProdaEchName);
  };

  const handleprodaEchBrand = (index, newProdaEchBrand) => {
    const updatedProdaEchBrand = [...prodaEchBrand];
    updatedProdaEchBrand[index] = newProdaEchBrand;
    setProdaEchBrand(updatedProdaEchBrand);
  };

  const handleprodaEchSerie1 = (index, newProdaEchSerie1) => {
    const updatedProdaEchSerie1 = [...prodaEchSerie1];
    updatedProdaEchSerie1[index] = newProdaEchSerie1;
    setProdaEchSerie1(updatedProdaEchSerie1);
  };

  const handleprodaEchSerie2 = (index, newProdaEchSerie2) => {
    const updatedProdaEchSerie2 = [...prodaEchSerie2];
    updatedProdaEchSerie2[index] = newProdaEchSerie2;
    setProdaEchSerie2(updatedProdaEchSerie2);
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
  console.log(
    ClientFamilyName,
    ClientFirstName,
    ClientPhoneNumber,
    selectedFile,
    productName
  );
  console.log(selectedValue);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object to represent the form data
    const  clientData = new FormData();
    clientData.append("firstName", ClientFirstName)
    clientData.append("familyName",  ClientFamilyName)
    clientData.append("phoneNumber", ClientPhoneNumber)
    clientData.append("cardNumber", ClientCardIdNumber)
    clientData.append("image", selectedFile)
    /*const c = {
      firstName: ClientFamilyName,
      familyName: ClientFirstName,
      phoneNumber: ClientPhoneNumber,
      cardNumber: ClientCardIdNumber,
      cardPicturePath: selectedFile,
    };*/
    console.log("here");

    // Make HTTP request to backend API to insert form data into database
    axios
      .post("http://localhost:5000/api/transaction/addsell", clientData)
      .then((response) => {
        console.log(response.data);
        alert("User created successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while creating the user.");
      });
    // if (selectedValue === "Vente") {
    //   // Create an object to represent the form data
    //   const purchaseData = {
    //     nomAchat: productName[0],
    //     nmrSerie1: productSerieNumber1[0],
    //     nmrSerie2: productSerieNumber2[0],
    //     prixAchat: prices[0],
    //   };
    //   console.log("here");

    //   // Make HTTP request to backend API to insert form data into database
    //   try {
    //     axios.post("http://localhost:8002/ajouterAchat", purchaseData);
    //     alert("purchase successfully!");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else {
    //   ///////// echange ///////
    //   const exchangeData = {
    //     nomRev: productName[0],
    //     nmrSerie1Rev: productSerieNumber1[0],
    //     nmrSerie2Rev: productSerieNumber2[0],
    //     prixRev: prices[0],
    //     nomProd: prodaEchName[0],
    //     numSerie1: prodaEchSerie1[0],
    //     numSerie2: prodaEchSerie2[0],
    //     prixAchat: prices2[0],
    //   };
    //   console.log("here");

    //   try {
    //     axios.post("http://localhost:8003/ajouterRevente", exchangeData);
    //     alert("Exchange successfully!");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  return (
    <>
      <Container>
        <Sidebar defaultPage="Transactions" />
        <Right>
          <Header>
            <Topbar title="Transactions" state="desabled" />
          </Header>
          <Question>Voulez entrer les données de transaction </Question>
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
                name={ClientFamilyName}
              />
            </Label>
            <Label>
              Numéro de telephone
              <Field
                type="number"
                placeholder="0541129179"
                required
                onChange={(e) => setClientPhoneNumber(+e.target.value)}
                name={ClientPhoneNumber}
              />
            </Label>
            <Label>
              Numéro de la carte d'identité
              <Field
                type="number"
                placeholder="54889478"
                required
                onChange={(e) => setClientCardIdNumber(+e.target.value)}
                name={ClientPhoneNumber}
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
            <Label htmlFor="Etat">
              Type de transaction
              <SelectContainer>
                <Select
                  name="Etat"
                  id="Etat"
                  value={selectedValue}
                  onChange={handleChange}
                  required
                >
                  <option value="Vente">Vente</option>
                  <option value="Echange">Echange</option>
                </Select>
              </SelectContainer>
            </Label>
            <Label>
              Nombre d'articles
              <PriceContainer>
                <PriceControler
                  className="Substract"
                  onClick={() =>
                    itemsNumber < 2
                      ? SetItemsNumber(1)
                      : SetItemsNumber(itemsNumber - 1)
                  }
                >
                  {" "}
                  -
                </PriceControler>
                <Field
                  
                  value={itemsNumber >= 2 ? itemsNumber : 1}
                  onChange={(e) =>
                    SetItemsNumber(e.target.value > 2 ? e.target.value : 1)
                  }
                  type="number"
                  placeholder="Nombre darcticles"
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
                  onClick={() => SetItemsNumber(itemsNumber + 1)}
                >
                  +
                </PriceControler>
              </PriceContainer>
            </Label>
            <BreakLine
              style={{
                maxHeight: "8px",
                minWidth: "209%",
                marginBottom: "-8px",
              }}
            />
            <span></span>

            {selectedValue === "Echange"
              ? Array.from({ length: itemsNumber }, (_, index) => (
                  <>
                    <Title key={index} style={{ marginTop: "16px" }}>
                      Information d'article échangé {index + 1}
                    </Title>
                    <span></span>
                    <Label>
                      Nom d'article
                      <Field
                        type="text"
                        placeholder="Iphone 14"
                        
                        onChange={(e) =>
                          handleProductName(index, e.target.value)
                        }
                        value={productName[index]}
                      />
                    </Label>
                    <Label>
                      Marque
                      <Field
                        type="text"
                        placeholder="Iphone"
                       
                        onChange={(e) =>
                          handleProductBrand(index, e.target.value)
                        }
                        value={productBrand[index]}
                      />
                    </Label>
                    <Label>
                      N°01 de série
                      <Field
                        type="number"
                        placeholder="1147487845"
                        onChange={(e) =>
                          handleSerienumber1(index, +e.target.value)
                        }
                        value={
                          productSerieNumber1[index] > 0
                            ? productSerieNumber1[index]
                            : ""
                        }
                        required
                      />
                    </Label>
                    <Label>
                      N°02 de série
                      <Field
                        type="number"
                        placeholder="57854545454"
                        onChange={(e) =>
                          handleSerienumber2(index, +e.target.value)
                        }
                        value={
                          productSerieNumber2[index] > 0
                            ? productSerieNumber2[index]
                            : ""
                        }
                        
                      />
                    </Label>
                    <Label htmlFor="Categories">
                      Catégorie
                      <SelectContainer>
                        <Select name="Categories" id="Categories" required>
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
                          onClick={() => handleDecrement(index)}
                        >
                          {" "}
                          -{" "}
                        </PriceControler>
                        <Field
                          
                          type="number"
                          value={prices[index] > 0 ? prices[index] : ""}
                          onChange={(e) =>
                            handlePriceChange(index, +e.target.value)
                          }
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
                          onClick={() => handleIncrement(index)}
                        >
                          {" "}
                          +{" "}
                        </PriceControler>
                      </PriceContainer>
                    </Label>
                    <Title style={{ marginTop: "16px" }}>
                      Information d'article a échangé {index + 1}
                    </Title>
                    <span></span>
                    <Label>
                      Nom d'article
                      <Field
                        type="text"
                        placeholder="Iphone 14"
                        onChange={(e) =>
                          handleProdaEchName(index, e.target.value)
                        }
                        value={prodaEchName[index]}
                        
                      />
                    </Label>
                    <Label>
                      Marque
                      <Field
                        type="text"
                        placeholder="Iphone"
                        onChange={(e) =>
                          handleprodaEchBrand(index, e.target.value)
                        }
                        value={prodaEchBrand[index]}
                        
                      />
                    </Label>
                    <Label>
                      N°01 de série
                      <Field
                        type="number"
                        placeholder="1147487845"
                        onChange={(e) =>
                          handleprodaEchSerie1(index, +e.target.value)
                        }
                        value={
                          prodaEchSerie1[index] > 0 ? prodaEchSerie1[index] : ""
                        }
                        required
                      />
                    </Label>
                    <Label>
                      N°02 de série
                      <Field
                        type="number"
                        placeholder="57854545454"
                        onChange={(e) =>
                          handleprodaEchSerie2(index, +e.target.value)
                        }
                        value={
                          prodaEchSerie2[index] > 0 ? prodaEchSerie2[index] : ""
                        }
                     
                      />
                    </Label>
                    <Label htmlFor="Categories">
                      Catégorie
                      <SelectContainer>
                        <Select name="Categories" id="Categories" required>
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
                          onClick={() => handleDecrement2(index)}
                        >
                          {" "}
                          -{" "}
                        </PriceControler>
                        <Field
                          
                          type="number"
                          value={prices2[index] > 0 ? prices2[index] : ""}
                          onChange={(e2) =>
                            handlePriceChange2(index, +e2.target.value)
                          }
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
                          onClick={() => handleIncrement2(index)}
                        >
                          {" "}
                          +{" "}
                        </PriceControler>
                      </PriceContainer>
                    </Label>
                    {itemsNumber > index + 1 && (
                      <>
                        <BreakLine
                          style={{
                            maxHeight: "8px",
                            minWidth: "209%",
                            marginBottom: "-8px",
                          }}
                        />
                        <span></span>
                      </>
                    )}
                  </>
                ))
              : Array.from({ length: itemsNumber }, (_, index) => (
                  <>
                    <Title style={{ marginTop: "16px" }}>
                      Information d'article {index + 1}{" "}
                    </Title>
                    <span></span>
                    <Label>
                      Nom d'article
                      <Field
                        type="text"
                        placeholder="Iphone 14"
                        onChange={(e) =>
                          handleProductName(index, e.target.value)
                        }
                        value={productName[index]}
                        
                      />
                    </Label>
                    <Label>
                      Marque
                      <Field
                        type="text"
                        placeholder="Iphone"
                        onChange={(e) =>
                          handleProductBrand(index, e.target.value)
                        }
                        value={productBrand[index]}
                        
                      />
                    </Label>
                    <Label>
                      N°01 de série
                      <Field
                        type="number"
                        placeholder="1147487845"
                        onChange={(e) =>
                          handleSerienumber1(index, +e.target.value)
                        }
                        value={
                          productSerieNumber1[index] > 0
                            ? productSerieNumber1[index]
                            : ""
                        }
                        
                      />
                    </Label>
                    <Label>
                      N°02 de série
                      <Field
                        type="number"
                        onChange={(e) =>
                          handleSerienumber2(index, +e.target.value)
                        }
                        value={
                          productSerieNumber2[index] > 0
                            ? productSerieNumber2[index]
                            : ""
                        }
                        placeholder="57854545454"
                       
                      />
                    </Label>
                    <Label htmlFor="Categories">
                      Catégorie
                      <SelectContainer>
                        <Select name="Categories" id="Categories" required>
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
                          onClick={() => handleDecrement(index)}
                        >
                          -
                        </PriceControler>
                        <Field
                          
                          type="number"
                          value={prices[index] > 0 ? prices[index] : ""}
                          onChange={(e) =>
                            handlePriceChange(index, +e.target.value)
                          }
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
                          onClick={() => handleIncrement(index)}
                        >
                          {" "}
                          +{" "}
                        </PriceControler>
                      </PriceContainer>
                    </Label>
                    {itemsNumber > index + 1 && (
                      <>
                        <BreakLine
                          style={{
                            maxHeight: "8px",
                            minWidth: "209%",
                            marginBottom: "-8px",
                          }}
                        />
                        <span></span>
                      </>
                    )}
                  </>
                ))}
            <FormControlers
              style={{ placeSelf: "center", position: "relative", left: "50%" }}
            >
              <Link
                exact="true"
                to="/Transactions"
                style={{ textDecoration: "none" }}
              >
                <Exit> Annuler</Exit>
              </Link>
              <Submit type="submit" value="enregistré" />
            </FormControlers>
          </Form>
        </Right>
      </Container>
    </>
  );
}

export default AddSellForm;
