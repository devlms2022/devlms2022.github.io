import { Password } from "@mui/icons-material";
import { Button, buttonClasses } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ButtonCustom from "../../components/Button/Button";
import Input from "../../components/Form/Input";
import Paper from "../../components/Paper";
import { Title } from "../../components/Text";

const ForgotPassword = () => {
  return (
    <WrapContent>
      <Title text={"Forgot Password"} />
      <Paper className="email">
        <h5>Enter your email first</h5>
        <Input name="email" className="input" label="Email" type="email" />
        <ButtonCustom variant="contained" className="btn" text="Next" />
        <ButtonCustom variant="outlined" className="btn" text="Back to Home" />
      </Paper>

      <Paper className="email">
        <h5>Enter your new password</h5>
        <Input
          name="nepassword"
          className="input"
          label="New Password"
          type="password"
        />
        <Input
          name="retypepassword"
          className="input"
          label="Re-type New Password"
          type="password"
        />
        <ButtonCustom variant="contained" className="btn" text="Submit" />
        <ButtonCustom variant="outlined" className="btn" text="Back to Home" />
      </Paper>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  h1 {
    text-align: center;
    margin-bottom: 60px;
  }

  .email {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 35px;
    width: 30vw;

    .input,
    .btn {
      width: 100%;
    }

    h5 {
      margin-bottom: 20px;
    }

    .input {
      margin-bottom: 25px;
    }

    .btn[text="next"],
    .btn[text="submit"] {
      margin-top: 50px;
      margin-bottom: 20px;
    }
  }
`;

export default ForgotPassword;
