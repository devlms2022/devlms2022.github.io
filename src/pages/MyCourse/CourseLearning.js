import { AccountBox, Book, Group } from "@mui/icons-material";
import { Button, Chip, Grid, Skeleton, Typography } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import HeaderContent from "../../components/Header/HeaderContent";
import HeaderContent2 from "../../components/Header/HeaderContent2";
import ListChapterLearning from "../../components/List/ListChapterLearning";
import Paper from "../../components/Paper";
import BaseTabs from "../../components/Tabs";
import { Api } from "../../services/api";

export default class CourseLearning extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapters: {
        data: [],
        isLoading: false,
      },
      course: {},
      isLoading: false,
      students: [],
    };
    this.courseId = this.props.match.params.id;
  }

  fetchDataCourse = async () => {
    const { courseId } = this;
    this.setState({ isLoading: true });
    try {
      const res = await Api.post("master_coursebyid", {
        id: courseId,
      });

      if (res.data.code === 200) {
        this.setState({
          course: res.data.data,
          isLoading: false,
        });
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  fetchDataChapters = () => {};

  fetchDataStudentsEnrolled = () => {};

  componentDidMount() {
    this.fetchDataCourse();
    this.fetchDataChapters();
    this.fetchDataStudentsEnrolled();
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { course, chapters, students, isLoading } = this.state;

    // console.log(course?.chapters[0]?.chapter_title);
    return (
      <WrapperContent>
        <HeaderContent  title="Back" shownGoBack />
        {isLoading ? (
          <Skeleton width={"25%"} height={"32px"} />
        ) : (
          <Typography sx={{ mt: "5px" }} variant="h5">
            {course.title_course}
          </Typography>
        )}

        {isLoading ? (
          <Skeleton width={"50%"} height="32px" />
        ) : (
          <Grid className="head-info" container spacing={0}>
            <Grid
              className="head-info-item"
              item
              xl={4}
              lg={4}
              sm={12}
              xs={12}
              md={4}
            >
              <div className="chips">
                <Chip
                  label={course?.master_study?.name_study}
                  className="chip-item"
                  size="small"
                  variant="contained"
                  color="primary"
                />
                <Chip
                  label={course?.master_study?.faculty?.name}
                  className="chip-item"
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              </div>
            </Grid>
            {/* <Grid xl={1} lg={1} /> */}
            <Grid
              className="head-info-item-2"
              item
              xl={2}
              lg={3}
              sm={12}
              xs={12}
              md={5}
            >
              <div className="teacher-name">
                <AccountBox size="small" />
                <Typography variant="body2" className="teacher-name-text">
                  Bagus Fatwan Alfiat
                </Typography>
              </div>
              <div className="num-course">
                <div className="num-course-item">
                  <Group size="small" />
                  <span>0</span>
                </div>
                <div className="num-course-item">
                  <Book size="small" />
                  <span>{course?.chapters?.length}</span>
                </div>
              </div>
            </Grid>
            <Grid xl={5} item lg={5} />
          </Grid>
        )}

        <div className="tabs">
          <BaseTabs tabLabel={["Chapter", "Information", "Student"]} />
        </div>
        <Grid container spacing={2}>
          <Grid item xl={7} lg={7}>
            <PaperContent height={this.props.heightContent - 182 + "px"}>
              <div className="chapter-title">
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <Typography variant="h5">
                    {/* {console.log(course?.chapters)} */}
                    {course?.chapters?.length
                      ? course?.chapters[0]?.chapter_title
                      : ""}
                  </Typography>
                )}
                <Button size="small">Next Chapter</Button>
              </div>
              <div className="content">
                {isLoading ? (
                  <Skeleton width={"100%"} height={"320px"} />
                ) : (
                  <div className={"video"}>
                    <iframe
                      width="95%"
                      height={"100%"}
                      src={
                        course?.chapters?.length
                          ? course?.chapters[0]?.video
                          : ""
                      }
                      // hidden={item.is_video_embed === 1 ? false : true}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    />
                    {/* <video  src="https://www.youtube.com/watch?v=G4nNBckyZQU" width={"100%"} type="video/mp4" controls /> */}
                    {/* <source src="https://www.youtube.com/embed/nG1y7hj-2gA"  /> */}
                  </div>
                )}
                {isLoading ? (
                  <Skeleton width={"100%"} height={"80px"} />
                ) : (
                  <Typography
                    className="description"
                    component={"div"}
                    dangerouslySetInnerHTML={{
                      __html: course?.chapters?.length
                        ? course?.chapters[0]?.description
                        : "",
                    }}
                  />
                )}
              </div>
            </PaperContent>
          </Grid>
          <Grid item xl={5} lg={5}>
            <PaperContentCh>
              <HeaderContent2 title="List Chapter" />
              <ListChapterLearning chapters={course.chapters} />
            </PaperContentCh>
          </Grid>
        </Grid>
      </WrapperContent>
    );
  }
}

const WrapperContent = styled.div`
  padding: 8px;
  .head-info {
    /* margin: 10px 0; */
    /* background: red; */

    .info-title {
    }
    .head-info-item {
      display: flex;
      flex-direction: row;
      .chips {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
        /* justify-content: space-between; */
        .chip-item {
          margin-top: 3px;
          margin-right: 5px;
        }
      }
      /* background: red; */
    }
    .head-info-item-2 {
      /* background: blue; */
      display: flex;
      justify-content: space-between;
      .teacher-name {
        display: flex;
        align-items: center;
        .teacher-name-text {
          margin-left: 5px;
        }
      }
      .num-course {
        display: flex;
        align-items: center;
        .num-course-item {
          display: flex;
          align-items: center;
          margin-right: 5px;
          span {
            margin-left: 3px;
          }
        }
      }
    }
  }
  .tabs {
    margin: 12px 0;
  }
`;

const PaperContent = styled(Paper)`
  padding: 20px;
  height: ${(props) => props.height};
  overflow-y: scroll;

  .chapter-title {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    /* position : fixed; */
  }

  .content {
    /* background: red; */
    /* padding: 8px; */
    width: 100%;
    /* margin-bottom : 10px; */
    /* overflow: scroll; */
    .video {
      width: 100%;
      max-height: 420px;
      height: 380px;
      display: flex;
      align-items: center;
      justify-content: center;
      /* background: red; */
    }
    .description {
      margin: 15px 0;
      text-align: justify;
      font-size: 12px;
      p {
        text-align: justify;
        font-size: 12px;
      }
    }
  }
`;

const PaperContentCh = styled(Paper)`
  padding: 15px;
`;
