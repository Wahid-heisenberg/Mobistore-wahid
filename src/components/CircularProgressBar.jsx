import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import {mobile} from '../responsive'
const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  &:hover {
    transform: scale(1.08);
    transition: 0.4s ease-out;
  }
  ${mobile({gap:'12px'})}
`;

const ProgressBarText = styled.p`
  font-weight: 600;
  font-size: 42px;
  ${mobile({fontSize:'28px'})}
`;

function CircularProgressBar(props) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < props.value) {
        setPercentage(percentage + 1);
      }
    }, 50);
  }, [percentage, props.value]);

  return (
    <>
      <ProgressBarContainer style={{ width: 200, textAlign: "center" }}>
        <CircularProgressbar
          strokeWidth={8}
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: `#${props.textcolor}`,
            pathColor: `#${props.textcolor}`,
            trailColor: "#0C2E5A",
            textAlign: "center",
          })}
        />
        <ProgressBarText style={{ color: `#${props.textcolor}` }}>
          {props.text}
        </ProgressBarText>
      </ProgressBarContainer>
    </>
  );
}
export default CircularProgressBar;
