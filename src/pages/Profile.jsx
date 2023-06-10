import { Right, Container } from "./Stock";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Header } from "./Stock";
import Topbar from "../components/Topbar/Topbar";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import logoImg from "../bglogo.png";
import axios from "axios";
import {mobile} from '../responsive.js'
const Title = styled.h1`
  align-self: baseline;
  color: #0c2e5a;
  font-weight: 500;
  font-size: 42px;
  ${mobile({ fontSize:'28px'})}
`;
const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 34px 24px 42px;
  gap: 88px;
  width: 100%;
  ${mobile({ flexDirection:'column',gap:'32px'})}
`;
const TopLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
`;
const TopRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  ${mobile({ gap:'12px'})}
`;
const ProfileImageContainer = styled.div`
  height: 220px;
aspect-ratio: 1/1;
  border-radius: 50%;
  border: 3px solid #007fc9;
`;
const ProfileImage = styled.img`
  height: 100%;
  width: 100%;
`;
const Controlers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
`;
const ModifyButton = styled.button`
  color: white;
  background-color: #007fc9;
  border: 3px solid #007fc9;
  display: flex;
  gap: 10px;
  padding: 5px 12px;
  font-size: 24px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: #007fc9;
    background-color: white;
    transition: 0.3s ease-out;
  }
`;
const DeleteButton = styled.button`
  color: #ff7f11;
  background-color: white;
  border: 3px solid #ff7f11;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 5px 12px;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #ff7f11;
    transition: 0.3s ease-out;
  }
`;

const Identifient = styled.span`
  font-weight: 600;
  font-size: 30px;
  ${mobile({ fontSize:'24px'})}
`;
const Information = styled.p`
  font-size: 30px;
  align-self: baseline;
  cursor: pointer;
  ${mobile({ fontSize:'24px'})}
`;
const Buttom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0px;
`;
const ButtomHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${mobile({ flexDirection:'column',gap:'16px'})}
`;
const AddWorkerButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 24px;
  color: white;
  background-color: #007fc9;
  padding: 5px 12px;
  cursor: pointer;
  border: 3px solid #007fc9;
  &:hover {
    color: #007fc9;
    background-color: white;
    transition: 0.3s ease-out;
  }
`;
const WorkersTableContainer = styled.div`
  width: 100%;
  padding: 24px 0px;
`;
const WorkersTable = styled.table`
  border: 2px solid #007fc9;
  box-sizing: border-box;
  width: 100%;
  margin: 4px 0px 20px 0px;
`;
const HRow = styled.tr`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
  border-bottom: 2px solid #007fc9;
`;
const Row = styled.tr`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
  }
  padding: 10px 0px;
  border-bottom: 2px solid #007fc9;
`;
const HColumn = styled.td`
  width: 100%;
  text-align: center;
  border-right: 2px solid #007fc9;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  padding: 4px 16px;
`;
const Column = styled.td`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 20px;
  color: #0c2e5a;
  padding: 8px 16px;
`;

function Profile() {
  const [Workers, setWorkers] = useState([]);
  useEffect(() => {
    const getAllWorkers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/worker/showWorkers");
        console.log(res);
        setWorkers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllWorkers();
  }, []);
  return (
    <>
      <Container>
        <Sidebar defaultPage="Profile" />
        <Right>
          <Header>
            <Topbar title="Profile" />
          </Header>
          <Title>Informations de Propriétaire</Title>
          <Top>
            <TopLeft>
              <ProfileImageContainer>
                <ProfileImage src={logoImg} alt="ProfileImg" />
              </ProfileImageContainer>
              <Controlers>
                <ModifyButton name="Modify">
                  {" "}
                  Modifier <EditIcon style={{ fontSize: "24px" }} />
                </ModifyButton>
                <DeleteButton name="Delete">
                  Supprimer <DeleteOutlineIcon style={{ fontSize: "24px" }} />
                </DeleteButton>
              </Controlers>
            </TopLeft>
            <TopRight>
              <Information>
                <Identifient>Nom: </Identifient>Boudina
              </Information>
              <Information>
                <Identifient>Prénom: </Identifient>Ali anis
              </Information>
              <Information>
                <Identifient>Lieu: </Identifient>Béjaia
              </Information>
              <Information>
                <Identifient>Numéro de télèphone: </Identifient>0770959466
              </Information>
              <Information>
                <Identifient> Email: </Identifient>mobistore@gmailcom
              </Information>
            </TopRight>
          </Top>
          <Buttom>
            <ButtomHeader>
              <Title>Information sur les Travailleurs</Title>
              <Link
                exact
                to="/AddWorkerForm"
                style={{ textDecoration: "none" }}
              >
                <AddWorkerButton>
                  <span style={{ fontSize: "32px" }}>+ </span>Ajouter un
                  Travailleur
                </AddWorkerButton>{" "}
              </Link>
            </ButtomHeader>
            <WorkersTableContainer>
              <WorkersTable>
                <thead>
                  <HRow>
                    <HColumn
                      style={{ maxWidth: "16%" }}
                      className="HeaderColumn"
                    >
                      Prénom
                    </HColumn>
                    <HColumn
                      style={{ maxWidth: "16%" }}
                      className="HeaderColumn"
                    >
                      Nom
                    </HColumn>
                    <HColumn className="HeaderColumn">Adresse email</HColumn>
                    <HColumn
                      style={{ maxWidth: "22%" }}
                      className="HeaderColumn"
                    >
                      Numéro de télèphone
                    </HColumn>
                    <HColumn
                      style={{ maxWidth: "12%" }}
                      className="HeaderColumn"
                    >
                      Horaires
                    </HColumn>
                    <HColumn style={{ maxWidth: "40px" }}></HColumn>
                    <HColumn style={{ maxWidth: "40px" }}></HColumn>
                  </HRow>
                </thead>
                <tbody>
                  {Workers.map((worker) => (
                    <Row className="Row" key={worker.id}>
                      <Column style={{ maxWidth: "16%" }}>
                        {" "}
                        {worker.firstName}{" "}
                      </Column>
                      <Column style={{ maxWidth: "16%" }}>
                        {" "}
                        {worker.familyName}{" "}
                      </Column>
                      <Column> {worker.email} </Column>
                      <Column style={{ maxWidth: "22%" }}>
                        {worker.phoneNumber}{" "}
                      </Column>
                      <Column style={{ maxWidth: "12%", color: "#219DFD" }}>
                        {" "}
                        {worker.workHoures}{" "}
                      </Column>
                      <Column style={{ maxWidth: "40px" }}>
                        <Link
                          style={{ textDecoration: "none", color: "#0C2E5A" }}
                        >
                          <EditIcon style={{ fontSize: "28px" }} />
                        </Link>
                      </Column>
                      <Column style={{ maxWidth: "40px" }}>
                        <button
                          style={{ border: "none", backgroundColor: "white" }}
                          name="Delete"
                        >
                          <DeleteOutlineIcon
                            style={{ fontSize: "28px", color: "#FF7F11" }}
                          />
                        </button>
                      </Column>
                    </Row>
                  ))}
                </tbody>
              </WorkersTable>
            </WorkersTableContainer>
          </Buttom>
        </Right>
      </Container>
    </>
  );
}

export default Profile;
