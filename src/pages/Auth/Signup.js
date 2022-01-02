import { Grid, Step, StepLabel, Stepper } from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";
import styled from "styled-components";
import StudentsImg from "../../assets/images/students.png";
import TeacherImg from "../../assets/images/teachers.png";
import Button from "../../components/Button/Button";
import {
  FormTeachPersonalData,
  FormEmailPasss,
  FormTeachUploadDoc,
  FormStudentPersonalData,
  FormStudentUploadDoc,
  FormPersonalData,
} from "../../components/Form/Signup";
import Title from "../../components/Text/Tittle";

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
    };
  }

  handleChangeOption = (event) => {
    const { name } = event.target;
    const registerType = name === "teacher" ? 2 : name === "student" ? 3 : 0;
    this.setState({
      registerType,
      stepActive: this.state.stepActive + 1,
    });
  };

  handleNext = () => {
    this.setState({
      stepActive: this.state.stepActive + 1,
    });
  };

  handlePrev = () => {
    this.setState({
      stepActive: this.state.stepActive - 1,
    });
  };

  render() {
    const { stepActive, registerType } = this.state;
    const steps = [
      "Type Of Register",
      "Personal Data",
      "Upload Identity",
      "Email & Password",
    ];

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
          {stepActive === 1 && <FormPersonalData />}

          {stepActive === 2 && registerType === 2 && <FormTeachUploadDoc />}
          {stepActive === 2 && registerType === 3 && <FormStudentUploadDoc />}
          {stepActive === 3 && <FormEmailPasss />}

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
  }
  .wrap-button {
    width: 450px;
    margin-top: 10px;
  }
`;

export default Signup;
