import React from "react";
import styled from "styled-components";
import ButtonCustom from "../../Button/Button";
import Paper from "../../Paper";
import Input from "../Input";

const NewPassword = ({
  tombolBack,
  handleChanger,
  errorNewPassword,
  errorRetypePassword,
  helperTextNewPassword,
  helperTextRetypePassword,
  onSubmit,
  errorNotSame,
  notSame,
}) => {
  return (
    <FormNewPassword>
      <Paper className="password">
        <h5>Enter your new password</h5>
        <Input
          name="newpassword"
          className="input"
          label="New Password"
          type="password"
          error={errorNewPassword}
          helperText={helperTextNewPassword}
          onChange={handleChanger}
        />
        <Input
          name="retypepassword"
          className="input"
          label="Re-type New Password"
          type="password"
          error={errorRetypePassword}
          helperText={helperTextRetypePassword}
          onChange={handleChanger}
        />
        <ButtonCustom
          variant="contained"
          className="btn"
          text="Submit"
          onClick={onSubmit}
        />
        <ButtonCustom
          variant="outlined"
          className="btn"
          text="Back to Home"
          onClick={tombolBack}
        />
      </Paper>
    </FormNewPassword>
  );
};

const FormNewPassword = styled.div`
  .password {
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

    .btn[text="submit"] {
      margin-top: 30px;
      margin-bottom: 20px;
    }
  }
`;

export default NewPassword;
