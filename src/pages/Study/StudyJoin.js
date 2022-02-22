import { Grid, Skeleton } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import DialogCustome from "../../components/Dialog";
import FormAddCourse from "../../components/Form/Course/FormAddCourse";
import Search from "../../components/Form/Search";
import SelectChip from "../../components/Form/Select/SelectChip";
import HeaderContent from "../../components/Header/HeaderContent";
import HeaderContent2 from "../../components/Header/HeaderContent2";
import Paper from "../../components/Paper";
import { TableClasses } from "../../components/Table";
import Profile from "../../components/User/Profile";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";

export default class StudyJoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studiesData: [],
      user: {},
      idClassSelect: "",
      persentaseLoading: 0,
      limit: 10,
      page: 0,
      totalDataStudies: 0,
      search: "",
      openDialog: false,
      isLoading: false,
    };
    this.userSign = TokenService.getUser().data;
  }

  fetchUser = (id, id_study) => {
    Api.post(`/userbyid`, {
      id: id_study,
    })
      .then((res) => {
        if (res.data.code === 200 && res.status === 200) {
          this.setState({
            user: res.data.data,
            isLoading: false,
          });
        }
      })
      .catch((err) => alert(err.message));
  };

  handleAction = (e, idClasses) => {
    const { name } = e.target;
    Swal.fire({
      title: "Are you sure want to " + name + " this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--primary-color)",
    }).then((res) => {
      if (res.isConfirmed) {
        Api.post("/classes/update", {
          id: this.state.idClassSelect,
          status_confirm: name,
        })
          .then((res) => {
            this.fetchData();
            this.handleCloseDialog();
            if (res.data.code === 200 && res.status === 200) {
              Swal.fire(
                "Success!",
                "Your action has been performed.",
                "success"
              );
            }
          })
          .catch((err) => {
            this.handleCloseDialog();
            alert(err.message);
          });
      }
    });
  };

  fetchData = () => {
    const { limit, page, search } = this.state;
    Api.post("/classes", {
      limit,
      page,
      search,
      filter: {
        status_confirm: "pending",
        id_course: null,
      },
    })
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          this.setState({
            studiesData: response.data.data,
            totalDataStudies: response.data.total,
          });
        }
      })
      .catch((err) => alert(err.message));
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

  handleSearch = (keyword) => {
    this.setState({
      search: keyword,
    });
  };

  handleActionClicked = (e, action, id, id_study) => {
    this.setState({
      openDialog: true,
      is_loading: true,
      idClassSelect: id,
    });
    this.fetchUser(id, id_study);
  };

  handleCloseDialog = () => {
    const { openDialog } = this.state;
    if (openDialog) {
      this.setState({
        openDialog: !openDialog,
        user: {},
        is_loading: false,
      });
    } else {
      this.setState({
        openDialog: !openDialog,
      });
    }
  };


  componentDidMount = () => {
    this.fetchData();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.fetchData();
    }

    if (
      prevState.page !== this.state.page ||
      prevState.limit !== this.state.limit
    ) {
      this.fetchData();
    }
  }

  render() {
    const {
      studiesData,
      totalDataStudies,
      limit,
      openDialog,
      user,
      search,
      page,
      isLoading,
    } = this.state;

    return (
      <WrapContent>
        <HeaderContent2 subtitle=" Teacher Joining Confirm" shownGoBack={false} title="Study" />
        <Grid sx={{ marginTop: "5px" }} spacing={1} container>
          <Grid item xs={12} md={6} sm={5} xl={6}>
            <SelectChip
              label="Filter"
              width="30%"
              defaultValue={["Filter"]}
              data={[]}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={7} xl={6}>
            <Search
              onChange={this.handleSearch}
              placeholder="Enter Keyword"
              width="100%"
            />
          </Grid>
        </Grid>

        <WrapClassTable>
          <TableClasses
            data={studiesData}
            page={page}
            limit={limit}
            total={totalDataStudies}
            role_id={this.userSign.role_id}
            actionClicked={this.handleActionClicked}
            onChangePage={() => {}}
            onChangeRowPerpage={() => {}}
          />
        </WrapClassTable>

        <DialogCustome
          maxWidth="md"
          isLoading={isLoading}
          title="User Profile"
          open={openDialog}
          onClose={this.handleCloseDialog}
          onSave={this.handleSave}
        >
          {isLoading ? (
            <Skeleton width="100%" height="350px" />
          ) : (
            <Profile
              shownActionBtn
              onClickAction={this.handleAction}
              data={user}
              forDetail={true}
            />
          )}
        </DialogCustome>
      </WrapContent>
    );
  }
}

const WrapContent = styled(Paper)`
  padding: 12px;
  .list-mystudies {
    margin-top: 15px;
    max-height: 520px;
    overflow-y: scroll;
    padding: 5px;
  }
  .pagination {
    display: flex;
    direction: row;
    justify-content: flex-end;
    margin-top: 15px;
  }
`;

const WrapClassTable = styled.div`
  margin: 15px 0;
  padding-bottom: 15px;
  max-height: 500px;
`;
