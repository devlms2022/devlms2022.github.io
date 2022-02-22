import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import Grid from "@mui/material/Grid";
import React from "react";
import styled from "styled-components";
import Input from "../Form/Input";
import InputSelect from "../Form/Select";
import Paper from "../Paper";
import PropsType from "prop-types";
import { Button } from "@mui/material";

const Profile = (props) => {
  const {
    onChange,
    errors,
    onChangeDateBirthday,
    role_id,
    data,
    forDetail,
    listStudies,
    listCourses,
    onClickAction,
    shownActionBtn = false,
  } = props;
  console.log(data);
  return (
    <Grid container spacing={2}>
      <Grid item xl={7} lg={6} sm={12} xs={12}>
        <Content>
          <Grid spacing={2} container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Input
                fullWidth
                placeholder="Burger Service Number"
                name="burger_service_nummer"
                label="Burger Service Number"
                value={data?.profile?.burger_service_nummer}
                inputProps={{
                  readOnly: forDetail ? true : false,
                }}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Input
                fullWidth
                placeholder="Enter Email"
                name="email"
                label="Email"
                type="email"
                value={data?.email}
                inputProps={{
                  readOnly: forDetail ? true : false,
                }}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} xs={6} md={6} lg={6} xl={6}>
              <Input
                fullWidth
                placeholder="Enter Front Name"
                name="front_name"
                label="Front Name"
                value={data?.profile?.front_name}
                inputProps={{
                  readOnly: forDetail ? true : false,
                }}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} xs={6} md={6} lg={6} xl={6}>
              <Input
                fullWidth
                placeholder="Family Name"
                name="family_name"
                label="Family Name"
                value={data?.profile?.family_name}
                inputProps={{
                  readOnly: forDetail ? true : false,
                }}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} xs={6} md={6} lg={6} xl={6}>
              <Input
                fullWidth
                placeholder="Enter Front Name"
                name="front_name"
                label="Front Name"
                value={data?.profile?.front_name}
                inputProps={{
                  readOnly: forDetail ? true : false,
                }}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} xs={6} md={6} lg={6} xl={6}>
              <InputSelect
                fullWidth
                placeholder="Gender"
                name="gender"
                label="Family Name"
                value={data.profile ? data?.profile?.gender : "female"}
                attrKey={{
                  value: "value",
                  label: "label",
                }}
                data={[
                  {
                    value: "male",
                    label: "Male",
                  },
                  {
                    value: "female",
                    label: "Female",
                  },
                ]}
                inputProps={{
                  readOnly: forDetail ? true : false,
                }}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} xs={6} md={6} lg={6} xl={6}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Birthday"
                  inputFormat="yyyy/MM/DD"
                  value={data?.profile?.birthday}
                  onChange={() => {}}
                  readOnly={forDetail ? true : false}
                  renderInput={(params) => <Input {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} xs={6} md={6} lg={6} xl={6}>
              <Input
                fullWidth
                placeholder="Enter Address"
                name="address"
                label="Adress"
                value={data?.profile?.address}
                inputProps={{
                  readOnly: forDetail ? true : false,
                }}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <div className="footer-form">
            {shownActionBtn && (
              <div className="btn-action">
                <Button
                  size="small"
                  name="accept"
                  variant="contained"
                  className="btn-item"
                  onClick={onClickAction}
                >
                  Accept
                </Button>
                <Button
                  size="small"
                  name="accept"
                  color="error"
                  className="btn-item"
                  onClick={onClickAction}
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        </Content>
      </Grid>
    </Grid>
  );
};

export default Profile;
const Content = styled(Paper)`
  padding: 15px;
  .footer-form {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    align-items: center;
    .btn-action {
      .btn-item {
        margin-right: 10px;
      }
    }
  }
`;

Profile.propTypes = {
  onChange: PropsType.func,
  errors: PropsType.object,
  onChangeDateBirthday: PropsType.func,
  role_id: PropsType.number,
  data: PropsType.object,
  forDetail: PropsType.bool,
  listStudies: PropsType.array,
  listCourses: PropsType.array,
  onClickAction: PropsType.func,
  shownActionBtn: PropsType.bool,
};
