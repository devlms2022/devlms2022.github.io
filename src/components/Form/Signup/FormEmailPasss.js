import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import React from "react";
import { Label } from "../../Text";
import Input from "../Input";
import { Styling as WrapContent } from "./index";

const FormEmailPass = (props) => {
  const { onChange } = props;
  return (
    <WrapContent>
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <Input
            className="form-control"
            onChange={onChange}
            label="Email"
            name="email"
          />
          <Input
            className="form-control"
            label="Password"
            name="password"
            type="password"
            onChange={onChange}
          />
          <Input
            onChange={onChange}
            className="form-control"
            label="Retype Password"
            name="repassword"
          />
        </Grid>
      </Grid>
      <FormGroup className="form-group">
        <FormControlLabel
          control={<Checkbox />}
          label="I’ve read and accept the Privacy Policy"
        />
        <Label>
          Your personal data will be used to support your experience throughout
          this webiste, to manage access to your account, and for other purposes
          described in our <span>privacy policy</span>
        </Label>
      </FormGroup>
    </WrapContent>
  );
};

export default FormEmailPass;
