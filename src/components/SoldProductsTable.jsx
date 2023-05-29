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
import styled from "styled-components";
import IdCardIcon from "../IdCard.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Header = [
  "Nom",
  "Date",
  "N° de série 1",
  "N° de série 2",
  "Prix d'achat",
];
const DetailsHeader = ["Nom", "Prénom", "Num de tel", "N° Carte", "Etat"];
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-GB");
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

// const Products = [
//     {
//         id:1,
//         Nom: "Hp",
//         date : formattedDate,
//         Nserie1 : 1444,
//         Nserie2 : 45477,
//         Pachat : 18000 ,
//         details: {
//         CostumerFirstName : "wahid",
//         CostumerFamilyName : "Slimani",
//         CostumerPhoneNumber : "0541129179",
//         CostumerCardId : "678946878",
//         CostumerIssue : "Achat",
//         }

//         },
// {
//     id:2,
//     Nom: "Hp",
//     date : formattedDate,
//     Nserie1 : 1444,
//     Nserie2 : 45477,
//     Pachat : 180000 ,
//     details: {
//     CostumerFirstName : "wahid",
//     CostumerFamilyName : "Slimani",
//     CostumerPhoneNumber : "0541129179",
//     CostumerCardId : "678946878",
//     CostumerIssue : "Achat",
//     }
//         },
// {
//  id:3,

//          Nom: "Hp",
//          date : formattedDate,
//          Nserie1 : 1444,
//          Nserie2 : 45477,
//          Pachat : 1548 ,
//          details: {
//          CostumerFirstName : "wahid",
//          CostumerFamilyName : "Slimani",
//          CostumerPhoneNumber : "0541129179",
//          CostumerCardId : "445566",
//          CostumerIssue : "Achat",
//          }
// },
//  {
// id:4,
// Nom: "Hp",
// date : formattedDate,
// Nserie1 : 1444,
// Nserie2 : 45477,
// Pachat : 1548 ,
// details: {
// CostumerFirstName : "wahid",
// CostumerFamilyName : "Slimani",
// CostumerPhoneNumber : "0541129179",
// CostumerCardId : "445566",
// CostumerIssue : "Achat",
// }
//   },
// {
// id:5,
// Nom: "Hp",
// date : formattedDate,
// Nserie1 : 1444,
// Nserie2 : 45477,
// Pachat : 1548 ,
// details: {
// CostumerFirstName : "wahid",
// CostumerFamilyName : "Slimani",
// CostumerPhoneNumber : "0541129179",
// CostumerCardId : "445566",
// CostumerIssue : "Achat",
// }
//  },

// ]

function SoldProductsTable() {
  const [expandedRows, setExpandedRows] = useState([]);
  const [AllTransactions, setAllTransactions] = useState([]);

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
        const res = await axios.get("http://localhost:8002/afficherAchat");
        console.log(res);
        setAllTransactions(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllTransactions();
  }, [expandedRows]);

  return (
    <>
      <Table>
        <thead>
          <HRow>
            {Header.map((item, Hindex) => (
              <HColumn
                key={-2 * Hindex - 1}
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
                key={Product.idClien}
                onClick={() => toggleRow(index)}
              >
                <Column>
                  {" "}
                  <Nom> {Product.nomAchat} </Nom>{" "}
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
                    {formattedDate}{" "}
                  </p>{" "}
                </Column>
                <Column>
                  {" "}
                  <Nserie style={{ color: "#0C2E5A" }}>
                    {Product.nmrSerie1}
                  </Nserie>{" "}
                </Column>
                <Column>
                  {" "}
                  <Nserie style={{ color: "#0C2E5A" }}>
                    {" "}
                    {Product.nmrSerie2}
                  </Nserie>{" "}
                </Column>
                <Column>
                  {" "}
                  <Pachat style={{ color: "#0C2E5A" }}>
                    {" "}
                    {Product.prixAchat}{" "}
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
                    style={{ border: "none", padding: "0px", margin: "0px" }}
                  >
                    <thead>
                      <HRow style={{ padding: "0px", margin: "-2px -6px" }}>
                        {DetailsHeader.map((item, Colindex) => (
                          <HColumn
                            key={Colindex * 2.718 + 3.14}
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
                        key={index * 1.12}
                      >
                        <DetailsColumn> said </DetailsColumn>
                        <DetailsColumn> islam</DetailsColumn>
                        <DetailsColumn> 05412928287 </DetailsColumn>
                        <DetailsColumn> 1173773773 </DetailsColumn>
                        <DetailsColumn
                          style={{
                            color: " #27A033",
                            textShadow: "1px 1px 1px skyblue",
                          }}
                        >
                          {" "}
                          Achats{" "}
                        </DetailsColumn>
                      </Row>
                      <Row
                        className="Row"
                        style={{ padding: "0px ", margin: "-2px -6px" }}
                        key={index}
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
                          <CostumerCard type="button">
                            <img height="44px" src={IdCardIcon} alt="CardId" />
                            <p style={{ fontSize: "24px", color: "#208FD0" }}>
                              Carte d'identité{" "}
                            </p>
                          </CostumerCard>
                          <ControlersContainer>
                            <DeleteButton type="button" value="Supprimer" />

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
    </>
  );
}

export default SoldProductsTable;
