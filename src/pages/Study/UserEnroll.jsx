import React, { Component } from "react";
import { Button, Grid, Tab } from "@mui/material";
import styled from "styled-components";
import Paper from "../../components/Paper";
import Search from "../../components/Form/Search";
import { Api } from "../../services/api";
import TableUserEnroll from "../../components/Table/TableUserEnroll";
import Navtab from "../../components/Navtab";
import BoxCustom from "../../components/Box";

export default class UserEnroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataEnroll: [],
      limit: 10,
      page: 0,
      totalDataEnroll: 0,
      search: "",
      navIndexActive: 0,
      roleSwitch: 3,
    };
  }

  fetchData = () => {
    const { limit, page, search, roleSwitch } = this.state;
    Api.post("/studies", {
      limit,
      page,
      search,
      filter: {
        role_id : roleSwitch
      },
    })
      .then((resp) => {
        this.setState({ dataEnroll: resp.data.data });
      })
      .catch((error) => alert(error.message));
  };

  handleSwitch = (role) => {
    role = role === "teacher" ? 2 : 3;
    this.setState({ roleSwitch: role });
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      limit: +event.target.value,
      page: 0,
    });
  };

  handleAction = (e, id, value) => {
    Api.post("/studies/confirm", {
      id,
      status_confirm: value,
    })
      .then((response) => {
        if (response.status === 200 && response.data.code === 200) {
          this.fetchData();
        } else {
          throw Error(response.data);
        }
      })
      .catch((err) => alert(err.message));
  };

  componentDidMount = () => {
    this.fetchData();
  };

  render() {
    const { dataEnroll, totalDataEnroll, page, limit, navIndexActive } =
      this.state;
    const tabs = [
      {
        label: "Students",
        name: "student",
      },
      {
        label: "Teachers",
        name: "teacher",
      },
    ];

    return (
      <WrapCoentent>
        <Grid container spacing={1}>
          <Grid xl={4} sm={4} xs={12} item>
            <Navtab
              navIndexActive={navIndexActive}
              tabsData={tabs}
              onClick={(e, indexNav) => {
                this.setState({ navIndexActive: indexNav });
                this.handleSwitch(e.target.name);
              }}
            />
          </Grid>
          <Grid sx={{ textJustify: "auto" }} xl={3} sm={3} xs={12} item>
            <Button variant="contained">Filter</Button>
          </Grid>
          <Grid xl={5} sm={5} xs={12} item>
            <Search placeholder="Enter" width="100%" />
          </Grid>
        </Grid>
        <div>
          <TableUserEnroll
            data={dataEnroll}
            total={totalDataEnroll}
            page={page}
            limit={limit}
            onClickAction={this.handleAction}
            onChangePage={this.handleChangePage}
            onChangeRowPerpage={this.handleChangeRowsPerPage}
          />
        </div>
      </WrapCoentent>
    );
  }
}

const WrapCoentent = styled(Paper)`
  padding: 15px;
`;
