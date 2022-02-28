import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonLink = (props) => {
  const { text, to, height, className, isActive = false, onClick } = props;

  return (
    <ButtonStyled
      onClick={onClick}
      isactive={isActive.toString()}
      className={className}
      to={to}
    >
      {text ? text : props.children}
      {isActive && <span className="activenav"></span>}
    </ButtonStyled>
  );
};

const ButtonStyled = styled(Link)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* align-items: center; */
  &:hover {
    color: var(--primary-color);
    cursor: pointer;
  }

  height: ${(props) => (props.height ? props.height : "42px")};
  color: ${(props) =>
    props.isactive === "true" ? `var(--primary-color)` : "var(--dark-color)"};

  .activenav {
    height: 2.1px;
    width: 100%;
    background-color: var(--primary-color);
  }
`;

export default ButtonLink;
