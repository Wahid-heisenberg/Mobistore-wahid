import React from "react";
import {
  Table,
  HRow,
  HColumn,
  Row,
  Column,
  Nom,
  Nserie,
  Pachat,
} from "./ProductsTable";

//import img from "../../public/cardsPictures/d6de3eea-f87c-4602-b625-cfe0b633d1ab.png"
import styled from "styled-components";
import IdCardIcon from "../IdCard.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Header = [
  "Nom",
  "Date",
  "N° de série 1",
  "N° de série 2",
  "Prix d'achat",
];
const DetailsHeader = ["Nom", "Prénom", "Num de tel", "N° Carte", "Etat"];
const DetailsColumn = styled.td`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  background-color: rgba(162, 204, 246, 0.91);
  height: 100%;
`;
const CostumerCard = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 24px;
  background: #ffffff;
  border: 2.5px solid #208fd0;
  border-radius: 6px;
  gap: 24px;
  letter-spacing: 1px;
  cursor: pointer;
  font-weight: 700;
  &:hover {
    transform: scaleX(1.05);
    transition: 0.2s ease-out;
  }
`;

const DeleteButton = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  background: #ffffff;
  border: 2.5px solid #f46036;
  color: #f46036;
  border-radius: 6px;
  font-size: 24px;
  min-width: 148px;
  cursor: pointer;
  &:hover {
    transition: 0.3s ease-out;
    background: #f46036;
    border: 2.5px solid white;
    color: white;
    font-weight: 700;
  }
`;
const UpdateButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  background: #ffffff;
  border: 2.5px solid #208fd0;
  color: #208fd0;
  border-radius: 6px;
  font-size: 24px;
  min-width: 148px;
  cursor: pointer;
  &:hover {
    transition: 0.3s ease-out;
    background: #208fd0;
    border: 2.5px solid white;
    color: white;
    font-weight: bold;
  }
`;
const ControlersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 32px;
  border: none;
`;
const ImageBlock = styled.div`
  position: absolute;
  top: 20%;
  left: 30%;
  width: 55%;
  aspect-ratio: 5/3;
  border: 2px solid #555555;
  z-index: 8;
  display: flex;
  flex-direction: column;
  object-fit: contain;
  background-color: white;
`;
const HideButton = styled.button`
  display: flex;
  border: none;
  align-items: center;
  justify-content: center;
  align-self: baseline;
  color: #555555;
  padding: 8px;
  font-size: 48px;

  &:hover {
    color: #ff7f11;
    transition: 0.2s all linear;
  }
`;
const Cardpicture = styled.img`
  width: 100%;
  height: 100%;
  z-index: 19;
`;

