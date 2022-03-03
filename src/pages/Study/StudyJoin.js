import { Grid, MenuItem, Skeleton } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import DialogCustome from "../../components/Dialog";
import Search from "../../components/Form/Search";
import InputSelect from "../../components/Form/Select";
import SelectChip from "../../components/Form/Select/SelectChip";
import HeaderContent2 from "../../components/Header/HeaderContent2";
import TableDataNotFound from "../../components/Label/TableDataNotFound";
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
      filter: [
        {
          key: "role_id",
          label: "Role",
          value: [
            {
              value: "2",
              label: "Teacher",
            },
            {
              value: "3",
              label: "Student",
            },
          ],
        },
      ],
      filterChanged: {
        key: "",
        value: "",
      },
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
        Api.post("/teacher_study/update", {
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
    const { limit, page, search, filterChanged } = this.state;
    const filter = {
      status_confirm: "pending",
    };
    if (filterChanged.value !== "") {
      filter[filterChanged.key] = filterChanged.value;
    }
    Api.post("/teacher_study", {
      limit,
      page,
      search,
      filter,
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

  handleFilterChangeKey = (e) => {
    const { name, value } = e.target;
    this.setState({
      filterChanged: {
        key: value,
        value: "",
      },
    });
  };

  handleFilterChangeValue = (e) => {
    const { name, value } = e.target;
    this.setState({
      filterChanged: {
        key: this.state.filterChanged.key,
        value: value,
      },
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
    if (prevState.filterChanged.value !== this.state.filterChanged.value) {
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
      filter,
      filterChanged,
      search,
      page,
      isLoading,
    } = this.state;

    return (
      <WrapContent height={this.props.heightContent + "px"}>
        <HeaderContent2
          subtitle=" Teacher Joining Confirm"
          shownGoBack={false}
          title="Study"
        />
        <Grid sx={{ marginTop: "5px" }} spacing={1} container>
          <Grid className="filter" item xs={12} md={6} sm={5} xl={6}>
            <InputSelect
              className="item-filter"
              label="Filter By"
              width="50%"
              data={filter}
              defaultValue="Filter By"
              value={filterChanged.key}
              onChange={this.handleFilterChangeKey}
              renderMenuItem={(itm, key) => {
                return (
                  <MenuItem key={key} value={itm.key} onClick={() => {}}>
                    {itm.label}
                  </MenuItem>
                );
              }}
            />

            <InputSelect
              className="item-filter"
              label="Value"
              width="50%"
              onChange={this.handleFilterChangeValue}
              data={
                filterChanged.key
                  ? filter.find((itm) => itm.key === filterChanged.key).value
                  : []
              }
              value={filterChanged.value}
              defaultValue="All"
              attrKey={{
                value: "value",
                label: "label",
              }}
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
          {studiesData.length > 0 ? (
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
          ) : (
            <TableDataNotFound />
          )}
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
  height: ${(props) => props.height};
  .filter {
    display: flex;
    .item-filter {
      margin-right: 8px;
    }
  }
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
  height: 100%;
`;
