import { Box, Grid } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import ImageLogin from "../../assets/images/loginimage.png";
import FormSign from "../../components/Form/FormSign";
class Login extends Component {
  render() {
    return (
      <Box sx={{ flexGrow: 1, flexDirection: "row" }}>
        <Grid container spacing={2}>
          <Grid item sm={7}>
            <WrapContianer>
              <img src={ImageLogin} />
            </WrapContianer>
          </Grid>
          <Grid item sm={5}>
            <FormSign />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

const WrapContianer = styled(Box)`
  width: 100%;
  padding-top : 72px;
  text-align : center;
  img {
    width : 470
  }
`;

export default Login;
