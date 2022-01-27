import { Grid } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import HeaderContent from "../../../components/Header/HeaderContent";
import Paper from "../../../components/Paper";
import { Api } from "../../../services/api";
import TokenService from "../../../services/token.services";
import utilities from "../../../utils/utilities";

export default class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSign: {},
      coursesData: [],
      coruseSection: {},
      study: {},
      limit: 10,
      page: 0,
      totalData: 0,
      search: "",
    };
    this.sectionId = this.props.match.params.sectionId;
  }

  fetchDataCourse = () => {
    const { limit, page, search } = this.state;
    Api.post("/courses", {
      limit,
      page,
      search,
      filter: {
        id_course_section: this.sectionId,
      },
    })
      .then((resp) => {
        if (resp.data.code === 200 && resp.status === 200) {
          this.setState({
            coursesData: resp.data.data,
          });
        }
      })
      .catch((err) => alert(err.message));
  };

  fetchDataCourseSection = () => {
    Api.post("/courses_sectionsbyid", {
      id: this.sectionId,
    })
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          this.setState({
            coruseSection: response.data.data,
          });
        }
      })
      .catch((err) => alert(err.message));
  };

  fetchDataStudy = (id) => {
    Api.post("/master_studybyid", {
      id,
    })
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          this.setState({
            study: response.data.data,
          });
        }
      })
      .catch((err) => alert(err.message));
  };

  handleSave = (value) => {
    const params = {
      title: value,
      id_study: this.masterstudyid,
      created_by: this.state.userSign.id,
    };
    Api.post("/courses/insert", params)
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          this.fetchDataCourse();
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  componentDidMount = () => {
    const userSign = TokenService.getUser();
    this.fetchDataCourse();
    this.fetchDataCourseSection();
    this.fetchDataStudy();
    this.setState({ userSign: userSign.data });
  };

  render() {
    const { coursesData, coruseSection, study } = this.state;

    return (
      <Grid container spacing={2}>
        <Grid item xl={3} xs={12} sm={12} md={4}>
          {utilities.objectLength(coursesData) > 0 && (<>
            <WrapContent>
              <HeaderContent title="Back to Section" goBack={this.props.history.goBack()} />
            </WrapContent>
          </>)}
        </Grid>
        <Grid item xl={9} xs={12} sm={12} md={8}>
          <WrapContent>kanan</WrapContent>
        </Grid>
      </Grid>
    );
  }
}

const WrapContent = styled(Paper)`
  padding: 12px;
  max-height: 695px;
  display: flex;
  flex-direction: column;

  .header {
    margin-bottom: 20px;
  }
  .img-container-thumbnail {
    width: 100%;
    position: relative;
    object-fit: cover;
    overflow: hidden;
    /* background : red; */
    border-radius: 15px;
    height: 256px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .label-topic {
    margin: 10px 0;
    display: block;
  }
  span.title {
    font-weight: 500;
    font-size: 18px;
  }
  .teacher_name {
    font-size: 10px;
    color: #848484;
  }
  .user-group {
    span {
      font-size: 12px;
      font-weight: 500;
    }
  }
  .description {
    margin-top: 10px;
    div {
      font-size: 10px;
      text-align: justify;
    }
    p {
      font-size: 10px;
      text-align: justify;
    }
  }
`;
