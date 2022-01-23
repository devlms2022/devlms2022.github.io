import React from "react";
import styled from "styled-components";

const Paper = (props) => {
    const {className} = props;
  return <PaperStyled className={className} >{props.children}</PaperStyled>;
};

const PaperStyled = styled.div`
  box-shadow: 0px 0px 12px 9px rgba(0,0,0,0.18);
  border-radius: 10px;
`;

export default Paper;
