import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Email from "../../components/Form/ForgotPassword/Email";
import NewPassword from "../../components/Form/ForgotPassword/NewPassword";
import { Title } from "../../components/Text";
import { Api } from "../../services/api";
import Alert from "@mui/material/Alert";
import QueryString from "query-string";
import Swal from "sweetalert2";
import { Button, Paper } from "@mui/material";
import ButtonCustom from "../../components/Button/Button";

const ForgotPassword = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [flashAlert, setFlashAlert] = useState(false);
  // const param = useParams();

  const param = QueryString.parse(window.location.search);

  console.log(param);

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

  const getEmail = async () => {
    const response = await Api.post("/forgotpwd", {
      email: values.email,
      url: window.location.href,
    });

    console.log(response);

    if (response.data.code === 200 && response.status === 200) {
      setFlashAlert(true);
    }
  };

  const resetPassword = async () => {
    const response = await Api.post("/resetpwd", {
      encEmail: param.email,
      password: values.newpassword,
    });

    console.log(response, values.newpassword);
    if (response.status === 200 && response.data.code === 200) {
      Swal.fire({
        title: "Success!",
        text: "Your password has been new created!",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((confirm) => {
        if (confirm.isConfirmed) {
          redirect.push("/");
        }
      });
    }
  };

  let isValid = true;
  const handleNext = () => {
    let cekEmail = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

    if (!values.email) {
      setErrors({
        ...errors,
        email: "Input your email",
      });
      isValid = false;
    } else if (!cekEmail.test(values.email)) {
      setErrors({
        ...errors,
        email: "Your email is not correct, please input your email right",
      });
      isValid = false;
    }

    if (isValid === true) {
      getEmail();
      setValues({});
    }
  };

  const handleSubmit = () => {
    if (!(values.newpassword, values.retypepassword)) {
      setErrors({
        ...errors,
        newpassword: "input your new password",
        retypepassword: "Retype your new password",
      });
      isValid = false;
    } else if (!values.newpassword) {
      setErrors({
        ...errors,
        newpassword: "input your new password",
      });
      isValid = false;
    } else if (!values.retypepassword) {
      setErrors({
        ...errors,
        retypepassword: "Retype your new password",
      });
      isValid = false;
    } else if (values.newpassword !== values.retypepassword) {
      setErrors({
        ...errors,
        passwordnotsame:
          "Your new password is not the same with retype password, please input again your password",
        newpassword: "Password not match",
        retypepassword: "Password not match",
      });
      isValid = false;
    }

    resetPassword();
  };

  const handleBack = () => {
    redirect.push("/");
  };

  return (
    <WrapContent>
      <Title text={"Forgot Password"} />
      {flashAlert === true ? (
        <Alert severity="success">
          This is a success alert — check it out!
        </Alert>
      ) : null}
      {param.email ? (
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
      ) : flashAlert === false ? (
        <Email
          tombolNext={handleNext}
          tombolBack={handleBack}
          handleChanger={handleChange}
          valueEmail={values.email ? values.email : ""}
          errorEmail={errors.email ? true : false}
          helperTextEmail={errors.email ? errors.email : ""}
        />
      ) : (
        <Paper className="btn">
          <ButtonCustom
            variant="outlined"
            text="Back to Home"
            onClick={handleBack}
          />
        </Paper>
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

  .btn {
    margin-top: 20px;
  }
`;

export default ForgotPassword;
