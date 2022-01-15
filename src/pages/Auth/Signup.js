import { Grid, Step, StepLabel, Stepper } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import styled from "styled-components";
import Swal from "sweetalert2";
import StudentsImg from "../../assets/images/students.png";
import TeacherImg from "../../assets/images/teachers.png";
import Button from "../../components/Button/Button";
import {
  FormEmailPasss,
  FormPersonalData,
  FormStudentUploadDoc,
  FormTeachUploadDoc,
} from "../../components/Form/Signup";
import Title from "../../components/Text/Tittle";
import utilities from "../../utils/utilities";

const RegistStep0 = (props) => {
  const { handleClicked } = props;

  return (
    <Grid spacing={2} container>
      <Grid item className="col" sm={6}>
        <Box className="box-option">
          <img src={TeacherImg} />
          <Button onClick={handleClicked} name="teacher" variant="outlined">
            Teacher
          </Button>
        </Box>
      </Grid>
      <Grid item className="col" sm={6}>
        <Box className="box-option">
          <img src={StudentsImg} />
          <Button onClick={handleClicked} name="student" variant="outlined">
            Student
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerType: 0,
      stepActive: 0,
      isRedirect: false,
      data: {
        role_id: 0,
        burger_service_nummer: "",
        family_name: "",
        front_name: "",
        gender: "",
        birthday: "",
        address: "",
        postal_code: "",
        reg_code_branch: "",
        email: "",
        password: "",
        repassword: "",
        proof_teacher_grade: undefined,
        grades: undefined,
        identity_card: undefined,
      },
      proof_teacher_grade: undefined,
      grades: undefined,
      identity_card: undefined,
      steps: [
        "Type Of Register",
        "Personal Data",
        "Upload Identity",
        "Email & Password",
      ],
      errors: {},
    };
  }

  handleChangeFile = (event) => {
    const { name, files } = event.target;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          [name]: reader.result,
          data: {
            ...this.state.data,
            [name]: files[0],
          },
        });
      }
    };
    reader.readAsDataURL(files[0]);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value,
      },
    });
  };

  handleChangeOption = (event) => {
    const { name } = event.target;
    const registerType = name === "teacher" ? 2 : name === "student" ? 3 : 0;
    this.setState({
      registerType,
      stepActive: this.state.stepActive + 1,
      data: {
        ...this.state.data,
        role_id: registerType,
      },
    });
  };

  handleNext = () => {
    const { stepActive, steps, data } = this.state;
    let isFormValid = true;
    if (stepActive === 1) {
      if (
        !(data.burger_service_nummer,
        data.address,
        data.birthday,
        data.family_name,
        data.front_name,
        data.gender,
        data.postal_code)
      ) {
        this.setState({
          errors: {
            ["burger_service_nummer"]:
              "*Please Enter your Burger Service Number.",
            ["address"]: "*Please Enter your address.",
            ["family_name"]: "*Family Name",
            ["front_name"]: "Front Name",
            ["gender"]: "gender",
            ["birthday"]: "birthday",
            ["postal_code"]: "postal code",
          },
        });
        isFormValid = false;
      }
    }
    if (stepActive === 2 && data.role_id === 2) {
      if (!data.reg_code_branch) {
        this.setState({
          errors: {
            ["reg_code_branch"]: "*Please enter your Reg Code of Branch.",
          },
        });
        isFormValid = false;
      }
    }

    if (isFormValid) {
      this.setState({
        errors: {},
      });
      if (stepActive + 1 === steps.length) {
        this.handleSubmit();
      } else {
        this.setState({
          stepActive: stepActive + 1,
        });
      }
    }
  };

  handleSubmit = async () => {
    const { REACT_APP_API_URL } = process.env;
    const { stepActive, steps, data } = this.state;
    let isFormValid = true;

    if (!(data.email, data.password, data.repassword)) {
      this.setState({
        errors: {
          ["email"]: "*Please enter your Email.",
          ["password"]: "*Please enter your Password.",
          ["repassword"]: "*Please enter Retype Password.",
        },
      });
      isFormValid = false;
    } else {
      if (data.password !== data.repassword) {
        this.setState({
          errors: {
            ["repassword"]: "*Password doesn't match!.",
          },
        });
        isFormValid = false;
      }
    }

    if (isFormValid) {
      const formdata = new FormData();
      Object.entries(data).forEach((item) => {
        const attr = item[0];
        const value = item[1];
        if (value) {
          formdata.append(attr, value);
        }
      });
      formdata.append("status", "waiting");
      formdata.append("is_login", 0);
      try {
        const response = await axios({
          url: `${REACT_APP_API_URL}/register`,
          method: "POST",
          data: formdata,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200 && response.data.code === 200) {
          Swal.fire({
            title: "Success!",
            text: "Your account has been created, Please check your email regularly for further confirmation!",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((confirm) => {
            if (confirm.isConfirmed) {
              this.setState({ isRedirect: true });
            }
          });
        } else {
          Swal.fire({
            title: "Not Complete!",
            text: "Your email has been existing, Please change your email",
            icon: "error",
            confirmButtonText: "Ok",
          }).then((confirm) => {
            if (confirm.isConfirmed) {
              this.setState({ isRedirect: false });
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  handlePrev = () => {
    this.setState({
      stepActive: this.state.stepActive - 1,
    });
  };

  render() {
    const {
      stepActive,
      registerType,
      data,
      proof_teacher_grade,
      grades,
      identity_card,
      steps,
      isRedirect,
      errors,
    } = this.state;

    if (isRedirect) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    }

    return (
      <Container>
        <div className="title">
          <Title text="Sign Up" />
        </div>
        <div className="content-step">
          <Stepper activeStep={stepActive}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <div className="content">
          {stepActive === 0 && (
            <RegistStep0 handleClicked={this.handleChangeOption} />
          )}
          <div className="wrap-from">
            {stepActive === 1 && (
              <FormPersonalData
                data={data}
                errors={errors}
                onChange={this.handleChange}
              />
            )}
            {stepActive === 2 && registerType === 2 && (
              <FormTeachUploadDoc
                validator={this.validator2}
                proofTeacherGrade={proof_teacher_grade}
                onChange={this.handleChange}
                errors={errors}
                onChangeFile={this.handleChangeFile}
              />
            )}
            {stepActive === 2 && registerType === 3 && (
              <FormStudentUploadDoc
                validator={this.validator2}
                grades={grades}
                errors={errors}
                identityCard={identity_card}
                onChange={this.handleChange}
                onChangeFile={this.handleChangeFile}
              />
            )}
            {stepActive === 3 && (
              <FormEmailPasss
                validator={this.validator3}
                onChange={this.handleChange}
                errors={errors}
              />
            )}
          </div>

          {stepActive > 0 && (
            <Grid spacing={2} className="wrap-button" container>
              {stepActive > 1 && (
                <Grid
                  style={{ display: "flex", flexDirection: "column" }}
                  item
                  xs={6}
                >
                  <Button onClick={this.handlePrev} variant="outlined">
                    Prev
                  </Button>
                </Grid>
              )}
              <Grid
                style={{ display: "flex", flexDirection: "column" }}
                item
                xs={stepActive > 1 ? 6 : 12}
              >
                <Button onClick={this.handleNext}>
                  {stepActive + 1 === steps.length ? "Sign Up" : "Next"}
                </Button>
              </Grid>
            </Grid>
          )}
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  padding: 0 60px;
  /* background: blue; */

  .title {
    text-align: center;
    width: 100%;
    margin-bottom: 10px;
  }

  .col {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .box-option {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .content {
    padding: 13px 25px;
    /* background: red; */
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    .wrap-from {
      width: 480px;
    }
  }
  .wrap-button {
    width: 450px;
    margin-top: 10px;
  }
`;

export default Signup;
