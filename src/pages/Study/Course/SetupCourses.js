import { Button, Grid } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import ListCourses from "../../../components/Courses/ListCourses";
import FormAddCourse from "../../../components/Form/Course";
import HeaderContent from "../../../components/Header/HeaderContent";
import ListMenuContent from "../../../components/List/ListMenuContent";
import Paper from "../../../components/Paper";
import { Api } from "../../../services/api";
import TokenService from "../../../services/token.services";

export default class SetupCourses extends Component {
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
      sideFeature: [
        {
          title: "List Course",
          isActive: true,
          name: "listcourse",
        },
        {
          title: "Assignment",
          isActive: false,
          name: "assignment",
        },
        {
          title: "Note",
          isActive: false,
          name: "note",
        },
      ],
      shownFormAdd: false,
      isLoading: false,
      persentaseLoad: 0,
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

  handleClickMenu = (name) => {
    const menuItem = this.state.sideFeature.map((item) => {
      return {
        title: item.title,
        name: item.name,
        isActive: false,
      };
    });
    const indexMenuActive = menuItem.findIndex((item) => item.name === name);
    menuItem[indexMenuActive].isActive = true;

    this.setState({
      sideFeature: menuItem,
    });
  };

  handleSave = async (param) => {
    const { userSign } = this.state;
    const formdata = new FormData();
    Object.entries(param).forEach((item) => {
      const attr = item[0];
      const value = item[1];
      if (value) {
        formdata.append(attr, value);
      }
    });
    formdata.append("created_by", userSign.id);
    formdata.append("id_course_section", this.sectionId);

    try {
      this.setState({
        isLoading: true,
      });
      const response = await Api.post("/courses/insert", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const sizeOfFile = progressEvent.total;
          let loadedData = progressEvent.loaded;
          let persentase = (loadedData / sizeOfFile) * 100;
          this.setState({ persentaseLoad: parseInt(persentase.toFixed(0)) });
        },
      });

      if (response.status === 200 && response.data.code === 200) {
        this.fetchDataCourse();
        this.setState({
          shownFormAdd: false,
          isLoading: false,
          persentaseLoad: 0,
        });
        Swal.fire("Succesfull!", "The Course has ben created!", "success");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  componentDidMount = () => {
    const userSign = TokenService.getUser();
    this.fetchDataCourse();
    this.fetchDataCourseSection();
    this.fetchDataStudy();
    this.setState({ userSign: userSign.data });
  };

  render() {
    const {
      coursesData,
      coruseSection,
      study,
      persentaseLoad,
      isLoading,
      sideFeature,
      shownFormAdd,
    } = this.state;
    const menuActive = sideFeature.find((item) => item.isActive === true);
    
    return (
      <Grid container spacing={2}>
        <Grid item xl={3} xs={12} sm={12} md={4}>
          <WrapContent>
            <HeaderContent
              className="header"
              title="Back to Section"
              goBack={() => this.props.history.goBack()}
            />
            <Button
              onClick={() => this.setState({ shownFormAdd: true })}
              className="btn-add"
              variant="contained"
              color="primary"
            >
              Add Course
            </Button>
            <ListMenuContent
              onClickItemMenu={this.handleClickMenu}
              data={sideFeature}
            />
          </WrapContent>
        </Grid>
        <Grid item xl={9} xs={12} sm={12} md={8}>
          {shownFormAdd && (
            <FormAddCourse
              actionDisabled={isLoading}
              persentaseLoad={persentaseLoad}
              onSave={this.handleSave}
              onCancle={() => this.setState({ shownFormAdd: false })}
            />
          )}
          {!shownFormAdd && (
            <WrapContent>
              {menuActive.name === "listcourse" && (
                <ListCourses coruseSection={coruseSection} data={coursesData} />
              )}
            </WrapContent>
          )}
        </Grid>
      </Grid>
    );
  }
}

const WrapContent = styled(Paper)`
  padding: 12px;
  height: 600px;
  display: flex;
  flex-direction: column;

  .label-topic {
    margin: 10px 0;
    display: block;
  }
`;
