import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Search from "../../../components/Form/Search";
import UserList from "../../../components/List/UserList";

const StudentList = (props) => {
  const {students} = props;
  return (
    <Content>
      <Search placeholder="Enter Search" name="search" width="60%" />
      <UserList users={students}  />
    </Content>
  );
};

const Content = styled.div`

`;

export default StudentList;
