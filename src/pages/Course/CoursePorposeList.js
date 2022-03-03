import { Grid, MenuItem } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import Search from "../../components/Form/Search";
import InputSelect from "../../components/Form/Select";
import HeaderContent2 from "../../components/Header/HeaderContent2";
import TableDataNotFound from "../../components/Label/TableDataNotFound";
import Paper from "../../components/Paper";
import { TableCourse } from "../../components/Table";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";

class CoursePorposeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      courseData: [],
      page: 0,
      total: 0,
      limit: 10,
      search: "",
      filter: [],
      filterChanged: {
        key: "",
        value: "",
      },
    };
    this.userSign = TokenService.getUser().data;
  }

  handleSearch = (key) => {
    this.setState({
      search: key,
    });
  };

  componentDidMount = () => {
    this.fetchCourseClass();
  };

  fetchCourseClass = () => {
    Api.post("/master_course", {
      limit: this.state.limit,
      page: this.state.page,
      search: this.state.search,
      filter: {
        status: "propose",
      },
    })
      .then((res) => {
        if (res.data.code === 200 && res.status === 200) {
          if (
            this.state.filter.find(
              (itm) => itm?.key === "id_study" || itm?.key === "id_faculty"
            )
          ) {
            this.setState({
              isLoading: false,
              courseData: res.data.data,
            });
          } else {
            this.setState({
              isLoading: false,
              courseData: res.data.data,
              filter: [
                ...this.state.filter,
                {
                  key: "id_study",
                  label: "Study",
                  value: res.data.data.map((itm) => {
                    return {
                      value: itm?.id_study,
                      label: itm?.master_study?.name_study,
                    };
                  }),
                },
                {
                  key: "id_faculty",
                  label: "Faculty",
                  value: res.data.data.map((itm) => {
                    return {
                      value: itm?.master_study?.faculty?.id,
                      label: itm?.master_study?.faculty?.name,
                    };
                  }),
                },
              ],
            });
          }
        } else {
          throw new Error(res.data.message);
        }
        // setLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
        });
        alert(err.message);
      });
  };

  handleActionClicked = (e, action, param) => {
    this.props.history.push(`/course/detail/${param.idCourse}`);
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filterChanged.value !== this.state.filterChanged.value) {
      this.fetchCourseClass();
    }
    if (prevState.search !== this.state.search) {
      this.fetchCourseClass();
    }
  }

  render() {
    const { courseData, isLoading, filter, filterChanged } = this.state;

    //filtering duplicate filter values
    let filteredValChanged = [];
    if (filterChanged.key !== "") {
      const finding = filter.find((itm) => itm.key === filterChanged.key).value;
      const values = finding.map((p) => p.value);
      const filteringNoDuplicate = finding.filter(
        ({ value }, index) => !values.includes(value, index + 1)
      );
      filteredValChanged = filteringNoDuplicate;
    }

    return (
      <WrapContent height={this.props.heightContent + "px"}>
        <HeaderContent2
          shownGoBack={false}
          title="Course"
          subtitle="Teacher Course Propose"
        />
        <Grid sx={{ marginTop: "5px" }} spacing={1} container>
          <Grid item lg={2} sm={12} md={2} xl={2} />

          <Grid className="filter" item xs={12} md={4} sm={12} xl={4}>
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
              data={filteredValChanged}
              value={filterChanged.value}
              defaultValue="Value"
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
        <div className="table-container">
          {courseData.length > 0 ? (
            <TableCourse
              data={courseData}
              page={this.state.page}
              limit={this.state.limit}
              total={this.state.total}
              role_id={this.userSign.role_id}
              actionClicked={this.handleActionClicked}
              onChangePage={() => {}}
              onChangeRowPerpage={() => {}}
            />
          ) : (
            <TableDataNotFound />
          )}
        </div>
      </WrapContent>
    );
  }
}

export default CoursePorposeList;

const WrapContent = styled(Paper)`
  padding: 12px;
  height: ${(props) => props.height};
  .filter {
    display: flex;
    .item-filter {
      margin-right: 8px;
    }
  }
  .table-container {
    padding: 15px 0;
    margin: 15px 0;
    padding-bottom: 15px;
  }
`;
