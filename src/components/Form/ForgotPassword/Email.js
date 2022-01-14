import React from "react";
import styled from "styled-components";
import ButtonCustom from "../../Button/Button";
import Paper from "../../Paper";
import Input from "../Input";

const Email = ({
  tombolNext,
  tombolBack,
  handleChanger,
  errorEmail,
  helperTextEmail,
}) => {
  return (
    <FormEmail>
      <Paper className="email">
        <h5>Enter your email first</h5>
        <Input
          name="email"
          className="input"
          label="Email"
          type="email"
          onChange={handleChanger}
          error={errorEmail}
          helperText={helperTextEmail}
        />
        <ButtonCustom
          variant="contained"
          className="btn"
          text="Next"
          onClick={tombolNext}
        />
        <ButtonCustom
          variant="outlined"
          className="btn"
          text="Back to Home"
          onClick={tombolBack}
        />
      </Paper>
    </FormEmail>
  );
};

const FormEmail = styled.div`
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

    .btn[text="next"] {
      margin-top: 50px;
      margin-bottom: 20px;
    }
  }
`;

export default Email;
