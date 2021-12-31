import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import Tittle from "../Text/Tittle";
import Input from "./Input";

const FormSign = (props) => {
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

        <Input className="input" label="Email" />
        <Input className="input" label="Password" />

        <FormGroup className="form-group">
          <FormControlLabel control={<Checkbox />} label="Stay Logged In" />
        </FormGroup>
        <Button variant="contained" className="btn" text="Sign In" />
        <Button variant="outlined" className="btn" text="Sign Up " />
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
