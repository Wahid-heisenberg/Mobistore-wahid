import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import { Search } from '@mui/icons-material';
import { Link } from "react-router-dom";
import {useSearchContext } from '../../SearchContext';
const Container =  styled.div `
width: 100%;
flex-direction: column;
justify-content: flex-start; 
display: flex;
`;
export const SearchContainer = styled.div `
width: 588px;
height: 54px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;
padding: 8px 10px;
border: 2px solid #323434;
border-radius: 4px;
gap: 10px;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const SearchInput = styled.input  `
border: none;
display: flex;
align-items: center;
flex-direction: row;
position: relative;
width: 100%;
&:focus {
    outline: none;
}
&::placeholder{
  font-weight: 200;
font-size:  28px;
color: #323434;
opacity: 0.6;  
}
padding: 0px  12px  0px 0px;
font-size:  28px;
`;


export const TopButtonsContainer =  styled.div `
width: 100%;
display: flex;
margin: 20px 0px;
flex-direction: row;
align-items: center;
gap: 24px;
justify-content: space-between;

`;
export const Button = styled.button `
display: flex;
flex:1 ;
align-items: center;
justify-content: center;
border: 3px solid #A2CCF6;
border-radius: 6px;
color: #0C2E5A;
background-color: white;
height: 48px;
cursor: pointer;
&.activebtn {
    color: white;
    background-color: #007FC9;
    border: 3px solid #007FC9;
    transition: ease-in-out 0.3s;
  }

&:hover {
color:white;
background-color:#007FC9;
border: 3px solid #007FC9 ;
transition: ease-in-out 0.3s;
}
`;

const TopContainer = styled.div `
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 0px;

`;

export const BtnTitle = styled.h1 `
font-style: normal;
font-weight: 500;
font-size: 28px;
line-height: 59px;
display: flex;
align-items: center;
`;

export const AddButton = styled.button `
background: #27A033;
border-radius: 6px;
color: white;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
border: 3px solid white;
height: 100%;
padding: 0px 20px 0px 12px ;
cursor: pointer;
&:hover {
color:#27A033;
background-color:white;
border: 3px solid #27A033 ;
transition: ease-in-out 0.3s;
}


`;
const ButtonText = styled.h3 `
font-style: normal;
font-weight: 580;
font-size: 22px;
line-height: 58px;
display: flex;
align-items: center;
`;
export const Buttons = [
  {
    id : 1,
    title: "Tous",

},
// {
//   id : 2,
//   title: "PC",
// },
  // {
  //     id : 3,
  //     title: "Earpud",

  // },

  // {
  //     id : 4,
  //     title: "Tablette",

  // },
  {
      id : 5,
      title: "Telephone",

  },
]


const Showcase = (props) => {

  const [activeButton, setActiveButton] = useState('Tous');
  const { searchValue, updateSearchValue ,  searchCategory, updateSearchCategory } = useSearchContext();
  const handleClickButton = (item) => {
      setActiveButton(item);
    };
const showbuttons = props.showbuttons ? props.showbuttons  : '';
  return (
    <>
      <Container>
        <TopContainer>
          <SearchContainer>
            <Search style={{ fontSize: "32px" }} />
            <SearchInput
              type="search"
              placeholder="Entrez le numéro de série"
              value={searchValue}
              onChange={(e) => {
                updateSearchValue(e.target.value)
              }}
            />
          </SearchContainer>

          <Link
            style={{ textDecoration: "none" }}
            to={props.form}
            title={props.buttonTitle}
          >
            <AddButton className="PlusButton">
              <ButtonText>
                {" "}
                <span className="PlusIcon">+ </span> {props.buttonTitle}{" "}
              </ButtonText>
            </AddButton>
          </Link>
        </TopContainer>
        {!showbuttons && (
          <TopButtonsContainer>
            {Buttons.map((item) => (
              <Button
                key={item.id}
                value={searchCategory}
                onClick={() => {handleClickButton(item.title)
                  updateSearchCategory(item.title)
                }}
                className={
                  activeButton?.trim().toLowerCase() ===
                  item.title?.trim().toLowerCase()
                    ? "activebtn"
                    : ""
                }
              >
                <BtnTitle>{item.title}</BtnTitle>
              </Button>
            ))}
          </TopButtonsContainer>
        )}
      </Container>
    </>
  );
}

export default Showcase