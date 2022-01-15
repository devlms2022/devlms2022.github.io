import React from "react";
import styled from "styled-components";

const Tittle = (props) => {
  let { color, children, variant = "normal" } = props;
  if (variant == "bold") {
    variant = 600;
  } else if (variant == "light") {
    variant = 300;
  } else {
    variant = 500;
  }
  return (
    <Typography6 variant={variant} {...props} color={color}>
      {children}
    </Typography6>
  );
};

const Typography6 = styled.h6`
  color: ${(props) =>
    props.color ? `var(${props.color})` : "var(--font-dark-color)"};
  font-weight: ${(props) => props.variant};
  font-size: 24px;
  span {
    font-weight: 600;
    font-size: 24px;
  }
`;

export default Tittle;
