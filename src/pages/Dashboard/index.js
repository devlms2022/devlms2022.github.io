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
import TokenService from "../../services/token.services";
import AdminDashboard from "./AdminDahboard";
import StudentDashboard from "./StudentDashboard";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      token: "",
      expire: 0,
      userSign: {},
    };
    this.axiosjwt = axios.create();
    this.axiosjwt.interceptors.request.use(
      async (config) => {
        const currentDate = new Date();
        const expire = this.state.expire;
        const { REACT_APP_API_URL } = process.env;
        if (expire * 1000 < currentDate.getTime()) {
          const response = await axios.post(
            REACT_APP_API_URL + "/token",
            {},
            {
              headers: {
                token: TokenService.getLocalRefreshToken(),
              },
            }
          );
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
  }

  componentDidMount = () => {
    const userSign = TokenService.getUser();
    this.setState({ userSign: userSign.data });
  };

  render() {
    const { userSign } = this.state;

    return (
      <>
        {userSign.role_id === "1" && <AdminDashboard />}
        {userSign.role_id === "3" && <StudentDashboard />}
      </>
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
