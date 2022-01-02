import { Grid } from "@mui/material";
import React from "react";
import Input from "../Input";
import { Styling as WrapContent } from "./index";

const FormStudentPersonalData  = () => {
  return (
    <WrapContent>
      <Input
        className="form-control"
        label="Burger Service Number"
        name="burger_serv_num"
        type="number"
      />
      <Grid spacing={2} container>
        <Grid className="col" className="col" item xs={6}>
          <Input
            className="form-control"
            label="Family Name"
            name="family_name"
          />
        </Grid>
        <Grid className="col" item xs={6}>
          <Input className="form-control" label="Front Name" name="fron_name" />
        </Grid>
        <Grid className="col" item xs={7}>
          <Input
            className="form-control"
            label="Address"
            name="address"
            multiline
            rows={4}
          />
        </Grid>
        <Grid className="col" item xs={5}>
          <Input
            className="form-control"
            label="Postal Code"
            name="postal_code"
          />
        </Grid>
      </Grid>
    </WrapContent>
  );
};

export default FormStudentPersonalData; 
