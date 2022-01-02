import { Box, Container, Grid, Modal } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import styled from "styled-components";
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

  const submitHandler = async () => {
    const { REACT_APP_API_URL } = process.env;
    setIsloading(true);
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/auth`, {
        email,
        password,
      });
      if (response.status === 200 && response.data.success) {
        TokenService.setUser(response.data.data);
        setShownAlert(true);
        setIsloading(false);
        setTimeout(() => {
          setModalShown(false);
        }, 3000);
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
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
          <HeaderLogin />
          <Grid container spacing={2}>
            <Grid item sm={7}>
              <Box className="warplogo">
                <img src={ImageLogin} />
              </Box>
            </Grid>
            <Grid item sm={5}>
              <FormSign
                onSignin={submitHandler}
               
                onChange={changHandler}
                alertShown={alertShown}
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
