import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Email from "../../components/Form/ForgotPassword/Email";
import NewPassword from "../../components/Form/ForgotPassword/NewPassword";
import { Title } from "../../components/Text";

const ForgotPassword = () => {
  const [next, setNext] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const redirect = useHistory();

  const handleChange = (param) => {
    let name = param.target.name;
    let value = param.target.value;

    setValues({
      ...values,
      [name]: value,
    });

    setErrors({});
  };

  const handleNext = () => {
    if (!values.email) {
      setErrors({
        ...errors,
        email: "Input your email",
      });
      setNext(false);
    } else {
      setNext(true);
    }

    if (next === true) {
      window.location.reload();
    }
  };

  const handleSubmit = () => {
    if (!(values.newpassword, values.retypepassword)) {
      setErrors({
        ...errors,
        newpassword: "input your new password",
        retypepassword: "Retype your new password",
      });
    } else if (!values.newpassword) {
      setErrors({
        ...errors,
        newpassword: "input your new password",
      });
    } else if (!values.retypepassword) {
      setErrors({
        ...errors,
        retypepassword: "Retype your new password",
      });
    } else if (values.newpassword !== values.retypepassword) {
      setErrors({
        ...errors,
        passwordnotsame:
          "Your new password is not the same with retype password, please input again your password",
        newpassword: "Password not match",
        retypepassword: "Password not match",
      });
    }
  };

  const handleBack = () => {
    redirect.push("/");
  };

  return (
    <WrapContent>
      <Title text={"Forgot Password"} />
      {next === true ? (
        <NewPassword
          tombolBack={handleBack}
          handleChanger={handleChange}
          errorNewPassword={errors.newpassword ? true : false}
          errorRetypePassword={errors.retypepassword ? true : false}
          helperTextNewPassword={errors.newpassword ? errors.newpassword : ""}
          helperTextRetypePassword={
            errors.retypepassword ? errors.retypepassword : ""
          }
          errorNotSame={errors.passwordnotsame ? true : false}
          notSame={errors.passwordnotsame ? errors.passwordnotsame : ""}
          onSubmit={handleSubmit}
        />
      ) : (
        <Email
          tombolNext={handleNext}
          tombolBack={handleBack}
          handleChanger={handleChange}
          errorEmail={errors.email ? true : false}
          helperTextEmail={errors.email ? errors.email : ""}
        />
      )}
    </WrapContent>
  );
};

const WrapContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h1 {
    text-align: center;
    margin-bottom: 40px;
  }
`;

export default ForgotPassword;
