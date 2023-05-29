import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
const Container = styled.div`
  width: 100%;
  height: 16px;
  background-color: #d9d9d9;
  justify-self: flex-end;
  flex: 4;
`;
const Line = styled.div`
  height: 100%;
`;

function ProgressLine(props) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < props.LineWidth) {
        setPercentage(percentage + 1);
      }
    }, 50);
  }, [percentage, props.LineWidth]);

  return (
    <>
      <Container>
        <Line
          style={{
            backgroundColor: `#${props.LineColor}`,
            width: `${percentage}%`,
          }}
        />
      </Container>
    </>
  );
}

export default ProgressLine;
