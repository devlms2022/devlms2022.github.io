import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import Input from "../Input";
import { Styling as WrapContent } from "./index";

const FormPersonalData = (props) => {
  const { onChange } = props;
  return (
    <WrapContent>
      <Input
        className="form-control"
        label="Burger Service Number"
        name="burger_serv_num"
        type="number"
        onChange={onChange}
      />
      <Grid spacing={2} container>
        <Grid className="col" className="col" item xs={6}>
          <Input
            className="form-control"
            label="Family Name"
            name="family_name"
            onChange={onChange}
          />
        </Grid>
        <Grid className="col" item xs={6}>
          <Input
            className="form-control"
            label="Front Name"
            name="front_name"
            onChange={onChange}
          />
        </Grid>
        <Grid className="col" item xs={6}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel>Genere</InputLabel>
            <Select
              onChange={onChange}
              autoWidth
              name="gener"
              label="Gener"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
          {/* <Input className="form-control" label="Gener" name="gener" /> */}
        </Grid>
        <Grid className="col" item xs={6}>
          <Input
            id="birthday"
            type="date"
            className="form-control"
            label="Birthday"
            name="birthday"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          />
        </Grid>
        <Grid className="col" item xs={7}>
          <Input
            className="form-control"
            label="Address"
            name="address"
            multiline
            onChange={onChange}
            rows={4}
          />
        </Grid>
        <Grid className="col" item xs={5}>
          <Input
            className="form-control"
            label="Postal Code"
            name="postal_code"
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </WrapContent>
  );
};

export default FormPersonalData;
