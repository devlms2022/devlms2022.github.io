import { SearchRounded } from "@mui/icons-material";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import React from "react";

const Search = (props) => {
  const {
    width = "25ch",
    onChange,
    name,
    className,
    onBlur,
    placeholder,
    value,
    onKeyDown,
  } = props;
  return (
    <FormControl sx={{ width }}>
      <TextField
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          ),
        }}
        onChange={(e) => onChange(e.target.value)}
        name={name}
        className={className}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value}
        onKeyDown={onKeyDown}
      />
    </FormControl>
  );
};

export default Search;
