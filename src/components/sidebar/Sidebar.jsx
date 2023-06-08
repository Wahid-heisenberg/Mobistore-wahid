import React from "react";
import styled from "styled-components";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";
import "./sidebar.css";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LogoImg from "../../bglogo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import {mobile} from '../../responsive'
const OuterContainer= styled.div`
  position: relative;
  top: 0;
  left: 0;
  min-width: ${({ isOpen }) => (isOpen ? "22%" : "0%")};
  max-width: ${({ isOpen }) => (isOpen ? "22%" : "0%")};
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
  transition: transform 0.6s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(-100%)")};
  ${mobile({ overflowY:'scroll'})}
`;
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
width: 100%;
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
  z-index: 15;
  ${mobile({ overflowY:'scroll',overflowX:'hidden'})}

`;
const SideBarOpen = styled.button`
  position: absolute;
  top: 10px;
  left: 4px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 6;
  color: #007fc9;
`;

const SideBarClose = styled.button`
position: absolute;
top: 10px;
left: 16px;
background-color: transparent;
border: 2px solid #007fc9;
border-radius: 50%;
background-color: white;
cursor: pointer;
z-index: 18;
padding: 4px;
color: #007fc9;
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
  justify-content: center;
  background: transparent;
  flex-direction: row;
  z-index: 5;
  gap: 8%;
  padding: 0px 5%;
  ${mobile({ flexDirection:'column',gap:'10px'})}
`;
const Yes = styled.button`
  width: 50%;
  display: flex;
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
  ${mobile({ width:'100%',fontSize:'16px'})}

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
  ${mobile({ width:'100%',fontSize:'16px'})}
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
width: 40%;
aspect-ratio: 1/1;
  border-radius: 100%;
  background-color: white;
  margin-top: 30px;
  ${mobile({ width:'80%',marginTop:'52px'})}
`;
const Logo = styled.img`
  width: 85%;
aspect-ratio: 1/1;
`;

const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
text-align: center;
  margin: 20px 0px 8px 0px;
  color: #a2ccf6;
  ${mobile({ fontSize:'28px'})}
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

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  return (
    <>
{   !isOpen &&     <SideBarOpen onClick={toggleSidebar}>
       <MenuOutlinedIcon style={ { fontSize:"42px" }}/>
      </SideBarOpen> }
    <OuterContainer isOpen={isOpen}>
    <SideBarClose onClick={toggleSidebar}>
        <CloseOutlinedIcon  style={ { fontSize:"32px" }}/>
      </SideBarClose>

      <Container >

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
                  window.location.reload();
                }}
              >
                {" "}
                Continuer
              </Yes>
            </Dialog>
          )}
        </Buttom>
      </Container>
      </OuterContainer>

    </>
  );
}

export default Sidebar;
