import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import { Right, Header, Container } from "../../pages/Stock";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import {mobile} from '../../responsive.js'
import {
  Question,
  Form,
  Field,
  Label,
  PriceContainer,
  PriceControler,
  SelectContainer,
  Select,
  BreakLine,
} from "./AddProductForm";
import axios from "axios";

import '../../App.css'
export const Title = styled.h3`
  font-weight: 500;
  font-size: 34px;
  color: #0c2e5a;
  align-self: baseline;
  ${mobile({fontSize:'26px'})}
`;
 const FormControlers = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 24px 32px 0px 32px;
  gap: 16px;
  ${mobile({ padding:'20px 0px',gap:'12px',transform:'translateX(-60%)'})}
`;
 const Submit = styled.input`
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
  ${mobile({fontSize:'22px', padding: '4px 24px',width:'100%'})}
`;
 const Exit = styled.div`
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
  ${mobile({fontSize:'22px',  padding: '4px 24px',width:'100%'})}
`;


export const getCurrentDateTime = ()=> {
  const currentDateTime = new Date();
  const day = String(currentDateTime.getDate()).padStart(2, '0');
  const month = String(currentDateTime.getMonth() + 1).padStart(2, '0'); // Note: Months are zero-based.
  const year = currentDateTime.getFullYear();
  const hours = String(currentDateTime.getHours()).padStart(2, '0');
  const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function AddSellForm() {
  const [selectedStateValue, setSelecteStatedValue] = useState("Nouveau");
  const [itemsNumber, SetItemsNumber] = useState(1);
  const [selectedValue, setSelectedValue] = useState("Achat");

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
  const [categories, setCategories] = useState(["Telephone", "Telephone", "Telephone", "Telephone", "Telephone"]);
  const [categories2, setCategories2] = useState(["Telephone", "Telephone", "Telephone", "Telephone", "Telephone"]);

  const handleSelectCategories = (index , newCategory) => {
    const updatedCategories = [...categories];
    updatedCategories[index] =newCategory;
    setCategories(updatedCategories)
  };

  const handleSelectCategories2 = (index , newCategory2) => {
    const updatedCategories2 = [...categories2];
    updatedCategories2[index] =newCategory2;
    setCategories2(updatedCategories2)
  };


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

  function handleChangeState(event) {
    setSelecteStatedValue(event.target.value);
  }


  
  const currentDate = getCurrentDateTime();  
  console.log(
    ClientFamilyName,
    ClientFirstName,
    categories[0],
    categories2[0]
    
  );
  console.log(selectedValue);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object to represent the form data
    const  selldata = new FormData();
    selldata.append("firstName", ClientFirstName)
    selldata.append("familyName",  ClientFamilyName)
    selldata.append("phoneNumber", ClientPhoneNumber)
    selldata.append("cardNumber", ClientCardIdNumber)
    selldata.append("image", selectedFile)
    selldata.append("transactionDate",currentDate )
    selldata.append("transactionType", selectedValue)
    selldata.append("Name",productName[0])
    selldata.append("brand", productBrand[0])
    selldata.append("serieNumber1",productSerieNumber1[0])
    selldata.append("serieNumber2",productSerieNumber2[0])
    selldata.append("category",categories[0])
    selldata.append("price",prices[0])
    selldata.append("productState",selectedStateValue)


    const  exchangedata = new FormData();
    exchangedata.append("firstName", ClientFirstName)
    exchangedata.append("familyName",  ClientFamilyName)
    exchangedata.append("phoneNumber", ClientPhoneNumber)
    exchangedata.append("cardNumber", ClientCardIdNumber)
    exchangedata.append("image", selectedFile)
    exchangedata.append("transactionDate",currentDate )
    exchangedata.append("transactionType", selectedValue)
    exchangedata.append("Name",productName[0])
    exchangedata.append("brand", productBrand[0])
    exchangedata.append("serieNumber1",productSerieNumber1[0])
    exchangedata.append("serieNumber2",productSerieNumber2[0])
    exchangedata.append("category",categories[0])
    exchangedata.append("price",prices[0])
    
    exchangedata.append("productName",prodaEchName[0])
    exchangedata.append("cserieNumber1",prodaEchSerie1[0])
    exchangedata.append("cserieNumber2",prodaEchSerie2[0])
    exchangedata.append("cbrand", prodaEchBrand[0])
    exchangedata.append("ccategory", categories2[0])
    exchangedata.append("buyPrice",prices2[0])
    exchangedata.append("sellPrice",prices2[0]*1.30)
    exchangedata.append("productState",selectedStateValue)


    if (selectedValue === "Echange") {
      axios
        .post("https://mobistoreapplicaction.onrender.com/api/transaction/addexchange", exchangedata)
        .then((response) => {
          console.log(response.data);
          alert("Echange crée !");
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while creating the transaction.");
        });

      console.log("here");
    } else {
      axios
        .post("https://mobistoreapplicaction.onrender.com/api/transaction/addsell", selldata)
        .then((response) => {
          console.log(response.data);
          alert("Achat crée !");
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while creating the transaction.");
        });
    }


    // Make HTTP request to backend API to insert form data into database

   
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
                value={ClientPhoneNumber}
              />
            </Label>
            <Label>
              Numéro de la carte d'identité
              <Field
                type="number"
                placeholder="54889478"
                required
                onChange={(e) => setClientCardIdNumber(+e.target.value)}
                value={ClientCardIdNumber}
              />
            </Label>
            <Label>
              Photo de la carte d'identité
              <input
                type="file"
                accept="image/*"
                required
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
                  <option value="Achat">Achat</option>
                  <option value="Echange">Echange</option>
                </Select>
              </SelectContainer>
            </Label>
             {/* articles Number is fixed to one */}
            <Label className="ArticlesNumber">
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
                  required
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
                      Information d'article de magazin {index + 1}
                    </Title>
                    <span></span>
                    <Label>
                      Nom d'article
                      <Field
                        type="text"
                        placeholder="Iphone 14"
                        required
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
                       required
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
                        required
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
                        <Select name="Categories" id="Categories"
                        value={categories[index]}
                        required
                         onChange={(e)=>handleSelectCategories(index , e.target.value)}
                         
                         >
                          <option value="Telephone">Télephone</option>
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
                          required
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
                      Information d'article de client {index + 1}
                    </Title>
                    <span></span>
                    <Label>
                      Nom d'article
                      <Field
                        type="text"
                        placeholder="iphone 14"
                        required
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
                        placeholder="apple"
                        required
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
                        required
                        onChange={(e) =>
                          handleprodaEchSerie1(index, +e.target.value)
                        
                        }
                        value={
                          prodaEchSerie1[index] > 0 ? prodaEchSerie1[index] : ""
                        }
                        
                      />
                    </Label>
                    <Label>
                      N°02 de série
                      <Field
                        type="number"
                        placeholder="57854545454"
                        required
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
                        <Select name="Categories" id="Categories" required
                        onChange={(e)=>handleSelectCategories2(index , e.target.value)}
                        value={categories2[index]}
                        >
                          <option value="Telephone">Télephone</option>
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
                          required
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
                        placeholder="iphone 14"
                        required
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
                        placeholder="apple"
                        required
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
                        required
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
                        required
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
                        <Select name="Categories" id="Categories" required 
                        value={categories[index] }
                         onChange={(e)=>handleSelectCategories(index , e.target.value)}
                        >
                          <option value="Telephone">Télephone</option>
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
                          required
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

