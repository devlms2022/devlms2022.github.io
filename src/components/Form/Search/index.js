import { SearchRounded } from "@mui/icons-material";
import {
  FormControl,
  Icon,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import BoxCustom from "../../Box";

const Search = (props) => {
  const {
    width = "25ch",
    onChange,
    name,
    className,
    onBlur,
    placeholder,
    autoComplete = "off",
  } = props;
  return (
    <BoxCustom component="form" autoComplete={autoComplete}>
      <FormControl sx={{ width }}>
        <OutlinedInput
          startAdornment={
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          }
          onChange={onChange}
          name={name}
          className={className}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      </FormControl>
    </BoxCustom>
  );
};

export default Search;
