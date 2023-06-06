import React from "react";
import styled from "styled-components";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";
import "./sidebar.css";
import LogoImg from "../../bglogo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  position: static;
  top: 0;
  left: 0;
  min-width: 22%;
  min-height: 100%;
  max-height: 100%;
  overflow-y: hidden;
  padding: 4px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: #0c2e5a;
  color: #a2ccf6;
  z-index: 1;
`;
const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: center;
  background: #0c2e5a;
`;

const Dialog = styled.div`
  width: 100%;
  display: flex;
  margin: 0px auto;
  align-items: center;
  align-items: center;
  justify-content: center;
  background: transparent;
  flex-direction: row;
  z-index: 5;
  gap: 8%;
  padding: 0px 5%;
`;
const Yes = styled.button`
  width: 50%;
  display: flex;
  align-items: center;
  font-size: 24px;
  padding: 8px;
  align-items: center;
  justify-content: center;
  border: none;
  z-index: 5;
  color: #70ee9c;
  border: 3px solid #70ee9c;
  border-radius: 8px;
  background: none;
`;
const No = styled.button`
  width: 50%;
  display: flex;
  align-items: center;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  padding: 8px 16px;
  border: none;
  z-index: 5;
  color: #ffffff;
  border: 3px solid #ffffff;
  border-radius: 8px;
  background: none;
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavlinksContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 138.42px;
  height: 146.95px;
  border-radius: 100%;
  background-color: white;
  margin-top: 30px;
`;
const Logo = styled.img`
  width: 85%;
  height: 85%;
`;

const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  margin: 20px 0px 8px 0px;
  color: #a2ccf6;
`;

const Buttom = styled.div`
  margin-bottom: 12px;
  width: 100%;
`;
const NavlinksArray = [
  {
    id: 1,
    icon: <HomeOutlinedIcon style={{ fontSize: "34px" }} />,
    title: "Acceuil",
  },
  {
    id: 2,
    icon: <StoreOutlinedIcon style={{ fontSize: "34px" }} />,
    title: "Transactions",
  },
  {
    id: 3,
    icon: <Inventory2OutlinedIcon style={{ fontSize: "34px" }} />,
    title: "Stock",
  },
  {
    id: 4,
    icon: <BarChartOutlinedIcon style={{ fontSize: "34px" }} />,
    title: "Statistiques",
  },
  {
    id: 5,
    icon: <ArticleIcon style={{ fontSize: "34px" }} />,
    title: "Guide",
  },
];

function Sidebar(props) {
  const defaultPage = props.defaultPage ? props.defaultPage : "Acceuil";
  const [activeItem, setActiveItem] = useState(defaultPage);
  const [showDialog, setShowDialog] = useState(false);
  const handleClick = (item) => {
    setActiveItem(item.title);
  };
  console.log(activeItem);

  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Top>
          <Circle>
            <Logo src={LogoImg} alt="logo" />
          </Circle>
          <Title>Mobi store</Title>
          <NavlinksContainer>
            {NavlinksArray.map((item) => (
              <li key={item.title} style={{ width: "100%" }}>
                <Link
                  to={`/${item.title}`}
                  onClick={() => handleClick(item)}
                  className={
                    activeItem === item.title
                      ? "active LinkContainer Link"
                      : "LinkContainer Link"
                  }
                >
                  <IconContainer className="icon">{item.icon}</IconContainer>

                  <span className="title">{item.title}</span>
                </Link>
              </li>
            ))}
          </NavlinksContainer>
        </Top>

        <Buttom>
          {!showDialog && (
            <Link
              key="55"
              onClick={() => {
                handleClick("Déconnexion");
                setShowDialog(!showDialog);
              }}
              className={
                activeItem === "Déconnexion"
                  ? "active LinkContainer Link"
                  : "LinkContainer Link"
              }
            >
              <IconContainer>
                <LogoutIcon style={{ fontSize: "34px" }} />
              </IconContainer>

              <span className="title">Déconnexion</span>
            </Link>
          )}

          {showDialog && (
            <Dialog>
              <No
                onClick={() => {
                  setShowDialog(false);
                }}
              >
                Annuler
              </No>
              <Yes
                onClick={() => {
                  // Remove an item from localStorage
                  localStorage.removeItem("token");

                  navigate("/SignIn");
                }}
              >
                {" "}
                Continuer
              </Yes>
            </Dialog>
          )}
        </Buttom>
      </Container>
    </>
  );
}

export default Sidebar;
