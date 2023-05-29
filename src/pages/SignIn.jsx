import React from "react";
import styled from "styled-components";
import Right from "../components/Right";
import Left from "../components/Left";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  max-height: 100vh;
  min-height: 100vh;
`;
const SignIn = () => {
  return (
    <>
      <Container>
        <Left />
        <Right />
      </Container>
    </>
  );
};

export default SignIn;
