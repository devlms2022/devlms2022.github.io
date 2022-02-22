import { Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Paper from "../../components/Paper";
import InfoIcon from "@mui/icons-material/Info";
import ButtonCustom from "../../components/Button/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Api } from "../../services/api";
import QueryString from "query-string";

const Course = () => {
  const [courses, setCourse] = useState([]);
  const redirect = useHistory();

  const onClick = (study, course) => {
    redirect.push(`/signup?role_id=3&id_study=${study}&id_course=${course}`);
  };

  const param = QueryString.parse(window.location.search);

  console.log(param);

  const getCourse = async () => {
    await Api.post("/master_course")
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
              <img className="img_course" src={course.thumbnail} />
              <div className="title_course">
                <h5>{course.title_course}</h5>
                <IconButton aria-label="info">
                  <InfoIcon />
                </IconButton>
              </div>
              <ButtonCustom
                variant="outlined"
                height="20"
                onClick={() => onClick(course.id_study, course.id)}
              >
                Apply Course
              </ButtonCustom>
            </Paper>
          </Grid>
        ))}
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

    .img_course {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 10px;
    }

    .title_course {
      margin: 5px 0 15px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      h5 {
        font-size: 16px;
      }
    }

    .course_progress {
      height: 30px;
      border-radius: 20px;
    }
  }
`;

export default Course;
