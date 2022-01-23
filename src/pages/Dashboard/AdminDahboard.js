import { Grid } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import {
  CourseIcon,
  DiscussionIcon,
  StudentIcon,
  TeacherWhiteIcon
} from "../../assets/icons";
import Paper from "../../components/Paper";
// import { Api as api} from "../../services/api";
import TokenService from "../../services/token.services";

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSign: {},
      role_id: 3,
      search: "",
      page: 0,
      limit: 10,
      totalData: 0,
    };
  }

  componentDidMount = () => {
    const userSign = TokenService.getUser();
    this.setState({ userSign: userSign.data });
  };

  render() {

    const boardData = [
      {
        label: "Teacher",
        icon: TeacherWhiteIcon,
        value: 50,
      },
      {
        label: "Student",
        icon: StudentIcon,
        value: 200,
      },
      {
        label: "Course",
        icon: CourseIcon,
        value: 20,
      },
      {
        label: "Discussion",
        icon: DiscussionIcon,
        value: 8,
      },
    ];

    const col = 12 / boardData.length;

    return (
      <>
        <WrapContent>
          <Paper className="paper">
            <Grid container spacing={4}>
              {boardData.map((itm, key) => {
                return (
                  <Grid key={key} item sm={col}>
                    <div className="box">
                      <img src={itm.icon} alt={itm.label} />
                      <div className="value">
                        {itm.label}
                        <span>{itm.value}</span>
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </WrapContent>
      </>
    );
  }
}

const WrapContent = styled.div`
  .paper {
    padding: 25px 0;
    display: block;
    margin-bottom: 50px;
    .box {
      display: flex;
      justify-content: center;
      align-items: center;
      .value {
        display: flex;
        flex-direction: column;
        span {
          font-size: 40px;
        }
      }
    }
  }
`;

const ImgContainer = styled.div`
  width: 250px;
  background-color: var(--background-light-color);
  padding: 12px;
  height: 195px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;
