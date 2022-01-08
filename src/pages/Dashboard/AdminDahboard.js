import { Grid } from "@mui/material";
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
import api from "../../services/api";
import TokenService from "../../services/token.services";

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      token: "",
      expire: 0,
      userSign: {},
    };
  }

  componentDidMount = () => {
    this.getUsers();
    const userSign = TokenService.getUser();
    this.setState({ userSign: userSign.data });
  };

  getUsers = async () => {
    const response = await api.post("/user");
    this.setState({
      users: response.data.data,
    });
  };

  handleAction = ({ id, status }) => {
    const { REACT_APP_API_URL } = process.env;
    api
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
        <Table actionClicked={this.handleAction} data={users} />
      </WrapContent>
    );
  }
}

const WrapContent = styled.div`
  .paper {
    /* background: tomato; */
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
