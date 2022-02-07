import { ArrowBack } from "@mui/icons-material";
import { Divider, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import BoxCustom from "../Box";

const HeaderContent = (props) => {
  const { title, goBack, shownGoBack = true } = props;
  return (
    <>
      <Div {...props} direction="row" align="center">
        {shownGoBack && (
          <IconButton onClick={goBack} color="primary" size="small" className="button-back">
            <ArrowBack />
          </IconButton>
        )}
        <span>{title}</span>
      </Div>
      <Divider sx={{marginTop:'10px'}}  />
    </>
  );
};

export default HeaderContent;

const Div = styled(BoxCustom)`
  .button-back {
    margin-right: 10px;
  }
  span {
    font-size: 16px;
    font-weight: 500;
  }
`;
