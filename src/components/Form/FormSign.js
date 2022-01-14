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
import ButtonLink from "../Button/ButtonLink";
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
    onClickForgotPassword,
  } = props;

  const [toSignUp, setToSignUp] = useState(false);

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
    let isValid = true;

    if (!values.email && !values.password) {
      setErrors({
        ...errors,
        email: "*Please Enter your email!",
        password: "*Please Enter your password!",
      });
      isValid = false;
    } else if (!values.email) {
      setErrors({
        ...errors,
        email: "*Please Enter your email!",
      });
      isValid = false;
    } else if (!values.password) {
      setErrors({
        ...errors,
        password: "*Please Enter your password!",
      });
      isValid = false;
    }

    onSignin(isValid);
    if (isValid) {
      setErrors({});
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
          onChange={(e) => {
            handlerChange(e);
            onChange(e);
          }}
          name="email"
          className="input"
          label="Email"
          error={errors.email ? true : false}
          type="email"
          helperText={errors.email ? errors.email : " "}
        />
        <Input
          onChange={(e) => {
            handlerChange(e);
            onChange(e);
          }}
          name="password"
          className="input"
          label="Password"
          type="password"
          helperText={errors.password ? errors.password : " "}
          error={errors.password ? true : false}
        />

        <FormGroup className="form-group">
          <FormControlLabel control={<Checkbox />} label="Stay Logged In" />
          <ButtonLink
            to={"/resetpassword"}
            text={"Forgot Password?"}
            onClick={onClickForgotPassword}
          />
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    a:hover {
      color: blue;
    }
  }
  .btn {
    margin-bottom: 15px;
  }
  .forgotpassword {
  }
`;

export default FormSign;
