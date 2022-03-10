import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import PropTypes from "prop-types";

const InputSelect = (props) => {
  const {
    fullWidth = false,
    width = "320px",
    className,
    onChange,
    name,
    label,
    defaultValue,
    value,
    disabled = false,
    data,
    renderMenuItem,
    error,
    size = "small",
    attrKey,
  } = props;

  return (
    <FormControl
      sx={{ width: fullWidth ? "100%" : width }}
      size={size}
      className={className}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        size={size}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        name={name}
        label={label}
        inputProps={{
          readOnly : disabled ? true : false,
        }}
      >
        <MenuItem value="">{label}</MenuItem>
        {data &&
          data.map((item, index) => {
            if (renderMenuItem) {
              return renderMenuItem(item, index);
            } else {
              return (
                <MenuItem value={item[attrKey.value]} key={index}>
                  {item[attrKey.label]}
                </MenuItem>
              );
            }
          })}
      </Select>

      <FormHelperText>{error && <span>{error}</span>}</FormHelperText>
    </FormControl>
  );
};

InputSelect.propTypes = {
  size: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  data: PropTypes.array,
  renderMenuItem: PropTypes.func,
  renderItem: PropTypes.bool,
  error: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  attrKey: PropTypes.object,
};

export default InputSelect;
