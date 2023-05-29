import React from "react";
import styled from "styled-components";
import Left from "../components/Left";
import Restore from "../components/Restore";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  max-height: 100vh;
  min-height: 100vh;
`;
function ForgottenPassword() {
  return (
    <>
      <Container>
        <Left />
        <Restore />
      </Container>
    </>
  );
}

export default ForgottenPassword;
