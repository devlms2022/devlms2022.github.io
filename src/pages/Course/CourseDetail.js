import { AddCircle, Book, Group, Send } from "@mui/icons-material";
import { Alert, Button, Chip, Grid, Skeleton, Typography } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import Swal from "sweetalert2";
import DialogCustome from "../../components/Dialog";
import FormAddChapter from "../../components/Form/Course/FormAddChapter";
import HeaderContent from "../../components/Header/HeaderContent";
import HeaderContent2 from "../../components/Header/HeaderContent2";
import Paper from "../../components/Paper";
import BaseTabs from "../../components/Tabs";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";
import utilities from "../../utils/utilities";
import ChapterList from "./ChapterList";

class CourseDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {},
      clases: {},
      chapterForm: {
        id_course: "",
        chapter_title: "",
        description: "",
        video: "",
        is_video_embed: 1,
        blobVideo: undefined,
        videoFile: undefined,
      },
      chapters: {
        data: [],
        total: 0,
        limit: 10,
        page: 0,
      },
      persentaseLoading: 0,
      openDialog: false,
      loading: true,
    };
    this.user = TokenService.getUser().data;
    this.courseId = this.props.match.params.id;
  }

  fetchDataCourse = async () => {
    this.setState({ loading: true });
    try {
      const course = await Api.post("/master_course", {
        find: {
          id_course: this.courseId,
        },
      });
      this.setState({ course: course.data.data, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  fetchVideo = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Api.get(
          "/chapter/video/" + id,

          { responseType: "blob" }
        );

        utilities.readBlobAsText(res.data, (string) => {
          const isJSON = utilities.isJsonString(string);
          if (isJSON) {
            const response = JSON.parse(string);
            if (response.code === 404) {
              return null;
            }
          } else {
            utilities.readFileBlob(res.data, (response) => {
              resolve(response);
            });
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  fetchDataChapter = async () => {
    this.setState({ loading: true });
    try {
      const chapters = await Api.post("/chapter", {
        filter: {
          id_course: this.courseId,
        },
      });

      this.setState({
        chapters: {
          ...this.state.chapters,
          data: chapters.data.data,
        },
        loading: false,
      });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "video") {
      if (this.state.chapterForm.is_video_embed === 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          let blobData = e.target.result; //blob data
          this.setState({
            chapterForm: {
              ...this.state.chapterForm,
              blobVideo: blobData,
              videoFile: files[0],
            },
          });
        };
        reader.readAsDataURL(files[0]);
      } else {
        this.setState({
          chapterForm: {
            ...this.state.chapterForm,
            [name]: value,
          },
        });
      }
    } else {
      this.setState({
        chapterForm: {
          ...this.state.chapterForm,
          [name]: value,
        },
      });
    }
  };

  handleBlur = (e, text) => {
    this.setState({
      chapterForm: {
        ...this.state.chapterForm,
        description: text,
      },
    });
  };

  handleSaveChapter = async (param) => {
    const { chapterForm, idSelect } = this.state;
    const formdata = new FormData();

    formdata.append("chapter_title", chapterForm.chapter_title);
    formdata.append("description", chapterForm.description);
    if (chapterForm.is_video_embed === 0) {
      formdata.append("video", chapterForm.videoFile);
    } else if (chapterForm.is_video_embed === 1) {
      formdata.append("video", chapterForm.video);
    }
    formdata.append("is_video_embed", chapterForm.is_video_embed);
    formdata.append("created_by", this.user.id);
    formdata.append("id_course", this.courseId);

    try {
      this.setState({
        loading: true,
      });
      const response = await Api.post("/chapter/insert", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const sizeOfFile = progressEvent.total;
          let loadedData = progressEvent.loaded;
          let persentase = (loadedData / sizeOfFile) * 100;
          this.setState({ persentaseLoading: parseInt(persentase.toFixed(0)) });
        },
      });

      if (response.status === 200 && response.data.code === 200) {
        this.fetchDataChapter();
        this.handleCloseDialog();
        this.setState({
          loading: false,
        });
        Swal.fire("Succesfull!", "Chapter has ben Added!", "success");
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
      alert(error.message);
    }
  };

  handleProposeCourse = () => {
    Api.post("/master_course/update", {
      id: this.courseId,
      status: "propose",
    })
      .then((res) => {
        if (res.data.code === 200) {
          Swal.fire("Succesfull!", "Ther Course has been Propose!", "success");
          this.fetchDataCourse();
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  handleAction = (e) => {
    const { name } = e.target;
    Swal.fire({
      title: name,
      text: `Are you sure want to be ${name} this course ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--primary-color)",
    }).then((res) => {
      if (res.isConfirmed) {
        Api.post("/master_course/update", {
          id: this.courseId,
          status: name,
        })
          .then((res) => {
            if (res.data.code === 200) {
              Swal.fire(
                "Succesfull!",
                "This Course has been Published!",
                "success"
              );
              this.fetchDataCourse();
            }
          })
          .catch((err) => {});
      }
    });
  };

  handleClickPropose = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to propose this course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--primary-color)",
      confirmButtonText: "Yes, Propose!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.handleProposeCourse();
      }
    });
  };

  handleCloseDialog = () => {
    const { openDialog } = this.state;
    if (openDialog) {
      this.setState({
        openDialog: !openDialog,
        chapterForm: {
          id_course: "",
          chapter_title: "",
          description: "",
          thumbnail: "",
          video: "",
          is_video_embed: 1,
          blobVideo: undefined,
          videoFile: undefined,
        },
      });
    } else {
      this.setState({
        openDialog: !openDialog,
      });
    }
  };

  componentDidMount = () => {
    this.fetchDataCourse();
    this.fetchDataChapter();
  };

  render() {
    const {
      course,
      chapters,
      loading,
      openDialog,
      chapterForm,
      persentaseLoading,
    } = this.state;

    return (
      <>
        <Grid container spacing={1} sx={{ mt: "14px" }}>
          <Grid item xl={3} md={4} lg={3}>
            <WrapContent>
              {loading ? (
                <Skeleton />
              ) : (
                <div className="head-left">
                  <HeaderContent
                    shownGoBack
                    goBack={() => this.props.history.goBack()}
                    title="Back"
                  />
                  <div >
                    <Chip
                     
                      label={
                        course.status === "accept" ? "publish" : course.status
                      }
                      size="small"
                      color={
                        course.status === "reject"
                          ? "error"
                          : course.status === "accept"
                          ? "primary"
                          : "info"
                      }
                    >{course.status === "accept" ? "publish" : course.status}</Chip>
                  </div>
                </div>
              )}

              <div className="container-thumbnail">
                <img
                  width={"100%"}
                  src="https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
                />
              </div>
              <div className="container-content">
                <div>
                  <Typography
                    color="inherit"
                    sx={{ pb: 0 }}
                    gutterBottom={false}
                    variant="h6"
                    component="h6"
                  >
                    {loading ? <Skeleton /> : course.title_course}
                  </Typography>
                  <div className="info">
                    <Typography variant="body2" component="span" sx={{ mb: 0 }}>
                      By{" "}
                      {loading ? (
                        <Skeleton />
                      ) : (
                        course.created.profile.fullname || "Bagus Fatwan A"
                      )}
                    </Typography>
                    <div className="number">
                      <div className="number-item">
                        <Book color="info" fontSize="small" /> 0
                      </div>
                      <div className="number-item">
                        <Group color="secondary" fontSize="small" /> 0
                      </div>
                    </div>
                  </div>
                </div>
                <div className="desc">
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: course?.description,
                      }}
                      variant="caption"
                      component="span"
                    />
                  )}
                </div>
              </div>
              <div className="button">
                {loading ? (
                  <Skeleton width={"100%"} />
                ) : (
                  <Button
                    disabled={
                      course.status === "propose" ||
                      (course.status === "accept" && true)
                    }
                    onClick={this.handleClickPropose}
                    fullWidth
                    variant="contained"
                  >
                    {course.status === "propose" && "Proposed"}
                    {course.status === "accept" && "Published"}
                  </Button>
                )}
              </div>
            </WrapContent>
          </Grid>
          <Grid item xl={9} sm={12} xs={12} md={8} lg={9}>
            <WrapContent>
              <div className="header-content">
                {loading ? (
                  <Skeleton width={"100%"} height="34px" />
                ) : (
                  <>
                    <HeaderContent2 title={course?.title_course} />
                    {this.user.role_id === "2" && (
                      <Button
                        onClick={() =>
                          this.setState({ openDialog: !openDialog })
                        }
                        size="small"
                        variant="contained"
                        startIcon={<AddCircle />}
                      >
                        Add Chapter
                      </Button>
                    )}
                    {course.status === "propose" && this.user.role_id === "1" && (
                      <div>
                        <Button
                          onClick={this.handleAction}
                          name="accept"
                          variant="contained"
                          size="small"
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={this.handleAction}
                          name="reject"
                          size="small"
                          color="error"
                          variant="text"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
              <BaseTabs
                tabLabel={["Chapters", "Students", "Examp"]}
                tabPanel={[
                  {
                    content: loading ? (
                      <Skeleton
                        animation="wave"
                        sx={{ height: 190 }}
                        variant="rectangular"
                      />
                    ) : (
                      <ChapterList
                        data={chapters.data}
                        page={chapters.page}
                        total={chapters.total}
                        limit={chapters.limit}
                        handleChangePage={() => {}}
                        handleChangeRowsPerPage={() => {}}
                      />
                    ),
                  },
                ]}
              />
            </WrapContent>
          </Grid>
        </Grid>
        <DialogCustome
          open={openDialog}
          maxWidth="md"
          onClose={this.handleCloseDialog}
          title={"Add Chapter - " + course?.title_course}
          showSaveButton
          onSave={this.handleSaveChapter}
          isLoading={loading}
        >
          <FormAddChapter
            data={chapterForm}
            persentaseLoading={persentaseLoading}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
          />
        </DialogCustome>
      </>
    );
  }
}

export default CourseDetail;

const WrapHeader = styled(Paper)`
  padding: 5px;
  .cover-course {
    width: 100%;
    border-radius: 4px;
    height: 130px;
    background-image: url("https://esqcourse.com/wp-content/uploads/2021/12/background-kurus-bahasa-inggris-anak.png");
    repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: flex-end;
    background-position: center;
    padding: 8px;
    flex-direction: column;
    .cover-content-top {
      width: 100%;
      height: 50%;
      flex-direction: row;
      justify-content: space-between;
      /* background-color: red; */
      .cover-content-top-left {
        width: 28px;
        .role {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      }
      .cover-content-top-right {
      }
    }
    .cover-content-bottom {
      width: 100%;
      height: 50%;
      /* background-color: yellow; */
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .cover-content-bottom-left {
        /* background: green; */
      }
      .cover-content-bottom-right {
        /* background: orange; */
        display: flex;
        flex-direction: row;
        height: 100%;
        align-items: flex-end;
        .content {
          margin-right: 10px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
        }
      }
    }
  }
  .table-container {
    padding: 15px 0;
    margin: 15px 0;
    padding-bottom: 15px;
  }
`;

const WrapContent = styled(Paper)`
  padding: 8px;

  .container-thumbnail {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
    padding: 10px;
  }
  .head-left {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .container-content {
    margin: 10px 0;
    div {
      .info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .number {
          display: flex;
          flex-direction: row;
          .number-item {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-right: 5px;
          }
        }
      }
    }
    .desc {
      margin-top: 10px;
      height: 130px;
      max-height: 130px;
    }
  }
`;

CourseDetail.propTypes = {};