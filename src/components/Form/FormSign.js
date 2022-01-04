import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Alert,
  AlertTitle,
} from "@mui/material";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Signup from "../../pages/Auth/Signup";
import utilities from "../../utils/utilities";
import Button from "../Button/Button";
import Tittle from "../Text/Tittle";
import Input from "./Input";

const FormSign = (props) => {
  const {
    onChange,
    onSignin,
    onSignup,
    data,
    alertShown,
    validator,
    onOpenSignUp,
    validation,
  } = props;

  const [toSignUp, setToSignUp] = useState(false);

  // const isEmailValid = validator.message("email", data.email, "required|email");

  // const isPasswordValid = validator.message(
  //   "password",
  //   data.password,
  //   "required"
  // );

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handlerChange = (param) => {
    let name = param.target.name;
    let value = param.target.value;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handlerSubmit = () => {
    console.log(values);
    if (!values.email) {
      setErrors({
        ...errors,
        email: "Tolong isikan emailnya",
      });
    }

    if (!values.password) {
      setErrors({
        ...errors,
        password: "Tolong isikan Password",
      });
    }

    if (utilities.objectLength(errors) === 0) {
      validation(true);
    } else {
      validation(false);
    }
  };

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
        {alertShown && (
          <Alert severity="success" onClose={() => {}}>
            Successfull Login!
          </Alert>
        )}

        <Input
          onChange={handlerChange}
          name="email"
          className="input"
          label="Email"
          error={errors.email ? true : false}
          type="email"
        />
        <Input
          onChange={handlerChange}
          name="password"
          className="input"
          label="Password"
          type="password"
          error={errors.password ? true : false}
        />

        <FormGroup className="form-group">
          <FormControlLabel control={<Checkbox />} label="Stay Logged In" />
        </FormGroup>
        <Button
          onClick={(e) => handlerSubmit(e)}
          variant="contained"
          className="btn"
          text="Sign In"
        />
        <Button
          variant="outlined"
          className="btn"
          text="Sign Up"
          onClick={onOpenSignUp}
        ></Button>
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
