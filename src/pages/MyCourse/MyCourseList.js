import { Grid, MenuItem, TablePagination } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import MyCourseCard from "../../components/Card/MyCourseCard";
import HeaderContent2 from "../../components/Header/HeaderContent2";
import Paper from "../../components/Paper";
import TokenService from "../../services/token.services";
import Search from "../../components/Form/Search";
import { Api } from "../../services/api";
import TableCourseStudent from "../../components/Table/TableCourseStudent";
import InputSelect from "../../components/Form/Select";

class MyCourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myCourseData: [],
      page: 0,
      limit: 10,
      totalData: 0,
      search: "",
      isLoading: false,
      filter: [],
      filterChanged: {
        key: "",
        value: "",
      },
    };
    this.userSign = TokenService.getUser().data;
  }

  fetchDataMyCourses = async () => {
    const { limit, page, search, filterChanged } = this.state;
    try {
      this.setState({ isLoading: true });
      const filter = {
        id_user: this.userSign.id,
      };
      if(filterChanged.value !== ""){
        filter[filterChanged.key] = filterChanged.value;
      }

      const response = await Api.post("/classes", {
        filter,
        limit,
        page,
        search,
      });
      if (response.data.code === 200) {
        if (
          this.state.filter.find(
            (itm) => itm?.key === "id_study" || itm?.key === "id_faculty"
          )
        ) {
          this.setState({
            myCourseData: response.data.data,
            totalData: response.data.total,
            isLoading: false,
          });
        } else {
          this.setState({
            myCourseData: response.data.data,
            totalData: response.data.total,
            isLoading: false,
            filter: [
              ...this.state.filter,
              {
                key: "id_study",
                label: "Study",
                value: response.data.data.map((itm) => {
                  return {
                    value: itm?.id_study,
                    label: itm?.master_study?.name_study,
                  };
                }),
              },
              {
                key: "id_faculty",
                label: "Faculty",
                value: response.data.data.map((itm) => {
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
        throw new Error(response.data.message);
      }
    } catch (error) {
      this.setState({ isLoading: false });
      alert(error.message);
    }
  };

  componentDidMount() {
    this.fetchDataMyCourses();
  }

  handleClickCourse = (id) => {
    this.props.history.push(`/mycourse/${id}`);
  };

  handleSearch = (key) => {
    this.setState({
      search: key,
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filterChanged.value !== this.state.filterChanged.value) {
      this.fetchDataMyCourses();
    }
    if (prevState.search !== this.state.search) {
      this.fetchDataMyCourses();
    }
  }

  render() {
    const {
      myCourseData,
      isLoading,
      limit,
      page,
      totalData,
      filterChanged,
      filter,
    } = this.state;

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
      <ConentWarp height={this.props.heightContent + "px"}>
        <div>
          <HeaderContent2 title="My Course" subtitle="My Course Enrollment" />
          <Grid sx={{ mb: "10px" }} spacing={1} container>
            <Grid className="filter" item xl={6} md={5} xs={12} sm={12} lg={6}>
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
                defaultValue="All"
                attrKey={{
                  value: "value",
                  label: "label",
                }}
              />
            </Grid>
            <Grid item xl={6} md={7} xs={12} sm={12} lg={6}>
              <Search
                onChange={this.handleSearch}
                placeholder="Enter Keyword"
                width="100%"
              />
            </Grid>
          </Grid>
        </div>
        {/* <Grid className="list" container spacing={1}>
          {myCourseData.map((itm, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <MyCourseCard
                  course={itm.master_course.title_course}
                  idCourse={itm.id}
                  img={itm.master_course.thumbnail}
                  faculty={itm.master_study.faculty.name}
                  study={itm.master_study.name_study}
                  teacherName={"Bagus Fatwan Alfiat"}
                  totalCh={0}
                  totalStudent={0}
                  progress={0}
                  isLoding={isLoading}
                  onClick={this.handleClickCourse}
                />
              </Grid>
            );
          })}
        </Grid> */}
        <TableCourseStudent
          data={myCourseData}
          page={page}
          limit={limit}
          actionClicked={() => {}}
        />
        <TablePagination
          component="div"
          count={totalData}
          page={page}
          rowsPerPage={limit}
          onPageChange={() => {}}
          rowsPerPageOptions={[10, 25, 100]}
          onRowsPerPageChange={() => {}}
        />
      </ConentWarp>
    );
  }
}

export default MyCourseList;

const ConentWarp = styled(Paper)`
  padding: 15px;
  height: ${(props) => props.height};
  .filter {
    display: flex;
    .item-filter {
      margin-right: 8px;
    }
  }
  .list {
    margin-top: 12px;
    padding: 15px;
    height: 450px;
    overflow-y: scroll;
    /* background: red; */
  }
`;
