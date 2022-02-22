import { Grid } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import Search from "../../components/Form/Search";
import SelectChip from "../../components/Form/Select/SelectChip";
import HeaderContent from "../../components/Header/HeaderContent";
import HeaderContent2 from "../../components/Header/HeaderContent2";
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
    };
    this.userSign = TokenService.getUser().data;
  }

  componentDidMount = () => {
    this.fetchCourseClass();
  };

  fetchCourseClass = () => {
    Api.post("/master_course", {
      limit: this.state.limit,
      page: this.state.page,
      search: this.state.search,
      filter: {
        status: 'propose'
      },
    })
      .then((res) => {
        if (res.data.code === 200 && res.status === 200) {
          this.setState({
            courseData: res.data.data,
          });
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

  render() {
    const { courseData, isLoading } = this.state;
    return (
      <WrapContent>
        <HeaderContent2 shownGoBack={false} title="Course" subtitle="Teacher Course Porpose" />
        <Grid sx={{ marginTop: "5px" }} spacing={1} container>
          <Grid item lg={2} sm={12} md={2} xl={2}/>
          
          <Grid item xs={12} md={4} sm={12} xl={4}>
            <SelectChip
              label="Filter"
              width="30%"
              defaultValue={["Filter"]}
              data={[]}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={7} xl={6}>
            <Search placeholder="Enter Keyword" width="100%" />
          </Grid>
        </Grid>
        <div className="table-container">
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
        </div>
      </WrapContent>
    );
  }
}

export default CoursePorposeList;

const WrapContent = styled(Paper)`
  padding: 12px;
  .table-container {
    padding: 15px 0;
    margin: 15px 0;
    padding-bottom: 15px;
  }
`;