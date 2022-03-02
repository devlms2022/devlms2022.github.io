import { AccountBox, Book, Group } from "@mui/icons-material";
import {
  Button,
  Chip,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import CourseCard from "../../components/Card/CourseCard";
import MyCourseCard from "../../components/Card/MyCourseCard";
import DetailCourse from "../../components/Courses/DetailCourse";
import DialogFull from "../../components/Dialog/DialogFull";
import HeaderContent2 from "../../components/Header/HeaderContent2";
import Paper from "../../components/Paper";
import { Subtitle } from "../../components/Text";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";

export default class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idCourseSelected: "",
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
      courseSelected: {},
      isLoading: false,
      shownModalLG: false,
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

  fetchDataCourseById = async (id) => {
    try {
      this.setState({ isLoading: true });
      const course = await Api.post(`/master_coursebyid`, {
        id,
      });
      if (course.data.code === 200) {
        this.setState({
          isLoading: false,
          shownModalLG: !this.state.shownModalLG,
          idCourseSelected: id,
          courseSelected: course.data.data,
        });
      } else {
        throw new Error(course.data.message);
      }
    } catch (error) {
      this.setState({ isLoading: false });
      alert(error.message);
    }
  };

  handleClickCourse = (id) => {
    this.fetchDataCourseById(id);
  };

  handleCloseDialogLG = () => {
    this.setState({
      shownModalLG: !this.state.shownModalLG,
    });
  };

  handleRegisterCourse = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to register this course",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--primary-color)",
      confirmButtonText: "Yes, register it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const register = await Api.post("/classes/insert", {
            id_user: this.userSign.id,
            id_course: this.state.idCourseSelected,
            id_study: this.state.courseSelected.id_study,
            status_confirm: "pending",
          });
          if (register.data.code === 200) {
            Swal.fire("Success", register.data.message, "success");
          } else {
            throw new Error(register.data.message);
          }
        } catch (error) {
          alert(error.message);
        }
      }
    });
  };

  componentDidMount() {
    this.fetchDataMyCourses();
    this.fetchDataCourses();
  }

  render() {
    const {
      courses,
      myCourses,
      shownModalLG,
      courseSelected,
      isLoading,
      idCourseSelected,
    } = this.state;

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
          <HeaderContent2
            shownBtn={true}
            componentBtn={
              <Button size="small" variant="outlined">
                View All
              </Button>
            }
            title="Course Catalog"
          />
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
                    idCourse={itm.id_course}
                    onClick={this.handleClickCourse}
                  />
                </Grid>
              );
            })}
          </Grid>
        </ContentMyCourse>

        <ContentMyCourse>
          <HeaderContent2
            shownBtn={true}
            componentBtn={
              <Button size="small" variant="outlined">
                View All
              </Button>
            }
            title="My Course"
          />
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
                    idCourse={itm.id}
                    onClick={this.handleClickCourse}
                  />
                </Grid>
              );
            })}
          </Grid>
        </ContentMyCourse>

        <DialogFull
          open={shownModalLG}
          onClose={this.handleCloseDialogLG}
          maxWidth="lg"
          p="0px"
          showSaveButton={true}
          componentBtn={
            <>
              <Button
                onClick={this.handleCloseDialogLG}
                size="small"
                variant="outlined"
              >
                Close
              </Button>
              <Button
                onClick={this.handleRegisterCourse}
                size="small"
                variant="contained"
              >
                Register Course
              </Button>
            </>
          }
        >
          {idCourseSelected && (
            <DetailCourse
              chapterNum={courseSelected?.chapters?.length}
              chapters={courseSelected.chapters}
              courseId={courseSelected.id}
              courseTitle={courseSelected.title_course}
              description={courseSelected.description}
              faculty={courseSelected?.master_study.faculty?.name}
              study={courseSelected?.master_study?.name_study}
              studentNum={0}
              teacherName={courseSelected?.created?.profile?.fullname}
              thumbnail={""}
              video=""
              isLoading={isLoading}
            />
          )}
        </DialogFull>
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
