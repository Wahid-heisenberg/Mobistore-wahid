import React from "react";
import RightUp from "../components/RightUp";
import styled from "styled-components";
import Left from "../components/Left";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  max-height: 100vh;
  min-height: 100vh;
`;
function SignUp() {
  return (
    <>
      <Container>
        <Left />
        <RightUp />
      </Container>
    </>
  );
}

export default SignUp;
