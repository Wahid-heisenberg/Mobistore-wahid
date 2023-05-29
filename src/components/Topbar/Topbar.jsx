import React from 'react'
import { useState } from 'react';
import styled from "styled-components";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
const Container = styled.div `
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: row;
margin: 12px 0px;
background-color: white ;
position: relative;
`;

export const Title = styled.h1 `
font-style: normal;
font-weight: 600;
font-size: 40px;
line-height: 74px;
color: #0C2E5A;

`;

const IconsContainer = styled.div `
box-sizing: border-box;
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;

`;

const NotificationIconContainer = styled.button `
display: flex;
align-items: center;
border: none;
background-color: white;
justify-content: center;
height: 54px;
width: 54px;
border-radius: 100%;
&:hover {
   background-color: #F9F6F6;
   border: none;
   border-radius: 100%;

}
`;
const ProfileIconContainer = styled.div `
display: flex;
align-items: center;
justify-content: center;
height: 54px;
width: 54px;
border-radius: 100%;
margin-left: 10px;
&:hover {
   background-color:#F9F6F6;
   border: none;
   border-radius: 100%;
}

`;
const SettingsIconContainer = styled.div `
display: flex;
align-items: center;
justify-content: center;
height: 54px;
width: 54px;
border-radius: 100%;
&:hover {
   background-color: #F9F6F6;
   border: none;
   border-radius: 100%;

}
margin-left: 10px;
`;
const CloseIconContainer = styled.button`
display: flex;
border: none;
align-items: center;
justify-content: center;
align-self: baseline;
color: #555555;
background-color: white;
margin: 0px;
&:hover{
color:#FF7F11;
transition: 0.2s all linear;
}
`;

const NotificationsContainer = styled.div `
display: flex;
padding: 12px 16px 8px 16px;
flex-direction: column;
width: 50%;
height: 480px;
max-height: 550px;
overflow-y: scroll;
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #0C2E5A; 
}
position: absolute;
background-color: white;
color:  #0C2E5A;
right: 11%;
top: 100%;
z-index: 8;
border: 1px solid rgba(0, 0, 0, 0.13);
border-radius: 10px;
box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.25);

`;
const NotificationsTitle = styled.h2`
font-weight: 600;
font-size: 36px;
color:  #0C2E5A;
margin-bottom: 16px;
`;
const NotificationsSubTitle = styled.h3`
font-weight: 300;
font-size: 24px;
color:  #0C2E5A;
margin-bottom: 16px;
`;

const NotificationsBloc= styled.div`
`;
const NotificationsDay = styled.h3`
font-weight: 600;
font-size: 24px;
color:  #0C2E5A;
margin-bottom: 8px;
`;

const Notifications = styled.ul`
 list-style: circle inside ;
font-weight: 500;
font-size: 20px;
color: #0C2E5A;
&:last-child{
   border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}

`;
const NotificationsItem = styled.li`
display: flex;
align-items: left;
flex-direction: column;
cursor: pointer;
&:hover{
background-color:#f1f1f1 ;
}
`;
const NotificationsItemTop = styled.span`
display: flex;
align-items: center;
justify-content: space-between;
padding: 10px 0px;
border-top: 1px solid rgba(0, 0, 0, 0.25);
`;
const NotificationsItemBottom = styled.p`
font-weight: 300;
font-size: 15px;
padding: 0px 0px 10px 24px;
`;
const NotificationsText = styled.p`
  &::before {
    content: '';
    height: 10px;
    width: 10px;
    border-radius: 50%;
    color: #007FC9 ;
    background-color: #007FC9;
    display: inline-block; /* or display: block; */
    margin-right: 8px;
  }
`;
function Topbar(props) {

   let opecity ;
   props.state ==='desabled' ? opecity='0.5' : opecity='1';

     // State to manage the visibility of notifications div
  const [showNotifications, setShowNotifications] = useState(false);

  // Event handler for show notifications button
  const handleShowNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Event handler for hide notifications button
  const handleHideNotifications = () => {
    setShowNotifications(false);
  };
   

  return (
   <>
<Container >
<Title style={{opacity:`${opecity}` }}>{props.title}</Title>

<IconsContainer>
  
  <NotificationIconContainer onClick={handleShowNotifications}> 
  <Badge badgeContent={4} color="primary" overlap="circular">
<NotificationsOutlinedIcon style={ { fontSize:"44px" , opacity:`${opecity}`,color:'#0C2E5A'}}  />
</Badge>
  </NotificationIconContainer>

<ProfileIconContainer>
<Link exact='true'
 to='/Profile'
 title='Profile'
 style={ { textDecoration:'none',opacity:`${opecity}`,color:'#0C2E5A'}}>
<AccountCircleOutlinedIcon style={ { fontSize:"44px" }}/>
</Link>
</ProfileIconContainer>



<SettingsIconContainer>
<Link exact='true'
title='Settings'
 to='/Settings' 
style={ { textDecoration:'none',
opacity:`${opecity}`,
color:'#0C2E5A'}}>
<SettingsOutlinedIcon style={ { fontSize:"44px" }}/>
</Link>
</SettingsIconContainer>
</IconsContainer>
{showNotifications && 
<NotificationsContainer>
   <CloseIconContainer onClick={handleHideNotifications}>
      <CloseOutlinedIcon style={{fontSize:'36px'}}/>
   </CloseIconContainer>
   <NotificationsTitle>
      Notifications
   </NotificationsTitle>
   <NotificationsSubTitle>
      vous avez <span style={{color:'#27A033'}}>3 notifications</span> non lu
   </NotificationsSubTitle>
   <NotificationsBloc>
      <NotificationsDay>
      Aujourd’hui
      </NotificationsDay>
      <Notifications >
      <NotificationsItem>
      <NotificationsItemTop>
      <NotificationsText>Vous avez ajouter 3 Ventes  </NotificationsText>
      <ClearOutlinedIcon/>
      </NotificationsItemTop>
      <NotificationsItemBottom>
      45 - Transaction -2h
      </NotificationsItemBottom>

      </NotificationsItem>
      <NotificationsItem>
      <NotificationsItemTop>
      <NotificationsText>Vous avez ajouter 3 Ventes  </NotificationsText>
      <ClearOutlinedIcon/>
      </NotificationsItemTop>
      <NotificationsItemBottom>
      45 - Transaction -2h
      </NotificationsItemBottom>

      </NotificationsItem>

      <NotificationsItem>
      <NotificationsItemTop>
      <NotificationsText>Vous avez ajouter 3 Ventes  </NotificationsText>
      <ClearOutlinedIcon/>
      </NotificationsItemTop>
      <NotificationsItemBottom>
      45 - Transaction -2h
      </NotificationsItemBottom>

      </NotificationsItem>

      <NotificationsItem>
      <NotificationsItemTop>
      <NotificationsText>Vous avez ajouter 3 Ventes  </NotificationsText>
      <ClearOutlinedIcon/>
      </NotificationsItemTop>
      <NotificationsItemBottom>
      45 - Transaction -2h
      </NotificationsItemBottom>

      </NotificationsItem>

      </Notifications>

   </NotificationsBloc>
   
</NotificationsContainer>}



</Container>
   </>
  )
}

export default Topbar