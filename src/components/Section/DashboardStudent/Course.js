import { Grid, IconButton, LinearProgress } from "@mui/material";
import React from "react";
import Paper from "../../Paper";
import styled from "styled-components";
import InfoIcon from "@mui/icons-material/Info";

const Course = () => {
  return (
    <ListCourse>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Paper className="course">
            <img className="img_course" />
            <div className="title_course">
              <h5>Introduce</h5>
              <IconButton aria-label="info">
                <InfoIcon />
              </IconButton>
            </div>
            <LinearProgress
              className="course_progress"
              variant="determinate"
              color="success"
              value={100}
            />
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper className="course">
            <img className="img_course" />
            <div className="title_course">
              <h5>Introduce</h5>
              <IconButton aria-label="info">
                <InfoIcon />
              </IconButton>
            </div>
            <LinearProgress
              className="course_progress"
              variant="determinate"
              color="success"
              value={100}
            />
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper className="course">
            <img className="img_course" />
            <div className="title_course">
              <h5>Introduce</h5>
              <IconButton aria-label="info">
                <InfoIcon />
              </IconButton>
            </div>
            <LinearProgress
              className="course_progress"
              variant="determinate"
              color="success"
              value={100}
            />
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper className="course">
            <img className="img_course" />
            <div className="title_course">
              <h5>Introduce</h5>
              <IconButton aria-label="info">
                <InfoIcon />
              </IconButton>
            </div>
            <LinearProgress
              className="course_progress"
              variant="determinate"
              color="success"
              value={100}
            />
          </Paper>
        </Grid>
      </Grid>
    </ListCourse>
  );
};

const ListCourse = styled.div`
  .course {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-radius: 10px;

    .img_course {
      width: 100%;
      height: 150px;
      object-fit: cover;
      background: #a5a5a5;
      border-radius: 10px;
    }

    .title_course {
      margin: 5px 0 15px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      h5 {
        font-size: 18px;
      }
    }

    .course_progress {
      height: 30px;
      border-radius: 20px;
    }
  }
`;

export default Course;
