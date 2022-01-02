import React from "react";
import styled from "styled-components";

const Label = (props) => {
  const { color } = props;
  return (
    <LavbelStyled {...props} color={color}>
      {props.children}
    </LavbelStyled>
  );
};

const LavbelStyled = styled.label`
  color: ${(props) =>
    props.color ? `var(${props.color})` : "var(--font-dark-color)"};
  font-weight: 300;
  font-size: 12px;
  line-height: 143%;
  text-align : justify;
  span {
      font-size : 12px;
      font-weight : bold;
  }
`;

export default Label;
