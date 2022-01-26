import React from "react";
import styled from "styled-components";

const Paper = (props) => {
    const {className} = props;
  return <PaperStyled className={className} >{props.children}</PaperStyled>;
};

const PaperStyled = styled.div`
  box-shadow: 0px 25px 50px rgba(129, 129, 129, 0.1);
  border-radius: 10px;
`;

export default Paper;
