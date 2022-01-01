import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Alert,
  AlertTitle,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button/Button";
import Tittle from "../Text/Tittle";
import Input from "./Input";

const FormSign = (props) => {
  const { onChange, onSignin, onSignup, alertShown } = props;

  return (
    <Wraplogin>
      <Box
        className="box"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tittle className="title" text="Sign In" />

        {alertShown && <Alert severity="success" onClose={() => {}}>Successfull Login!</Alert>}

        <Input
          onChange={onChange}
          name="email"
          className="input"
          label="Email"
        />
        <Input
          onChange={onChange}
          name="password"
          className="input"
          label="Password"
        />

        <FormGroup className="form-group">
          <FormControlLabel control={<Checkbox />} label="Stay Logged In" />
        </FormGroup>
        <Button
          onClick={onSignin}
          variant="contained"
          className="btn"
          text="Sign In"
        />
        <Button
          // onClick={onSignup}
        
          variant="outlined"
          className="btn"
          text="Sign Up"
          link="/signup"
        >
         
        </Button>
      </Box>
    </Wraplogin>
  );
};

const Wraplogin = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;

  justify-content: center;

  padding-bottom: 70px;

  .title {
    margin-bottom: 50px;
    width: 100%;
    text-align: center;
  }

  .input {
    margin-bottom: 30px;
    width: 300px;
  }

  .form-group {
    margin-bottom: 45px;
  }
  .btn {
    margin-bottom: 15px;
  }
`;

export default FormSign;
