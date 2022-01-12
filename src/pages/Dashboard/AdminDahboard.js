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
import { TableUser } from "../../components/Table";
import { Api } from "../../services/api";
// import { Api as api} from "../../services/api";
import TokenService from "../../services/token.services";

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userSign: {},
      role_id: 3,
      search: "",
      page: 0,
      limit: 10,
      totalData : 0,
    };
  }

  componentDidMount = () => {
    this.getUsers();
    const userSign = TokenService.getUser();
    this.setState({ userSign: userSign.data });
  };

  getUsers = async () => {
    const { page, limit } = this.state;
    const response = await Api.post("/user", {
      filter: {
        status: "waiting",
        role_id: this.state.role_id,
      },
      search: this.state.search,
      page,
      limit,
    });
    this.setState({
      users: response.data.data,
      totalData : response.data.total
    });
  };

  handleChangePage = (event, newPage) => {
    console.log(newPage);
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      limit: +event.target.value,
      page: 0,
    });
    console.log( +event.target.value)
  };

  handleAction = ({ id, status }) => {
    const { REACT_APP_API_URL } = process.env;
    Api.post(REACT_APP_API_URL + "/activate", {
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

  handleSwitch = (role) => {
    role = role === "teacher" ? 2 : 3;
    this.setState({ role_id: role });
  };

  handleSearch = (keyword) => {
    this.setState({
      search: keyword,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.role_id !== this.state.role_id) {
      this.getUsers();
    }
    if (prevState.search !== this.state.search) {
      this.getUsers();
    }
  }

  render() {
    const { users, role_id, page, limit, totalData} = this.state;
    console.log(users);

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
        <TableUser
          onSwitch={this.handleSwitch}
          actionClicked={this.handleAction}
          data={users}
          onSearch={this.handleSearch}
          total={totalData}
          page={page}
          limit={limit}
          onChangePage={this.handleChangePage}
          onChangeRowPerpage={this.handleChangeRowsPerPage}
        />
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
