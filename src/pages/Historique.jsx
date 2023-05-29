import React from "react";
import styled from "styled-components";
import { Right, Container, Header } from "./Stock";
import Topbar from "../components/Topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SearchContainer, SearchInput } from "../components/Showcase/Showcase";
import { Search } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";
const Box = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: 1px solid #000000;
  margin: 16px;
`;
const Date = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px 30px;
  font-weight: 500;
  font-size: 32px;
  color: #0c2e5a;
  border-bottom: 1px solid #000000;
`;
const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 30px;
  font-weight: 400;
  font-size: 24px;
`;
const Label = styled.label`
  width: 100%;
  display: flex;
  flex-direction: row;
  font-weight: 400;
  font-size: 24px;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  font-weight: 400;
  font-size: 24px;
`;
const Column = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  font-weight: 400;
  font-size: 24px;
`;
const CheckBox = styled.input`
  width: 24px;
  height: 24px;
  align-self: center;
  margin-right: 24px;
`;
const Title = styled.div`
  align-self: baseline;
  display: flex;
  align-items: center;
  margin: 12px;
  font-weight: 500;
  font-size: 36px;
  color: #007fc9;
`;
const DeleteButton = styled.button`
  background: white;
  border-radius: 2px;
  color: #ff7f11;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  border: 3px solid #ff7f11;
  height: 100%;
  margin-right: 12px;
  padding: 0px 12px;
  font-weight: 580;
  font-size: 24px;
  &:hover {
    color: white;
    background-color: #ff7f11;
    border: 3px solid #ff7f11;
    transition: ease-in-out 0.3s;
  }
`;
const HeaderBottom = styled.div`
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const boxes = [
  {
    label: "Aujourd’hui",
    date: "samedi 1 avril 2023",
    rows: [
      {
        row1: {
          time: "10:00",
          article: "Iphone 14",
          price: "120000",
          transaction: "échange",
        },
      },
      {
        row2: {
          time: "09:30",
          article: "Samsung 5G",
          price: "140000",
          transaction: "échange",
        },
      },
      {
        row3: {
          time: "08:40",
          article: "Iphone 11",
          price: "130000",
          transaction: "échange",
        },
      },
      {
        row4: {
          time: "10:00",
          article: "Iphone 13",
          price: "140000",
          transaction: "échange",
        },
      },
    ],
  },
  {
    label: "Hier",
    date: "vendredi 1 avril 2023",
    rows: [
      {
        row1: {
          time: "10:00",
          article: "Iphone 14",
          price: "120000",
          transaction: "échange",
        },
      },
      {
        row2: {
          time: "10:00",
          article: "Iphone 14",
          price: "120000",
          transaction: "échange",
        },
      },
      {
        row3: {
          time: "10:00",
          article: "Iphone 14",
          price: "120000",
          transaction: "échange",
        },
      },
    ],
  },
  {
    label: "Avant hier",
    date: "jeudi 1 avril 2023",
    rows: [
      {
        row1: {
          time: "10:00",
          article: "Iphone 14",
          price: "1255555",
          transaction: "échange",
        },
      },
      {
        row2: {
          time: "10:00",
          article: "Iphone 14",
          price: "1255555",
          transaction: "échange",
        },
      },
    ],
  },
];

function Historique() {
  return (
    <>
      <Container>
        <Sidebar defaultPage="Historique" />
        <Right>
          <Header style={{ paddingBottom: "16px" }}>
            <Topbar title="Historique" />
            <HeaderBottom>
              <SearchContainer>
                <Search style={{ fontSize: "28px" }} />
                <SearchInput
                  type="search"
                  placeholder="Rechercher un article"
                />
              </SearchContainer>
              <DeleteButton>
                <DeleteOutlineIcon style={{ fontSize: "30px" }} /> Effacer l
                historique
              </DeleteButton>
            </HeaderBottom>
          </Header>
          <Title>
            <SegmentOutlinedIcon style={{ fontSize: "42px" }} />{" "}
            <span>Listes</span>
          </Title>

          {boxes.map((box, index) => (
            <Box key={index}>
              <Date>
                <span> {box.label} </span> - {box.date}
              </Date>
              <Details>
                {box.rows.map((row, index) => (
                  // Access the property value using Object.values() and index
                  <Row key={index}>
                    <CheckBox
                      type="checkbox"
                      id={index}
                      name={index}
                      value={index}
                    />
                    <Label htmlFor={index}>
                      <Column
                        style={{
                          maxWidth: "18%",
                          justifyContent: "flex-start",
                        }}
                      >
                        {row[Object.keys(row)[0]].time}
                      </Column>
                      <Column style={{ minWidth: "25%" }}>
                        {row[Object.keys(row)[0]].article}
                      </Column>
                      <Column style={{ minWidth: "25%" }}>
                        {row[Object.keys(row)[0]].price}
                      </Column>
                      <Column style={{ maxWidth: "20%" }}>
                        {row[Object.keys(row)[0]].transaction}
                      </Column>
                    </Label>
                    <MoreVertIcon style={{ fontSize: "30px" }} />
                  </Row>
                ))}
              </Details>
            </Box>
          ))}
        </Right>
      </Container>
    </>
  );
}

export default Historique;
