import React, { Component } from "react";
import styled from "styled-components";
import TokenService from "../../services/token.services";
import AdminDashboard from "./AdminDahboard";
import StudentDashboard from "./StudentDashboard";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSign: {},
    };
  }

  componentDidMount = () => {
    const userSign = TokenService.getUser();
    this.setState({ userSign: userSign.data });
  };

  render() {
    const { userSign } = this.state;

    return (
      <>
        {userSign.role_id === "1" && <AdminDashboard userSign={userSign} />}
        {userSign.role_id === "3" && <StudentDashboard userSign={userSign} />}
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