function SoldProductsTable() {
  const [expandedRows, setExpandedRows] = useState([]);
  const [AllTransactions, setAllTransactions] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [currentTransaction, setcurrentTransaction] = useState(-1);

  //const [showConfirmation, setShowConfirmation] = useState(false);
  console.log(imageUrl);
  function toggleRow(index) {
    setExpandedRows(
      expandedRows.includes(index)
        ? expandedRows.filter((i) => i !== index)
        : [...expandedRows, index]
    );
  }
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/transaction/getAlltransactions"
        );
        console.log(res);
        setAllTransactions(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllTransactions();
  }, [expandedRows]);


  useEffect(() => {
    const deleteTransaction = async () => {
      
      try {
        const res = await axios.delete(
          `http://localhost:5000/api/transaction/deleteTransactions/${currentTransaction}`
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

   deleteTransaction() 
  }, [currentTransaction]);

  return (
    <>
      <Table>
        <thead>
          <HRow>
            {Header.map((item, Hindex) => (
              <HColumn
                key={Hindex + 1}
                className="HeaderColumn"
                style={{
                  fontWeight: "600",
                  fontSize: "24px",
                  color: "black",
                  textAlign: "center",
                }}
              >
                {item}
              </HColumn>
            ))}
            <HColumn style={{ maxWidth: "40px" }}></HColumn>
          </HRow>
        </thead>
        <tbody>
          {AllTransactions.map((Product, index) => (
            <>
              <Row
                className="Row"
                key={Product.transactionId}
                onClick={() => toggleRow(index)}
              >
                <Column>
                  {" "}
                  <Nom>
                    {" "}
                    {Product.soldProductName
                      ? Product.soldProductName
                      : Product.exchangedProductName}{" "}
                  </Nom>{" "}
                </Column>
                <Column>
                  {" "}
                  <p
                    style={{
                      color: "#0C2E5A",
                      fontWeight: "500",
                      fontSize: "24px",
                    }}
                  >
                    {" "}
                    {Product.transactionDate}{" "}
                  </p>{" "}
                </Column>
                <Column>
                  {" "}
                  <Nserie style={{ color: "#0C2E5A" }}>
                    {Product.exchangedProductSerieNumber1
                      ? Product.exchangedProductSerieNumber1
                      : Product.soldProductSerieNumber1}
                  </Nserie>{" "}
                </Column>
                <Column>
                  {" "}
                  <Nserie style={{ color: "#0C2E5A" }}>
                    {" "}
                    {Product.exchangedProductSerieNumber2
                      ? Product.exchangedProductSerieNumber2
                      : Product.soldProductSerieNumber2}
                  </Nserie>{" "}
                </Column>
                <Column>
                  {" "}
                  <Pachat style={{ color: "#0C2E5A" }}>
                    {" "}
                    {Product.soldProductPrice
                      ? Product.soldProductPrice
                      : Product.exchangedProductPrice}{" "}
                  </Pachat>{" "}
                </Column>
                <Column style={{ maxWidth: "40px" }}>
                  {!expandedRows.includes(index) ? (
                    <ArrowDropDownIcon
                      style={{ fontSize: "48px", color: "#007FC9" }}
                    />
                  ) : (
                    <ArrowDropUpIcon
                      style={{ fontSize: "48px", color: "#007FC9" }}
                    />
                  )}
                </Column>
              </Row>

              {expandedRows.includes(index) && (
                <>
                  <Table
                    key={Product.transactionDate}
                    style={{ border: "none", padding: "0px", margin: "0px" }}
                  >
                    <thead>
                      <HRow style={{ padding: "0px", margin: "-2px -6px" }}>
                        {DetailsHeader.map((item, Colindex) => (
                          <HColumn
                            key={Colindex}
                            className="HeaderColumn"
                            style={{
                              fontWeight: "600",
                              fontSize: "24px",
                              color: "#0C2E5A",
                              textAlign: "center",
                              padding: "24px",
                              backgroundColor: "rgba(162, 204, 246, 0.91)",
                            }}
                          >
                            {item}
                          </HColumn>
                        ))}
                      </HRow>
                    </thead>
                    <tbody>
                      <Row
                        className="Row"
                        style={{ padding: "0px", margin: "-2px -6px" }}
                        key={Product.transactionId}
                      >
                        <DetailsColumn> {Product.firstName} </DetailsColumn>
                        <DetailsColumn> {Product.familyName} </DetailsColumn>
                        <DetailsColumn> {Product.phoneNumber}</DetailsColumn>
                        <DetailsColumn> {Product.cardNumber} </DetailsColumn>
                        {Product.transactionType !== "Echange" ? (
                          <DetailsColumn
                            style={{
                              color: "#27A033",
                              textShadow: "1px 1px 1px skyblue",
                            }}
                          >
                            {" "}
                            {Product.transactionType}{" "}
                          </DetailsColumn>
                        ) : (
                          <DetailsColumn
                            style={{
                              color: "#007FC9",
                              textShadow: "1px 1px 1px skyblue",
                            }}
                          >
                            {" "}
                            {Product.transactionType}{" "}
                          </DetailsColumn>
                        )}
                      </Row>
                      <Row
                        className="Row"
                        style={{ padding: "0px ", margin: "-2px -6px" }}
                        key={-1 - Product.transactionId}
                      >
                        <DetailsColumn
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "32px 10% 20px 10%",
                          }}
                          colSpan={6}
                        >
                          {" "}
                          <CostumerCard
                            type="button"
                            onClick={() => {
                              setImageUrl(`${Product.cardPicturePath}`);
                              setShowImage(true);
                            }}
                          >
                            <img height="44px" src={IdCardIcon} alt="CardId" />
                            <p style={{ fontSize: "24px", color: "#208FD0" }}>
                              Carte d'identité{" "}
                            </p>
                          </CostumerCard>
                          <ControlersContainer>
                            <DeleteButton
                              type="button"
                              value="Supprimer"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Êtes-vous sûr(e) de vouloir supprimer ce produit ?"
                                  )
                                ) {
                                  setcurrentTransaction(Product.transactionId);
                                  
                                }
                              }}
                            />

                            <Link
                              style={{
                                textDecoration: "none",
                                fontSize: "24px",
                              }}
                            >
                              <UpdateButton>Modifier</UpdateButton>
                            </Link>
                          </ControlersContainer>
                        </DetailsColumn>
                      </Row>
                    </tbody>
                  </Table>
                </>
              )}
            </>
          ))}
        </tbody>
      </Table>
      {showImage && (
        <ImageBlock>
          <HideButton onClick={() => setShowImage(false)}>
            <CloseOutlinedIcon />
          </HideButton>
          <Cardpicture src={imageUrl} alt="Product Image" />
        </ImageBlock>
      )}
    </>
  );
}

export default SoldProductsTable;
