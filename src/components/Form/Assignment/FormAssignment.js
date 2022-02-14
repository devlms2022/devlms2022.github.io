import { DesktopDatePicker } from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Input from "../Input";
import PropTypes from "prop-types";
import AdapterMoment from "@mui/lab/AdapterMoment";


const FormAssignment = (props) => {
  const { handleChange, handleBlur, handleChangeDate, id, field } = props;
  return (
    <WrapForm sx={props.sx} className={props.className}>
      <Input
        placeholder="Enter Title"
        label="Title Of Assignment"
        fullWidth
        name={"title_assignment"}
        onChange={handleChange}
        className="form-control"
      />

      <FormControl fullWidth className="form-control">
        <InputLabel>Type</InputLabel>
        <Select
          onChange={handleChange}
          sx={{
            width: "100%",
          }}
          name="assignment_type"
          label="Type"
          defaultValue={field?.assignment_type}
        >
          <MenuItem value={"1"}>Multiple Choice</MenuItem>
          <MenuItem value={"2"}>Essay</MenuItem>
        </Select>

        <FormHelperText>
          {/* {errors ? (errors.gender ? errors.gender : "") : ""} */}
        </FormHelperText>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} xl={4}>
            <DesktopDatePicker
              label="Periode start"
              inputFormat="DD/MM/YYYY"
              value={field?.dateStart}
              mask="__/__/____"
              onChange={(e) => handleChangeDate("start", e)}
              renderInput={(param) => {
                return (
                  <Input
                    className="form-control"
                    name="start_date"
                    {...param}
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} xl={4}>
            <DesktopDatePicker
              label="Periode End"
              inputFormat="DD/MM/YYYY"
              value={field?.dateEnd}
              mask="__/__/____"
              onChange={(e) => handleChangeDate("end", e)}
              renderInput={(param) => (
                <Input
                  className="form-control"
                  name="end_date"
                  {...param}
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
      <div className="form-controll">
        <InputLabel>Instruction</InputLabel>
        <SunEditor
          width="100%"
          setOptions={{
            buttonList: buttonList.formatting,
          }}
          height="270"
          name="instruction"
          placeholder="Enter Instruction"
          value={field?.instruction}
          onBlur={handleBlur}
        />
      </div>
    </WrapForm>
  );
};

export default FormAssignment;

FormAssignment.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChangeDate: PropTypes.func.isRequired,
    id: PropTypes.string,
    field: PropTypes.object,
    className : PropTypes.string,

};

const WrapForm = styled(Box)`
  .form-control {
    margin-bottom: 15px;
  }
`;
