import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import Input from "../Input";
import { Styling as WrapContent } from "./index";

const FormPersonalData = (props) => {
  const { onChange, errors, data, disabled, forDetail } = props;
 
  return (
    <WrapContent>
      <Input
        className="form-control"
        label="Burger Service Nummer"
        name="burger_service_nummer"
        type="number"
        inputProps={
          {readOnly : disabled ? (disabled.burger_service_nummer ? true : false) : forDetail ? true : false} 
        }
        onChange={onChange}
        error={errors ? (errors.burger_service_nummer ? true : false) : false}
        helperText={
          errors
            ? errors.burger_service_nummer
              ? errors.burger_service_nummer
              : ""
            : ""
        }
        value={data.burger_service_nummer ? data.burger_service_nummer : ""}
      />
      <Grid spacing={2} container>
        <Grid className="col" item xs={6}>
          <Input
            className="form-control"
            label="Family Name"
            name="family_name"
            helperText={
              errors ? (errors.family_name ? errors.family_name : "") : ""
            }
            onChange={(e) => {
              onChange(e);
            }}
            inputProps={{readOnly : disabled ? (disabled.family_name ? true : false) : forDetail ? true : false}}
            error={errors ? (errors.family_name ? true : false) : false}
            value={data.family_name ? data.family_name : ""}
          />
        </Grid>
        <Grid className="col" item xs={6}>
          <Input
            className="form-control"
            label="Front Name"
            name="front_name"
            onChange={onChange}
            helperText={
              errors ? (errors.front_name ? errors.front_name : "") : ""
            }
            error={errors ? (errors.front_name ? true : false) : false}
            value={data.front_name ? data.front_name : ""}
            inputProps={{readOnly : disabled ? (disabled.front_name ? true : false) : forDetail ? true : false}}
            // helperText={isFrontNameValid ? isFrontNameValid : " "}
          />
        </Grid>
        <Grid className="col" item xs={6}>
          <FormControl
            error={errors ? (errors.gender ? true : false) : false}
            sx={{ width: "100%" }}
          >
            <InputLabel>Gender</InputLabel>
            <Select
              onChange={onChange}
              autoWidth
              value={data.gender ? data.gender : ""}
              name="gender"
              label="Gender"
              inputProps={{readOnly : disabled ? (disabled.gender ? true : false) : forDetail ? true : false}}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>

            <FormHelperText>
              {errors ? (errors.gender ? errors.gender : "") : ""}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid className="col" item xs={6}>
          <Input
            id="birthday"
            type="date"
            className="form-control"
            label="Birthday"
            name="birthday"
            value={data.birthday ? data.birthday : ""}
            error={errors ? (errors.birthday ? true : false) : false}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={errors ? (errors.birthday ? errors.birthday : "") : ""}
            onChange={onChange}
            inputProps={{readOnly : disabled ? (disabled.birthday ? true : false) : forDetail ? true : false}}
          />
        </Grid>
        <Grid className="col" item xs={7}>
          <Input
            className="form-control"
            label="Address"
            name="address"
            multiline
            value={data.address ? data.address : ""}
            error={errors ? (errors.address ? true : false) : false}
            inputProps={{readOnly : disabled ? (disabled.address ? true : false) : forDetail ? true : false}}
            onChange={onChange}
            rows={4}
            helperText={errors ? (errors.address ? errors.address : "") : ""}
            // helperText={isAddressValid ? isAddressValid : " "}
          />
        </Grid>
        <Grid className="col" item xs={5}>
          <Input
            className="form-control"
            label="Postal Code"
            name="postal_code"
            onChange={onChange}
            error={errors ? (errors.postal_code ? true : false) : false}
            helperText={
              errors ? (errors.postal_code ? errors.postal_code : "") : ""
            }
            inputProps={{readOnly : disabled ? (disabled.postal_code ? true : false) : forDetail ? true : false}}
            value={data.postal_code ? data.postal_code : ""}
            // helperText={isPostalCodeValid ? isPostalCodeValid : " "}
          />
        </Grid>
      </Grid>
    </WrapContent>
  );
};

export default FormPersonalData;
