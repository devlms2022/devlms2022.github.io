import { Grid } from "@mui/material";
import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { Component } from "react";
import styled from "styled-components";
import {
  CourseIcon,
  DiscussionIcon,
  StudentIcon,
  TeacherWhiteIcon,
} from "../../assets/icons";
import Paper from "../../components/Paper";
import Table from "../../components/Table";
import { Subtitle } from "../../components/Text";
import TokenService from "../../services/token.services";

export default class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAction = ({ id, status }) => {
    const { REACT_APP_API_URL } = process.env;
    this.axiosjwt
      .post(REACT_APP_API_URL + "/activate", {
        id,
        status,
      })
      .then((res) => {
        if (res.status === 200 && res.data.code === 200) {
          this.getUsers();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { users, token, userSign } = this.state;

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
          Welcome, <span>Bagus Fatwan Alfiat</span>{" "}
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

        <Subtitle>
          <span>Course Catalog</span>
        </Subtitle>
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
