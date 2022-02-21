import { Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Paper from "../../components/Paper";
import InfoIcon from "@mui/icons-material/Info";
import ButtonCustom from "../../components/Button/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Api } from "../../services/api";

const Studies = () => {
  const [study, setStudy] = useState([]);
  const redirect = useHistory();

  const onClick = () => {
    redirect.push("/");
  };

  const getStudies = async () => {
    await Api.post("/studies")
      .then((res) => {
        console.log(res.data.data);
        setStudy(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStudies();
  }, []);

  return (
    <ListStudies>
      <Typography variant="h4" mb={5}>
        Choose your studies
      </Typography>
      <Grid container spacing={2}>
        {study.map((study) => (
          <Grid item xs={6} md={3} key={study.study_master}>
            <Paper className="course">
              <img
                className="img_course"
                src={study.master_studies.thumbnail}
              />
              <div className="title_course">
                <h5>{study.master_studies.title}</h5>
                <IconButton aria-label="info">
                  <InfoIcon />
                </IconButton>
              </div>
              <ButtonCustom variant="outlined" height="20" onClick={onClick}>
                Apply Studies
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

export default Studies;
