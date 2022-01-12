import { Box, Container, Grid, Modal } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import styled from "styled-components";
import Swal from "sweetalert2";
// import ImageLogin from "../../assets/images/loginimage.png";
import ImageLogin from "./assets/images/loginimage.png";
import Appbar from "./components/Appbar";
import FormSign from "./components/Form/FormSign";
import HeaderLogin from "./components/Header/HeaderLogin";
import routes from "./routes";
import TokenService from "./services/token.services";

function App(props) {
  const [modalShown, setModalShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertShown, setShownAlert] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  // const [validation, setValidation] = useState(false);

  const validator = new SimpleReactValidator();

  const changHandler = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const SignupHandler = async () => {
    const history = useHistory();
    history.push("/signup");
  };

  const submitHandler = async (validation) => {
    if (validation) {
      const { REACT_APP_API_URL } = process.env;
      setIsloading(true);
      try {
        const response = await axios.post(`${REACT_APP_API_URL}/auth`, {
          email,
          password,
        });
        // console.log(response);
        if (response.status === 200) {
          if (response.data.success) {
            TokenService.setUser(response.data.data);
            setIsloading(false);
            Swal.fire({
              title: "Successfull!",
              text: "You are logged in",
              icon: "success",
              confirmButtonText: "Ok",
            }).then((confirm) => {});
          } else if (response.data.code === 100) {
            Swal.fire({
              title: "Login Failed!",
              text: response.data.message,
              icon: "error",
              confirmButtonText: "Ok",
            }).then((confirm) => {});
          }
        }
        setModalShown(false);
      } catch (error) {
        setIsloading(false);
        console.log(error);
      }
    }
  };

  let navigate = useHistory();

  const onOpenSignUp = () => {
    setModalShown(false);
    navigate.push("/signup");
  };

  return (
    <>
      <Appbar signinClicked={() => setModalShown(true)} />;
      <Container>
        <Switch>
          {routes.map((item, key) => {
            return (
              <Route
                path={`${item.path}`}
                component={item.component}
                key={key}
                exact={item.basePath}
              />
            );
          })}
        </Switch>
      </Container>
      <Modal
        open={modalShown}
        onClose={() => setModalShown(!modalShown)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxStyled>
          <HeaderLogin onClick={() => setModalShown(false)} />
          <Grid container spacing={2}>
            <Grid item sm={7}>
              <Box className="warplogo">
                <img src={ImageLogin} />
              </Box>
            </Grid>
            <Grid item sm={5}>
              <FormSign
                onSignin={(validation) => submitHandler(validation)}
                onChange={changHandler}
                alertShown={alertShown}
                validator={validator}
                data={{ email, password }}
                onSignup={(param) => setModalShown(!param)}
                onOpenSignUp={onOpenSignUp}
              />
            </Grid>
          </Grid>
        </BoxStyled>
      </Modal>
    </>
  );
}

const BoxStyled = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--background-light-color);
  width: 990px;
  padding: 0px 15px;
  border-radius: 5px;
  .warplogo {
    width: 100%;
    padding-top: 72px;
    text-align: center;
    img {
      width: 470;
    }
  }
`;

export default App;