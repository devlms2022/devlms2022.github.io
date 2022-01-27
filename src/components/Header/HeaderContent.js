import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import BoxCustom from "../Box";
import { Subtitle } from "../Text";

const HeaderContent = (props) => {
  const { title, goBack, shownGoBack = true } = props;
  return (
    <Div {...props} direction="row" align="center">
      {shownGoBack && (
        <IconButton onClick={goBack} color="primary" className="button-back">
          <ArrowBack />
        </IconButton>
      )}
      <span>{title}</span>
    </Div>
  );
};

export default HeaderContent;

const Div = styled(BoxCustom)`
  .button-back {
    margin-right: 10px;
  }
  span {
    font-size : 18px;
    font-weight : 500;
  }
`;
