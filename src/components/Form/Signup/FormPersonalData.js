import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import Input from "../Input";
import { Styling as WrapContent } from "./index";

const FormPersonalData = (props) => {
  const { onChange, errors, data } = props;

  console.log(errors);

  return (
    <WrapContent>
      <Input
        className="form-control"
        label="Burger Service Nummer"
        name="burger_service_nummer"
        type="number"
        value={data.burger_service_nummer}
        onChange={onChange}
        error={errors.burger_service_nummer ? true : false}
        helperText={
          errors.burger_service_nummer ? errors.burger_service_nummer : " "
        }
        // helperText={isBurgerServiceValid ? isBurgerServiceValid : " "}
      />
      <Grid spacing={2} container>
        <Grid className="col" className="col" item xs={6}>
          <Input
            className="form-control"
            label="Family Name"
            name="family_name"
            value={data.family_name}
            helperText={errors.family_name ? errors.family_name : " "}
            onChange={(e) => {
              onChange(e);
            }}
            error={errors.family_name ? true : false}
            // helperText={isFamilyNameValid ? isFamilyNameValid : " "}
          />
        </Grid>
        <Grid className="col" item xs={6}>
          <Input
            className="form-control"
            label="Front Name"
            name="front_name"
            value={data.front_name}
            onChange={onChange}
            helperText={errors.front_name ? errors.front_name : " "}
            error={errors.front_name ? true : false}
            // helperText={isFrontNameValid ? isFrontNameValid : " "}
          />
        </Grid>
        <Grid className="col" item xs={6}>
          <FormControl  error={errors.gender ? true : false} sx={{ width: "100%" }}>
            <InputLabel>Gender</InputLabel>
            <Select
              onChange={onChange}
              autoWidth
              value={data.genere}
              name="gender"
              label="Gender"
              defaultValue=""
             
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
            
            <FormHelperText>{errors.gender ? errors.gender : ''}</FormHelperText>
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
            value={data.birthday}
            error={errors.birthday ? true : false}
            InputLabelProps={{
              shrink: true,
            }}
            // helperText={isBirthDayValid ? isBirthDayValid : " "}
            helperText={errors.birthday ? errors.birthday : " "}
            onChange={onChange}
          />
        </Grid>
        <Grid className="col" item xs={7}>
          <Input
            className="form-control"
            label="Address"
            name="address"
            multiline
            value={data.address}
            error={errors.address ? true : false}
            onChange={onChange}
            rows={4}
            helperText={errors.address ? errors.address : " "}
            // helperText={isAddressValid ? isAddressValid : " "}
          />
        </Grid>
        <Grid className="col" item xs={5}>
          <Input
            className="form-control"
            label="Postal Code"
            name="postal_code"
            value={data.postal_code}
            onChange={onChange}
            error={errors.postal_code ? true : false}
            helperText={errors.postal_code ? errors.postal_code : " "}
            // helperText={isPostalCodeValid ? isPostalCodeValid : " "}
          />
        </Grid>
      </Grid>
    </WrapContent>
  );
};

export default FormPersonalData;
