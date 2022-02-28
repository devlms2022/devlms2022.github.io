import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { minWidth } from "@mui/system";
import React from "react";
import styled from "styled-components";
import Input from "../Input";
import { Styling as WrapContent } from "./index";

const FormPersonalData = (props) => {
  const {
    onChange,
    errors,
    data,
    isProfile,
    disabled,
    forDetail,
    listStudies,
    listCourses,
    listFaculties,
    user,
  } = props;

  const theme = useTheme();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: "auto",
      },
    },
  };

  return (
    <Content>
      <WrapContent>
        <Box className="box">
          <Grid spacing={2} container>
            {!isProfile ? (
              user === 2 ? (
                <>
                  <Grid className="col" item xs={12} sm={12}>
                    <FormControl
                      error={errors ? (errors.id_study ? true : false) : false}
                      sx={{ width: "100%" }}
                    >
                      <InputLabel>Faculty</InputLabel>
                      <Select
                        onChange={onChange}
                        fullWidth
                        value={data.id_faculty ? data.id_faculty : ""}
                        name="id_faculty"
                        label="Faculty"
                        MenuProps={MenuProps}
                        inputProps={{
                          readOnly: disabled
                            ? disabled.id_faculty
                              ? true
                              : false
                            : forDetail
                            ? true
                            : false,
                        }}
                      >
                        {listFaculties.map((item) => (
                          <MenuItem
                            value={item.id}
                            key={item.id}
                            style={theme}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>

                      <FormHelperText>
                        {errors ? (errors.id_study ? errors.id_study : "") : ""}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid className="col" item xs={12} sm={12}>
                    <FormControl
                      error={errors ? (errors.id_study ? true : false) : false}
                      sx={{ width: "100%" }}
                    >
                      <InputLabel>Studies</InputLabel>
                      <Select
                        onChange={onChange}
                        fullWidth
                        value={data.id_study ? data.id_study : ""}
                        name="id_study"
                        label="Studies"
                        MenuProps={MenuProps}
                        inputProps={{
                          readOnly: disabled
                            ? disabled.id_study
                              ? true
                              : false
                            : forDetail
                            ? true
                            : false,
                        }}
                      >
                        {listStudies.map((study) => (
                          <MenuItem
                            value={study.id}
                            key={study.id}
                            style={theme}
                          >
                            {study.name_study}
                          </MenuItem>
                        ))}
                      </Select>

                      <FormHelperText>
                        {errors ? (errors.id_study ? errors.id_study : "") : ""}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </>
              ) : (
                <React.Fragment>
                  <Grid className="col" item xs={12} sm={6}>
                    <FormControl
                      error={errors ? (errors.id_study ? true : false) : false}
                      sx={{ width: "100%" }}
                    >
                      <InputLabel>Studies</InputLabel>
                      <Select
                        onChange={onChange}
                        fullWidth
                        value={data.id_study ? data.id_study : ""}
                        name="id_study"
                        label="Studies"
                        MenuProps={MenuProps}
                        inputProps={{
                          readOnly: disabled
                            ? disabled.id_study
                              ? true
                              : false
                            : forDetail
                            ? true
                            : false,
                        }}
                      >
                        {listStudies.map((study) => (
                          <MenuItem
                            value={study.id}
                            key={study.id}
                            style={theme}
                          >
                            {study.name_study}
                          </MenuItem>
                        ))}
                      </Select>

                      <FormHelperText>
                        {errors ? (errors.id_study ? errors.id_study : "") : ""}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid className="col" item xs={12} sm={6}>
                    <FormControl
                      error={errors ? (errors.clasess ? true : false) : false}
                      sx={{ width: "100%" }}
                    >
                      <InputLabel>Course</InputLabel>
                      <Select
                        onChange={onChange}
                        fullWidth
                        value={data.classes ? data.classes : ""}
                        name="classes"
                        label="Courses"
                        MenuProps={MenuProps}
                        inputProps={{
                          readOnly: disabled
                            ? disabled.classes
                              ? true
                              : false
                            : forDetail
                            ? true
                            : false,
                        }}
                      >
                        {data.id_study ? (
                          listCourses.map((course) =>
                            data.id_study === course.id_study ? (
                              <MenuItem
                                value={course.id}
                                key={course.id}
                                style={theme}
                              >
                                {course.title_course}
                              </MenuItem>
                            ) : null
                          )
                        ) : (
                          <MenuItem>Choose Course</MenuItem>
                        )}
                      </Select>

                      <FormHelperText>
                        {errors ? (errors.classes ? errors.classes : "") : ""}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </React.Fragment>
              )
            ) : null}
            <Grid className="row" item xs={12} sm={12}>
              <Input
                className="form-control"
                label="Burger Service Nummer"
                name="burger_service_nummer"
                type="number"
                inputProps={{
                  readOnly: disabled
                    ? disabled.burger_service_nummer
                      ? true
                      : false
                    : forDetail
                    ? true
                    : false,
                }}
                onChange={onChange}
                error={
                  errors ? (errors.burger_service_nummer ? true : false) : false
                }
                helperText={
                  errors
                    ? errors.burger_service_nummer
                      ? errors.burger_service_nummer
                      : ""
                    : ""
                }
                value={
                  data.burger_service_nummer ? data.burger_service_nummer : ""
                }
              />
            </Grid>
            <Grid className="col" item xs={12} sm={6}>
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
                inputProps={{
                  readOnly: disabled
                    ? disabled.family_name
                      ? true
                      : false
                    : forDetail
                    ? true
                    : false,
                }}
                error={errors ? (errors.family_name ? true : false) : false}
                value={data.family_name ? data.family_name : ""}
              />
            </Grid>
            <Grid className="col" item xs={12} sm={6}>
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
                inputProps={{
                  readOnly: disabled
                    ? disabled.front_name
                      ? true
                      : false
                    : forDetail
                    ? true
                    : false,
                }}
                // helperText={isFrontNameValid ? isFrontNameValid : " "}
              />
            </Grid>
            <Grid className="col" item xs={12} sm={6}>
              <FormControl
                error={errors ? (errors.gender ? true : false) : false}
                sx={{ width: "100%" }}
              >
                <InputLabel>Gender</InputLabel>
                <Select
                  onChange={onChange}
                  fullWidth
                  value={data.gender ? data.gender : ""}
                  name="gender"
                  label="Gender"
                  MenuProps={MenuProps}
                  inputProps={{
                    readOnly: disabled
                      ? disabled.gender
                        ? true
                        : false
                      : forDetail
                      ? true
                      : false,
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>

                <FormHelperText>
                  {errors ? (errors.gender ? errors.gender : "") : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid className="col" item xs={12} sm={6}>
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
                helperText={
                  errors ? (errors.birthday ? errors.birthday : "") : ""
                }
                onChange={onChange}
                inputProps={{
                  readOnly: disabled
                    ? disabled.birthday
                      ? true
                      : false
                    : forDetail
                    ? true
                    : false,
                }}
              />
            </Grid>
            <Grid className="col" item xs={12} sm={7}>
              <Input
                className="form-control"
                label="Address"
                name="address"
                multiline
                value={data.address ? data.address : ""}
                error={errors ? (errors.address ? true : false) : false}
                inputProps={{
                  readOnly: disabled
                    ? disabled.address
                      ? true
                      : false
                    : forDetail
                    ? true
                    : false,
                }}
                onChange={onChange}
                rows={4}
                helperText={
                  errors ? (errors.address ? errors.address : "") : ""
                }
                // helperText={isAddressValid ? isAddressValid : " "}
              />
            </Grid>
            <Grid className="col" item xs={12} sm={5}>
              <Input
                className="form-control"
                label="Postal Code"
                name="postal_code"
                onChange={onChange}
                error={errors ? (errors.postal_code ? true : false) : false}
                helperText={
                  errors ? (errors.postal_code ? errors.postal_code : "") : ""
                }
                inputProps={{
                  readOnly: disabled
                    ? disabled.postal_code
                      ? true
                      : false
                    : forDetail
                    ? true
                    : false,
                }}
                value={data.postal_code ? data.postal_code : ""}
                // helperText={isPostalCodeValid ? isPostalCodeValid : " "}
              />
            </Grid>
          </Grid>
        </Box>
      </WrapContent>
    </Content>
  );
};

const Content = styled.div`
  margin-top: -20px;
  .box {
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 25px 50px rgba(129, 129, 129, 0.1);
    border-radius: 10px;
  }
`;

export default FormPersonalData;
