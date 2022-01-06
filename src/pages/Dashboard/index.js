import { Grid } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import {
  CourseIcon,
  DiscussionIcon,
  StudentIcon,
  TeacherWhiteIcon,
} from "../../assets/icons";
import Paper from "../../components/Paper";
import Table from "../../components/Table";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TokenService from "../../services/token.services";

export default class Dashboard extends Component {
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
    this.refreshToken();
    this.getUsers();
  };

  refreshToken = async () => {
    // const history = useHistory();
    const { REACT_APP_API_URL } = process.env;
    const refreshToken = TokenService.getLocalRefreshToken();

    try {
      const response = await axios.get(REACT_APP_API_URL + "/token", {
        headers: {
          token: refreshToken,
        },
      });
      const decoded = jwt_decode(response.data.accessToken);

      this.setState({
        expire: decoded.exp,
        token: response.data.accessToken,
      });
    } catch (error) {
      // if (error.response) {
      //   history.push("/");
      // }
    }
  };

  getUsers = async () => {
    const axiosjwt = axios.create();
    const { REACT_APP_API_URL } = process.env;

    axiosjwt.interceptors.request.use(
      async (config) => {
        const currentDate = new Date();
        const expire = this.state.expire;
        if (expire * 1000 < currentDate.getTime()) {
          const response = await axios.get(REACT_APP_API_URL + "/token", {
            headers: {
              token: TokenService.getLocalRefreshToken(),
            },
          });
          config.headers.Authorization = `${response.data.accessToken}`;
          // setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          this.setState({
            expire: decoded.exp,
            token: response.data.accessToken,
          });
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    const response = await axiosjwt.get(REACT_APP_API_URL + "/user", {
      headers: {
        Authorization: `${this.state.token}`,
      },
    });

    this.setState({
      users: response.data.data,
    });
  };
  render() {
    const { users, token } = this.state;

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
        <Table data={users} />
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
