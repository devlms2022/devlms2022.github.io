import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Label } from "../../Text";
import Input from "../Input";
import { Styling as WrapContent } from "./index";

const FormEmailPass = (props) => {
  const { onChange, errors } = props;
  return (
    <Content>
      <Box className="box">
        <WrapContent>
          <Grid spacing={2} container>
            <Grid item xs={12}>
              <Input
                className="form-control"
                onChange={onChange}
                label="Email"
                name="email"
                type="email"
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email : ""}
              />
              <Input
                className="form-control"
                label="Password"
                name="password"
                type="password"
                error={errors.password ? true : false}
                onChange={onChange}
                helperText={errors.password ? errors.password : ""}
              />
              <Input
                onChange={onChange}
                className="form-control"
                label="Retype Password"
                type="password"
                error={errors.repassword ? true : false}
                name="repassword"
                helperText={errors.repassword ? errors.repassword : ""}
              />
            </Grid>
          </Grid>
          <FormGroup className="form-group">
            <FormControlLabel
              control={<Checkbox />}
              label="I’ve read and accept the Privacy Policy"
            />
            <Label className="teks">
              Your personal data will be used to support your experience
              throughout this webiste, to manage access to your account, and for
              other purposes described in our <span>privacy policy</span>
            </Label>
          </FormGroup>
        </WrapContent>
      </Box>
    </Content>
  );
};

const Content = styled.div`
  margin-top: -20px;
  .box {
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 25px 50px rgba(129, 129, 129, 0.1);
    border-radius: 10px;
  }

  .form-group {
    margin-top: 10px;
  }

  .teks,
  span {
    font-size: 2vh;
  }
`;

export default FormEmailPass;
