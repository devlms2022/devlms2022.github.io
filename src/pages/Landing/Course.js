import { Button, Chip, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Paper from "../../components/Paper";
import InfoIcon from "@mui/icons-material/Info";
import ButtonCustom from "../../components/Button/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Api } from "../../services/api";
import QueryString from "query-string";
import { Book, People, SwitchAccount } from "@mui/icons-material";
import DialogFull from "../../components/Dialog/DialogFull";
import DetailCourse from "../../components/Courses/DetailCourse";
import Swal from "sweetalert2";
import { Box } from "@mui/system";
import FormSign from "../../components/Form/FormSign";
import SimpleReactValidator from "simple-react-validator";
import TokenService from "../../services/token.services";
import ImageLogin from "../../assets/images/loginimage.png";
import HeaderLogin from "../../components/Header/HeaderLogin";

const Course = (props) => {
  const { signIn } = props;
  const [courses, setCourse] = useState([]);
  const [shownModalLG, setShownModalLG] = useState(false);
  const [showModalSignIn, setShowModalSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idCourseSelected, setIdCourseSelected] = useState("");
  const [courseSelected, setCourseSelected] = useState({});
  const redirect = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertShown, setShownAlert] = useState(false);
  const validator = new SimpleReactValidator();

  const changHandler = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submitHandler = async (validation) => {
    if (validation) {
      setIsLoading(!isLoading);
      try {
        const response = await Api.post(`/auth`, {
          email,
          password,
        });
        if (response.status === 200) {
          if (response.data.success) {
            TokenService.setUser(response.data.data);
            setIsLoading(isLoading);
            Swal.fire({
              title: "Successfull!",
              text: "You are logged in",
              icon: "success",
              confirmButtonText: "Ok",
            }).then((confirm) => {});
            signIn(response.data.data);
          } else if (response.data.code === 100) {
            Swal.fire({
              title: "Login Failed!",
              text: response.data.message,
              icon: "error",
              confirmButtonText: "Ok",
            }).then((confirm) => {});
          }
        }
        setShowModalSignIn(!showModalSignIn);
      } catch (error) {
        setIsLoading(isLoading);
        console.log(error);
      }
    }
  };

  const onOpenSignUp = () => {
    setShowModalSignIn(!showModalSignIn);
    redirect.push("/signup");
  };

  const handleToSignUp = (study, course) => {
    redirect.push(`/signup?role_id=3&id_study=${study}&id_course=${course}`);
  };

  const param = QueryString.parse(window.location.search);

  const fetchDataCourseById = async (id) => {
    try {
      setIsLoading(!isLoading);
      const course = await Api.post(`/master_coursebyid`, {
        id,
      });
      if (course.data.code === 200) {
        setIsLoading(!isLoading);
        setShownModalLG(!shownModalLG);
        setIdCourseSelected(id);
        setCourseSelected(course.data.data);
      } else {
        throw new Error(course.data.message);
      }
    } catch (error) {
      setIsLoading(!isLoading);
      alert(error.message);
    }
  };

  const handleClickCourse = (id) => {
    fetchDataCourseById(id);
  };

  const handleCloseDialogLG = () => {
    setShownModalLG(!shownModalLG);
  };

  const handleShowSignIn = () => {
    setShowModalSignIn(!showModalSignIn);
  };

  const handleModalHaveAccount = () => {
    Swal.fire({
      title: "Do you have account?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonColor: "var(--primary-color)",
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((res) => {
      if (res.isConfirmed) {
        handleShowSignIn();
        handleCloseDialogLG();
      } else if (res.isDenied) {
        handleToSignUp(courseSelected.id_study, courseSelected.id);
      }
    });
  };

  const getCourse = async () => {
    await Api.post("/master_course", {
      limit: 5,
      filter: {
        status: "accept",
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setCourse(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <ListStudies>
      <Typography variant="h4" mb={5}>
        Choose your course
      </Typography>
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid item xs={6} md={3} key={course.id}>
            <Paper className="course">
              <img
                className="img_course"
                src={
                  course.thumbnail
                    ? course.thumbnail
                    : "http://beepeers.com/assets/images/tradeshows/default-image.jpg"
                }
              />
              <div className="chip">
                <Chip
                  label={course.master_study.faculty.name}
                  className="chip-item"
                  variant="outlined"
                  size="small"
                />
                <Chip
                  label={course.master_study.name_study}
                  className="chip-item"
                  color="info"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div className="title_course">
                <h5>{course.title_course}</h5>
              </div>
              <div className="info">
                <div className="item">
                  <SwitchAccount fontSize="small" />
                  <Typography variant="body2" component={"span"}>
                    {course.created.profile.fullname}
                  </Typography>
                </div>
                <div className="numeric">
                  <div className="info-num">
                    <div className="item">
                      <People fontSize="small" />
                      <span>0</span>
                    </div>
                    <div className="item">
                      <Book fontSize="small" />
                      <span>{course.chapters.length}</span>
                    </div>
                  </div>
                  <ButtonCustom
                    variant="outlined"
                    height="20"
                    onClick={() => handleClickCourse(course.id)}
                  >
                    Regist Course
                  </ButtonCustom>
                </div>
              </div>
            </Paper>
          </Grid>
        ))}
        <DialogFull
          open={shownModalLG}
          onClose={handleCloseDialogLG}
          maxWidth="lg"
          p="0px"
          showSaveButton={true}
          componentBtn={
            <>
              <Button
                onClick={handleCloseDialogLG}
                size="small"
                variant="outlined"
              >
                Close
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleModalHaveAccount}
              >
                Register Course
              </Button>
            </>
          }
        >
          {idCourseSelected && (
            <DetailCourse
              chapterNum={courseSelected?.chapters?.length}
              chapters={courseSelected?.chapters}
              courseId={courseSelected?.id}
              courseTitle={courseSelected?.title_course}
              description={courseSelected?.description}
              faculty={courseSelected?.master_study?.faculty?.name}
              study={courseSelected?.master_study?.name_study}
              studentNum={0}
              teacherName={courseSelected?.created?.profile?.fullname}
              thumbnail={""}
              video=""
              isLoading={isLoading}
            />
          )}
        </DialogFull>
        <DialogFull
          open={showModalSignIn}
          maxWidth="md"
          p="0px"
          onClose={() => setShowModalSignIn(!showModalSignIn)}
        >
          <HeaderLogin onClick={() => setShowModalSignIn(!showModalSignIn)} />
          <Grid container spacing={2}>
            <Grid item sm={7}>
              <Box className="warplogo">
                <img src={ImageLogin} />
              </Box>
            </Grid>
            <Grid item sm={5}>
              <FormSign
                onSignin={(validation) => submitHandler(validation)}
                onClickForgotPassword={() =>
                  setShowModalSignIn(!showModalSignIn)
                }
                onChange={changHandler}
                alertShown={alertShown}
                validator={validator}
                data={{ email, password }}
                onSignup={(param) => setShowModalSignIn(!param)}
                onOpenSignUp={onOpenSignUp}
              />
            </Grid>
          </Grid>
        </DialogFull>
      </Grid>
    </ListStudies>
  );
};

const ListStudies = styled.div`
  .course {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-radius: 10px;

    .info {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin: 15px 0;

      .item {
        display: flex;
        gap: 5px;
        align-items: center;
      }

      .numeric {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;

        .info-num {
          display: flex;
          gap: 10px;
        }
      }
    }

    .chip {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      margin: 10px 0;
    }

    .img_course {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 10px;
    }

    .title_course {
      margin-top: 5px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      h5 {
        font-size: 16px;
      }
    }
  }
  .modal_account {
    display: flex;
    justify-content: center;

    h2 {
      font-size: 100px;
      color: white;
    }
  }
`;

export default Course;
