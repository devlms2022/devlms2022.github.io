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
  const { onChange, errors, data, disabled } = props;

  return (
    <WrapContent>
      <Input
        className="form-control"
        label="Burger Service Nummer"
        name="burger_service_nummer"
        type="number"
        disabled={
          disabled ? (disabled.burger_service_nummer ? true : false) : false
        }
        onChange={onChange}
        error={errors.burger_service_nummer ? true : false}
        helperText={
          errors.burger_service_nummer ? errors.burger_service_nummer : " "
        }
        value={
          data.burger_service_nummer ? data.burger_service_nummer : ""
        }
      />
      <Grid spacing={2} container>
        <Grid className="col" item xs={6}>
          <Input
            className="form-control"
            label="Family Name"
            name="family_name"
            helperText={errors.family_name ? errors.family_name : " "}
            onChange={(e) => {
              onChange(e);
            }}
            error={errors.family_name ? true : false}
            value={data.family_name ? data.family_name : ""}
          />
        </Grid>
        <Grid className="col" item xs={6}>
          <Input
            className="form-control"
            label="Front Name"
            name="front_name"
            onChange={onChange}
            helperText={errors.front_name ? errors.front_name : " "}
            error={errors.front_name ? true : false}
            value={data.front_name ? data.front_name : ""}
            // helperText={isFrontNameValid ? isFrontNameValid : " "}
          />
        </Grid>
        <Grid className="col" item xs={6}>
          <FormControl
            error={errors.gender ? true : false}
            sx={{ width: "100%" }}
          >
            <InputLabel>Gender</InputLabel>
            <Select
              onChange={onChange}
              autoWidth
              value={data.gender ? data.gender : ""}
              name="gender"
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>

            <FormHelperText>
              {errors.gender ? errors.gender : ""}
            </FormHelperText>
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
            value={data.birthday ? data.birthday : ""}
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
            value={data.address ? data.address : ""}
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
            onChange={onChange}
            error={errors.postal_code ? true : false}
            helperText={errors.postal_code ? errors.postal_code : " "}
            value={data.postal_code ? data.postal_code : ""}
            // helperText={isPostalCodeValid ? isPostalCodeValid : " "}
          />
        </Grid>
      </Grid>
    </WrapContent>
  );
};

export default FormPersonalData;
