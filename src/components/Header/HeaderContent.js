import { ArrowBack } from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import BoxCustom from "../Box";
import PropTypes from "prop-types";
import { Subtitle } from "../Text";

const HeaderContent = (props) => {
  const {
    title,
    goBack,
    shownGoBack = true,
    shownBtn = false,
    btnLabel,
    onClickButton,
  } = props;
  return (
    <>
      <Div
        {...props}
        direction="row"
        width="100%"
        justify="space-between"
        align="center"
      >
        <BoxCustom direction="row" align="center">
          {shownGoBack && (
            <IconButton
              onClick={goBack}
              color="primary"
              size="small"
              className="button-back"
            >
              <ArrowBack />
            </IconButton>
          )}
          <Subtitle>
            <span>{title}</span>
          </Subtitle>
        </BoxCustom>
        {shownBtn && (
          <Button variant="contained" color="primary" onClick={onClickButton}>
            {btnLabel}
          </Button>
        )}
      </Div>
      <Divider sx={{ marginTop: "10px" }} />
    </>
  );
};

export default HeaderContent;

HeaderContent.propTypes = {
  title: PropTypes.string,
  shownGoBack: PropTypes.bool,
  goBack: PropTypes.func,
  btnLabel: PropTypes.string,
  shownBtn: PropTypes.bool,
  onClickButton: PropTypes.func,
};

const Div = styled(BoxCustom)`
  .button-back {
    margin-right: 10px;
  }
  span {
    font-size: 14px;
    /* font-weight: 500; */
  }
`;
