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

export default class AdminDashboard extends Component {
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
    this.refreshToken();
    this.getUsers();
    const userSign = TokenService.getUser();
    this.setState({ userSign: userSign.data });
  };

  refreshToken = async () => {
    // const history = useHistory();
    const { REACT_APP_API_URL } = process.env;
    const refreshToken = TokenService.getLocalRefreshToken();

    try {
      const response = await axios.post(
        REACT_APP_API_URL + "/token",
        {},
        {
          headers: {
            token: refreshToken,
          },
        }
      );
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
    const { REACT_APP_API_URL } = process.env;
    const response = await this.axiosjwt.post(
      REACT_APP_API_URL + "/user",
      {},
      {
        headers: {
          Authorization: `${this.state.token}`,
        },
      }
    );

    this.setState({
      users: response.data.data,
    });
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

 ;
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
