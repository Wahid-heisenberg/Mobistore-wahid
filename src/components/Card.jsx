import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  border: none;
  aspect-ratio: 100%/100%;
  background-color: white;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 100%;
  border: 2px solid #007fc9;
  border-radius: 15px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 80%;
  max-height: 80%;
  width: 80%;
  height: 80%;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 25px;
`;

const TitleText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #007fc9;
  width: 200px;
  border-radius: 4px;
  padding: 5px 0px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 28px;
  line-height: 33px;
  color: white;
`;

function Card(props) {
  return (
    <>
      <Container className="Card" onClick={props.onClick} catego>
        <ImageContainer className="CardImage">
          <Image src={props.image} alt="Cardimg" />
        </ImageContainer>
        <TitleContainer>
          <TitleText className="CardText">
            <Title>{props.number + " articles"}</Title>
          </TitleText>
        </TitleContainer>
      </Container>
    </>
  );
}

export default Card;
