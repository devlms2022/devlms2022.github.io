import { Container } from "@mui/material";
import React, { useState } from "react";
import { Title } from "../../components/Text";
import styledComponents from "styled-components";
import ImageLogin from "../../assets/images/loginimage.png";
import FormSign from "../../components/Form/FormSign";
import axios from "axios";
import TokenService from "../../services/token.services";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { Api } from "../../services/api";

const Signin = (props) => {
  const { signIn } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertShown, setShownAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changHandler = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submitHandler = async (validation) => {
    if (validation) {
      setIsLoading(!isLoading);
      try {
        const response = await Api.post(`/auth`, {
          email,
          password,
        });
        if (response.status === 200) {
          if (response.data.success) {
            TokenService.setUser(response.data.data);
            setIsLoading(isLoading);
            Swal.fire({
              title: "Successfull!",
              text: "You are logged in",
              icon: "success",
              confirmButtonText: "Ok",
            }).then((confirm) => {});
            signIn(response.data.data);
          } else if (response.data.code === 100) {
            Swal.fire({
              title: "Login Failed!",
              text: response.data.message,
              icon: "error",
              confirmButtonText: "Ok",
            }).then((confirm) => {});
          }
        }
      } catch (error) {
        setIsLoading(isLoading);
        console.log(error);
      }
    }
  };

  return (
    <SignIn>
      <FormSign
        onSignin={(validation) => submitHandler(validation)}
        onChange={changHandler}
        alertShown={alertShown}
        data={{ email, password }}
      />
      <div className="image">
        <img src={ImageLogin} />
      </div>
    </SignIn>
  );
};

export default Signin;

const SignIn = styledComponents.div`
margin-top: 30px;    
width: 100%;
  .image {
    z-index: -1;
    img {
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
  
  .form {
        background-color: #fff;
        z-index: 5;
          
    }
`;
