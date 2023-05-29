import React from "react";
import styled from "styled-components";
import ProgressLine from "./ProgressLine";
const Container = styled.div`
  width: 92%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 14px 0px;
  row-gap: 36px;
  &:hover {
    transform: scale(1.01);
    transition: 0.4s ease-out;
  }
`;
const ProductTitle = styled.p`
  font-weight: 500;
  font-size: 36px;
`;
const ProductTitleContainer = styled.div`
  flex: 1;
  justify-self: flex-start;
`;
function LinearProgressBar(props) {
  let color = "D9D9D9";

  if (props.percentage <= 10) {
    color = "FF7F11";
  } else if (props.percentage <= 35) {
    color = "007FC9";
  } else {
    color = "70EE9C";
  }
  return (
    <>
      <Container>
        <ProductTitleContainer>
          <ProductTitle>{props.title}</ProductTitle>
        </ProductTitleContainer>
        <ProgressLine LineWidth={props.percentage} LineColor={color} />
      </Container>
    </>
  );
}

export default LinearProgressBar;
