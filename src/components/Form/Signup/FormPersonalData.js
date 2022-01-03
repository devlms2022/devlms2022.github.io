import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import Input from "../Input";
import { Styling as WrapContent } from "./index";

const FormPersonalData = (props) => {
  const { onChange, validator, data, validation } = props;

  console.log(validator);

  const isBurgerServiceValid = validator.message(
    "burger_service_nummer",
    data.burger_service_nummer,
    "required|numeric"
  );

  const isFamilyNameValid = validator.message(
    "family_name",
    data.family_name,
    "required"
  );
  const isFrontNameValid = validator.message(
    "front_name",
    data.family_name,
    "required"
  );

  const isGenderValid = validator.message("gender", data.gender, "required");

  const isBirthDayValid = validator.message(
    "birthday",
    data.birthday,
    "required"
  );

  const isAddressValid = validator.message("address", data.address, "required");

  const isPostalCodeValid = validator.message(
    "postal_code",
    data.postal_code,
    "required|numeric"
  );

  return (
    <WrapContent>
      <Input
        className="form-control"
        label="Burger Service Nummer"
        name="burger_service_nummer"
        type="number"
        validation={isBurgerServiceValid}
        onChange={onChange}
        error={isBurgerServiceValid ? true : false}
        // helperText={isBurgerServiceValid ? isBurgerServiceValid : " "}
      />
      <Grid spacing={2} container>
        <Grid className="col" className="col" item xs={6}>
          <Input
            className="form-control"
            label="Family Name"
            name="family_name"
            value={data.family_name}
            onChange={onChange}
            error={isFamilyNameValid ? true : false}
            // helperText={isFamilyNameValid ? isFamilyNameValid : " "}
          />
        </Grid>
        <Grid className="col" item xs={6}>
          <Input
            className="form-control"
            label="Front Name"
            name="front_name"
            onChange={onChange}
            error={isFrontNameValid ? true : false}
            // helperText={isFrontNameValid ? isFrontNameValid : " "}
          />
        </Grid>
        <Grid className="col" item xs={6}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel>Genere</InputLabel>
            <Select
              onChange={onChange}
              autoWidth
              name="gender"
              label="Gender"
              defaultValue=""
              error={isGenderValid ? true : false}
              // helperText={isGenderValid ? isGenderValid : " "}
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
            error={isBirthDayValid ? true : false}
            // helperText={isBirthDayValid ? isBirthDayValid : " "}
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
            error={isAddressValid ? true : false}
            // helperText={isAddressValid ? isAddressValid : " "}
          />
        </Grid>
        <Grid className="col" item xs={5}>
          <Input
            className="form-control"
            label="Postal Code"
            name="postal_code"
            onChange={onChange}
            error={isPostalCodeValid ? true : false}
            // helperText={isPostalCodeValid ? isPostalCodeValid : " "}
          />
        </Grid>
      </Grid>
    </WrapContent>
  );
};

export default FormPersonalData;
