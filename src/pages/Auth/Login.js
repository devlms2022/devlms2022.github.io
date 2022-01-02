import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { Component } from "react";
import styled from "styled-components";
import ImageLogin from "../../assets/images/loginimage.png";
import FormSign from "../../components/Form/FormSign";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  changHandler = (event) => {
    // console.log(event.ta);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = async () => {
    const { REACT_APP_API_URL } = process.env;
    const { email, password } = this.state;
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/auth`, {
        email,
        password,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <Box sx={{ flexGrow: 1, flexDirection: "row" }}>
        <Grid container spacing={2}>
          <Grid item sm={7}>
            <WrapContianer>
              <img className="sdasd" src={ImageLogin} />
            </WrapContianer>
          </Grid>
          <Grid item sm={5}>
            <FormSign
              onSignin={this.submitHandler}
              onChange={this.changHandler}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

const WrapContianer = styled(Box)`
  width: 100%;
  padding-top: 72px;
  text-align: center;
  img {
    width: 470;
  }
`;

export default Login;
