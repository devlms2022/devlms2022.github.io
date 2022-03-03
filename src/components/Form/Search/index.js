import React from "react";
import PropTypes from "prop-types";
import { SearchRounded } from "@mui/icons-material";
import { FormControl, InputAdornment, TextField } from "@mui/material";

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
    mt = 0,
  } = props;
  return (
    <FormControl sx={{ width, marginTop: mt }}>
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

Search.propTypes = {
  width: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  className: PropTypes.string,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onKeyDown: PropTypes.func,
  mt: PropTypes.number,
};
