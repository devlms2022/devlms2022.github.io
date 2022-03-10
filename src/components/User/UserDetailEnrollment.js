import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import BaseTabs from "../Tabs";
import AvatarDefault from "../../assets/images/avatardefault.png";
import Input from "../Form/Input";
import { Label } from "../Text";
import ImageDefault from "../../assets/images/imgcontainer.png";
import HeaderCourseLabel from "../Header/HeaderCourseLabel";

const UserInfo = (props) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item xl={12} sm={12} lg={12}>
              <Input
                value="24234234243SS1"
                fullWidth
                name="burger_service_nummer"
                label="Burger Service Number"
                readOnly
                size="small"
              />
            </Grid>
            <Grid item xl={6} lg={6} md={12} sm={12}>
              <Input
                value="Bagus Fatwan"
                fullWidth
                name="first_name"
                label="First Name"
                readOnly
                size="small"
              />
            </Grid>
            <Grid item xl={6} lg={6} md={12} sm={12}>
              <Input
                value="Alfiat"
                fullWidth
                name="family_name"
                label="Family Name"
                size="small"
                readOnly
              />
            </Grid>
            <Grid item xl={6} lg={6} md={12} sm={12}>
              <Input
                value="Male"
                fullWidth
                name="gender"
                label="Gender"
                readOnly
                size="small"
              />
            </Grid>
            <Grid item xl={6} lg={6} md={12} sm={12}>
              <Input
                value="2000-11-03"
                fullWidth
                name="birthday"
                label="Birthday"
                readOnly
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item xl={12} sm={12} lg={12}>
              <Input
                value="email@gmail.com"
                fullWidth
                name="email"
                label="Email"
                readOnly
                size="small"
              />
            </Grid>
            <Grid item xl={6} lg={6} md={12} sm={12}>
              <Input
                value="16630"
                fullWidth
                name="postial_code"
                label="Postial Code"
                readOnly
                size="small"
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12}>
              <Input
                value="address"
                fullWidth
                name="address"
                label="Life Address"
                readOnly
                rows={4}
                multiline
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ my: "15px" }} />
      <Box
        sx={{
          display: "flex",
          //   bgcolor: "pink",
          p: "5px",
          width: "60%",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Box component={"div"}>
          <Label>Passport/Identity Card</Label>
          <Box sx={{ width: "220px", height: "150px" }}>
            <img src={ImageDefault} width="100%" height={"100%"} />
          </Box>
        </Box>
        <Box component={"div"}>
          <Label>Grades</Label>
          <Box sx={{ width: "220px", height: "150px" }}>
            <img src={ImageDefault} width="100%" height={"100%"} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
const UserEnrolledCourse = (props) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xl={8} lg={8}>
          <Box
            sx={{
              width: "100%",
              borderRadius: "10px",
              border: "0.5px solid #C4C4C4",
              borderColor: "#C4C4C4",
              borderWidth: "0.5px",
              p: "10px",
            }}
          >
            <HeaderCourseLabel />
          </Box>
        </Grid>
        <Grid item xl={8} lg={8}>
          <Box
            sx={{
              width: "100%",
              borderRadius: "10px",
              border: "0.5px solid #C4C4C4",
              borderColor: "#C4C4C4",
              borderWidth: "0.5px",
              p: "10px",
            }}
          >
            <HeaderCourseLabel />
          </Box>
        </Grid>
        <Grid item xl={8} lg={8}>
          <Box
            sx={{
              width: "100%",
              borderRadius: "10px",
              border: "0.5px solid #C4C4C4",
              borderColor: "#C4C4C4",
              borderWidth: "0.5px",
              p: "10px",
            }}
          >
            <HeaderCourseLabel />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const StudentEnrollCourse = (props) => {
  return (
    <Box
      sx={{
        width: "530px",
        borderRadius: "10px",
        border: "0.5px solid #C4C4C4",
        borderColor: "#C4C4C4",
        borderWidth: "0.5px",
        p: "10px",
      }}
    >
      <HeaderCourseLabel />
    </Box>
  );
};

const UserDetailEnrollment = (props) => {
  return (
    <ContentWrapper>
      <div className="head">
        <div className="profile-container">
          <img src={AvatarDefault} />
        </div>
        <div className="user-name">
          <Typography variant="h5" sx={{ fontWeight: 500 }} component={"span"}>
            Student Name
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 300 }} component={"p"}>
            email@gmail.com
          </Typography>
        </div>
      </div>
      <Divider />
      <BaseTabs
        tabLabel={["Student Info", "Course Enrollment", "Student Courses"]}
        tabPanel={[
          {
            content: <UserInfo />,
          },
          {
            content: <StudentEnrollCourse />,
          },
          {
            content: <UserEnrolledCourse />,
          },
        ]}
      />
    </ContentWrapper>
  );
};

export default UserDetailEnrollment;

const ContentWrapper = styled.div`
  .head {
    display: flex;
    margin-bottom: 12px;
    .profile-container {
      margin-right: 10px;
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 100%;
      border: 0.3px solid #c4c4c4;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;
