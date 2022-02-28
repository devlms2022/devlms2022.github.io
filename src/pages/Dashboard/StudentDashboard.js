import React, { Component } from "react";
import { Grid } from "@mui/material";
import styled from "styled-components";
import MyCourseCard from "../../components/Card/MyCourseCard";
import HeaderContent2 from "../../components/Header/HeaderContent2";
import Paper from "../../components/Paper";
import Course from "../../components/Section/DashboardStudent/Course";
import { Subtitle } from "../../components/Text";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";
import CourseCard from "../../components/Card/CourseCard";

export default class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myCourses: {
        data: [],
        isLoading: false,
        limit: 4,
      },
      courses: {
        data: [],
        isLoading: false,
        limit: 4,
      },
      isLoading: false,
    };
    this.userSign = TokenService.getUser().data;
  }

  fetchDataCourses = async () => {
    try {
      this.setState({
        courses: {
          ...this.state.courses,
          isLoading: true,
        },
      });
      const courses = await Api.post("/classes", {
        filter: {
          status_confirm: "accept",
        },
      });
      if (courses.data.code === 200) {
        this.setState({
          courses: {
            ...this.state.courses,
            data: courses.data.data,
            isLoading: false,
          },
        });
      } else {
        throw new Error(courses.data.message);
      }
    } catch (error) {
      this.setState({
        courses: {
          ...this.state.courses,
          isLoading: false,
        },
      });
      alert(error.message);
    }
  };

  fetchDataMyCourses = async () => {
    const {
      myCourses: { limit },
    } = this.state;
    this.setState({ myCourses: { ...this.state.myCourses, isLoading: true } });
    try {
      const course = await Api.post("/classes", {
        filter: {
          id_user: this.userSign.id,
          status_confirm: "accept",
        },
        limit,
      });
      if (course.data.code === 200) {
        this.setState({
          myCourses: {
            ...this.state.myCourses,
            data: course.data.data,
            isLoading: false,
          },
        });
      } else {
        throw new Error(course.data.message);
      }
    } catch (error) {
      this.setState({
        myCourses: { ...this.state.myCourses, isLoading: false },
      });
      alert(error.message);
    }
  };

  componentDidMount() {
    this.fetchDataMyCourses();
    this.fetchDataCourses();
  }

  render() {
    const { courses, myCourses } = this.state;

    const boardData = [
      {
        label: "Course in Progress",
        value: 2,
      },
      {
        label: "Completed Course",
        value: 20,
      },
      {
        label: "Training Time",
        value: "15h 40m",
      },
      {
        label: "Badges",
        value: 8,
      },
      {
        label: "My Point",
        value: 15000,
      },
    ];

    const col = 12 / boardData.length;
    return (
      <WrapContent>
        <div className="welcome">
          Welcome, <span>Bagus Fatwan Alfiat</span>
        </div>
        <Paper className="paper">
          <Grid container spacing={4}>
            {boardData.map((itm, key) => {
              return (
                <Grid key={key} item sm={col}>
                  <div className="box">
                    {itm.label}
                    <span>{itm.value}</span>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Paper>

        <ContentMyCourse>
          <HeaderContent2 title="Course Catalog" />
          <Grid container spacing={1}>
            {courses.data.map((itm, key) => {
              return (
                <Grid key={key} item xl={3} lg={3} md={4} sm={12} xs={12}>
                  <CourseCard
                    course={itm.master_course.title_course}
                    img={itm.master_course.thumbnail}
                    faculty={itm.master_study.faculty.name}
                    study={itm.master_study.name_study}
                    teacherName={"Bagus Fatwan Alfiat"}
                    totalCh={0}
                    totalStudent={0}
                    isLoding={myCourses.isLoading}
                  />
                </Grid>
              );
            })}
          </Grid>
        </ContentMyCourse>

        <ContentMyCourse>
          <HeaderContent2 title="My Course" />
          <Grid container spacing={1}>
            {myCourses.data.map((itm, key) => {
              return (
                // <></>
                <Grid key={key} item xl={3} lg={3} md={4} sm={12} xs={12}>
                  <MyCourseCard
                    course={itm.master_course.title_course}
                    img={itm.master_course.thumbnail}
                    faculty={itm.master_study.faculty.name}
                    study={itm.master_study.name_study}
                    teacherName={"Bagus Fatwan Alfiat"}
                    totalCh={0}
                    totalStudent={0}
                    progress={0}
                    isLoding={myCourses.isLoading}
                  />
                </Grid>
              );
            })}
          </Grid>
        </ContentMyCourse>
      </WrapContent>
    );
  }
}

const WrapContent = styled.div`
  .welcome {
    font-size: 24px;
    span {
      font-size: 24px;
      font-weight: 600;
    }
    margin-bottom: 20px;
  }
  .paper {
    /* background: tomato; */
    padding: 25px 0;
    display: block;
    margin-bottom: 50px;
    .box {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      span {
        font-size: 40px;
      }
    }
  }
`;

const ContentMyCourse = styled.div`
  margin-top: 20px;
`;
