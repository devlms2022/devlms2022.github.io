import { AccountBox, Book, Group } from "@mui/icons-material";
import { Button, Chip, Grid, Typography } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import CourseCard from "../../components/Card/CourseCard";
import MyCourseCard from "../../components/Card/MyCourseCard";
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

  handleClickCourse = (id) => {
    // console.log(this.props);
    // this.props.history.push(`/course/${id}`);
    this.setState({
      shownModalLG: !this.state.shownModalLG,
      idCourseSelected: id,
    });
    // this.handleModalXl();
  };

  handleCloseDialogLG = () => {
    this.setState({
      shownModalLG: !this.state.shownModalLG,
    });
  };

  componentDidMount() {
    this.fetchDataMyCourses();
    this.fetchDataCourses();
  }

  render() {
    const { courses, myCourses, shownModalLG } = this.state;

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
                    idCourse={itm.id}
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
        >
          <DialogContent>
            <div className="cover-wrapper"></div>
            <div className="content-wrapper">
              <div className="title-course">
                <Subtitle>
                  <span>PHP Intermediete</span>
                </Subtitle>
              </div>
              <Grid container spacing={1} className="info-course">
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={4}
                  sm={12}
                  xs={12}
                  className="chips"
                >
                  <Chip
                    className="chip-item"
                    label="Software Engineering"
                    size="small"
                    color="primary"
                    variant="contained"
                  />
                  <Chip
                    className="chip-item"
                    label="Programming"
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  className="label"
                  item
                  xl={3}
                  lg={3}
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <div className="teacher">
                    <AccountBox size="small" className="icon" />
                    <span>Bagus Fatwan Alfiat</span>
                  </div>
                  <div className="numeric">
                    <div>
                      <Group size="small" className="icon" />
                      <span>0</span>
                    </div>
                    <div>
                      <Book size="small" className="icon" />
                      <span>0</span>
                    </div>
                  </div>
                </Grid>
                <Grid item xl={6} lg={6} md={4} sm={0} xs={0} />
              </Grid>
              <Typography className="desc-container" component="div">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </Typography>
              <div className="section-course">
                <div className="label-section">
                  <Subtitle><span>Course</span></Subtitle>
                </div>
              </div>
              <div className="section-assignment"></div>
            </div>
          </DialogContent>
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

const DialogContent = styled.div`
  .cover-wrapper {
    width: 100%;
    height: 237px;
    background: url(https://support.sharphue.com/wp-content/uploads/2018/07/inner-page-banner-3.png);
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .content-wrapper {
    padding: 15px;
    display: flex;
    flex-direction: column;
    .info-course {
      margin-top: 5px;
      .chips {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .chip-item {
          margin-right: 5px;
        }
      }
      .label {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .teacher {
          display: flex;
          align-items: center;
          .icon {
            margin-right: 5px;
          }
        }
        .numeric {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          div {
            display: flex;
            align-items: center;
            margin-right: 5px;
            .icon {
              margin-right: 5px;
            }
          }
        }
      }
    }
    .desc-container {
      margin-top: 20px;
      p {
        font-size: 12px;
        line-height: 1.5;
        text-align: justify;
      }
    }
  }
`;
