import { Grid, TablePagination } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import MyCourseCard from "../../components/Card/MyCourseCard";
import HeaderContent2 from "../../components/Header/HeaderContent2";
import Paper from "../../components/Paper";
import TokenService from "../../services/token.services";
import Search from "../../components/Form/Search";
import { Api } from "../../services/api";

class MyCourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myCourseData: [],
      page: 0,
      limit: 0,
      totalData: 0,
      isLoading: false,
    };
    this.userSign = TokenService.getUser().data;
  }

  fetchDataMyCourses = async () => {
    const { limit, page } = this.state;
    try {
      this.setState({ isLoading: true });
      const response = await Api.post("/classes", {
        filter: {
          id_user: this.userSign.id,
        },
        limit,
        page,
      });
      if (response.data.code === 200) {
        this.setState({
          myCourseData: response.data.data,
          totalData: response.data.total,
          isLoading: false,
        });
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
    console.log(id);
    this.props.history.push(`/mycourse/${id}`);
  }

  render() {
    const { myCourseData, isLoading, limit, page, totalData } = this.state;
    console.log(totalData);
    return (
      <ConentWarp>
        <div>
          <HeaderContent2 title="My Course" />
          <Grid container>
            <Grid item xl={6} md={5} xs={12} sm={12} lg={6}></Grid>
            <Grid item xl={6} md={7} xs={12} sm={12} lg={6}>
              <Search placeholder="Enter Keyword" width="100%" />
            </Grid>
          </Grid>
        </div>
        <Grid className="list" container spacing={1}>
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
        </Grid>
        <TablePagination
          component="div"
          count={totalData}
          page={page}
          onPageChange={() => {}}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 15, 20]}
          onRowsPerPageChange={() => {}}
        />
      </ConentWarp>
    );
  }
}

export default MyCourseList;

const ConentWarp = styled(Paper)`
  padding: 15px;
  .list {
    margin-top: 12px;
    padding: 15px;
    height: 450px;
    overflow-y: scroll;
    /* background: red; */
  }
`;
