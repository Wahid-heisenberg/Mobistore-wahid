import React from "react";
import styled from "styled-components";
import myImage from "../assets/wahid proposition.png";
import Desktop from "../assets/Desktop - 43.png";
import motdepasseOublie from "../assets/wahid proposition - Copie.png";
import creation from "../assets/Desktop - 1.png";
import Transaction from "../assets/Desktop - 34.png";
import formTransaction from "../assets/echange.png";
import Stock from "../assets/Desktop - 40.png";
import TStock from "../assets/Desktop - 33.png";
import FStock from "../assets/STOCK (3).png";
import statistique from "../assets/Desktop - 16 (2).png";
import Historique from "../assets/Desktop - 18 (1).png";
import parametre from "../assets/Parametre.png";
import app from "../assets/Desktop - 4 (1).png";
import {mobile} from "../responsive.js"
const Titre = styled.h3`
  font-weight: 600;
  font-size: 42px;
  color: #007fc9;
  margin: 8px;
  align-self: baseline;
  ${mobile({ fontSize:"28px"})}
`;
const Pg = styled.p`
  margin: 8px;
  font-weight: 500;
  font-size: 28px;
  ${mobile({ fontSize:"24px"})}
`;
const Desc = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 3/1;
  padding: 16px 4px;

`;
const Img = styled.img`
  display: block;
  width: 80%;
  aspect-ratio: 2/1;
    ${mobile({ aspectRatio:"5/3",width:"100%"})}
`;
function GuideC() {
  return (
    <>
      <Titre>Introduction</Titre>
      <Desc>
        <Pg>
          L'application de gestion de stock vous permet de suivre les mouvements
          de vos produits en stock, ainsi que de gérer les entrées et sorties de
          stock. Ce guide vous aidera à comprendre comment utiliser
          l'application pour gérer votre stock de manière efficace.
        </Pg>
        <ImgContainer>
          <Img src={app} alt="app" />
        </ImgContainer>
      </Desc>
      <Titre>Authentification</Titre>
      <Desc>
        <Pg>
          C’est la première page qui sera affichée sur la fenêtre dès 'exécution
          de notre application. L’utilisateur peut se connecter a son compte en
          introduisant son nom d’utilisateur et son mot de passe puis en
          cliquant sur le bouton ”Se connecter”.
        </Pg>
        <ImgContainer>
          <Img src={myImage} alt="myImage" />
        </ImgContainer>
      </Desc>

      <Desc>
        <Pg>
          S’il existe une erreur commise par l’utilisateur lors de la saisie de
          ces informations, il va cliquer sur le bouton “mot de passe oublié”
          pour signaler.
        </Pg>
        <ImgContainer>
          <Img src={motdepasseOublie} alt="motdepasseOublie" />
        </ImgContainer>
      </Desc>

      <Desc>
        <Pg>
          si il veut créer un compte il va cliquer sur le bouton “créer un
          compte” et il va saisir son nom d’utilisateur et son mot de passe.
        </Pg>
        <ImgContainer>
          <Img src={creation} alt="creation" />
        </ImgContainer>
      </Desc>
      <Titre>L'acceuil</Titre>
      <Desc>
        <Pg>
          Après que le connexion soit faite,l’utilisateur sera introduit à une
          nouvelle page qui représente l’accueil de notre application. Peut-être
          accéder en cliquant sur le bouton ”Accueil” sur le menu à gauche de la
          fenêtre.
        </Pg>
        <ImgContainer>
          <Img src={Desktop} alt="Desktop" />
        </ImgContainer>
      </Desc>
      <Titre>Transaction</Titre>
      <Desc>
        <Pg>
          {" "}
          Peut-être accéder en cliquant sur le bouton ”Les achats” sur le menu
          `à gauche de la fenêtre (voir la figure III..11). Le but principal de
          la page est de consulter les achats et aussi d' ajouter des articles
          vendus .
        </Pg>
        <ImgContainer>
          <Img src={Transaction} alt="Transaction" />
        </ImgContainer>
      </Desc>
      <Desc>
        <Pg>
          Dans cette page l’utilisateur peut trier selon la catégorie de
          l'article ( soit en cliquant sur tout ou bien sur Ordinateur ,
          Tablette , Téléphone ) , et aussi y'avait une barre de recherche ,
          l’utilisateur peuvent chercher l’article selon le numéro de série .
          Bouton d'ajout d'un achat , lorsque l’utilisateur clique sur le bouton
          ajouter un achat , un formulaire d’achat doit s’ouvrir.{" "}
        </Pg>
        <ImgContainer>
          <Img src={formTransaction} alt="formTransaction" />
        </ImgContainer>
      </Desc>

      <Titre>Stock</Titre>

      <Desc>
        <Pg>
          Peut-être accéder en cliquant sur le bouton ”Stock” sur le menu à
          gauche de la fenêtre (voir la figure III..12). Le but principal de la
          page est de consulter le stock et aussi d' ajouter des articles
          stockés .
        </Pg>
        <ImgContainer>
          <Img src={Stock} alt="Stock" />
        </ImgContainer>
      </Desc>
      <Desc>
        <Pg>
          dans cette page l’utilisateur peut trier selon la catégorie de
          l'article ( soit en cliquant sur tout ou bien sur Ordinateur ,
          Tablette , Téléphone ), et aussi y’avais une barre de recherche
          l’utilisateur peuvent chercher l’article selon le nom de l’article ,
          lorsque l’utilisateur clique sur l’un des cartes d’un article , il va
          affiche un tableau des produits de l’article
        </Pg>
        <ImgContainer>
          {" "}
          <Img src={TStock} alt="TStock" />
        </ImgContainer>
      </Desc>
      <Desc>
        <Pg>
          l'utilisateur clique sur le bouton ajouter un produit il va recevoir
          un formulaire pour saisir les informations sur l'article
        </Pg>
        <ImgContainer>
          {" "}
          <Img src={FStock} alt="FStock" />{" "}
        </ImgContainer>
      </Desc>

      <Titre>Statistique</Titre>
      <Desc>
        <Pg>
          Peut-être accéder en cliquant sur le bouton ”Statistique” sur le menu
          à gauche de la fenêtre .
        </Pg>
        <ImgContainer>
          {" "}
          <Img src={statistique} alt="statistique" />{" "}
        </ImgContainer>
      </Desc>
      <Desc>
        <Pg>
          Le but principal de la page est de consulter les statistiques et de
          voir l’historique des achats et des échanges.
        </Pg>
        <ImgContainer>
          {" "}
          <Img src={Historique} alt="Historique" />{" "}
        </ImgContainer>
      </Desc>
      <Desc>
        <Pg>
          Peut-être accéder en cliquant sur l'icone ”Paramétré”. Le but
          principal de la page est de modifier les coordonnées de l'utilisateur
          .
        </Pg>
        <ImgContainer>
          {" "}
          <Img src={parametre} alt="parametre" />{" "}
        </ImgContainer>
      </Desc>
    </>
  );
}

export default GuideC;
