import { Grid } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import MyStudyCard from "../../../components/Card/MyStudyCard";
import Paper from "../../../components/Paper";
import BaseTabs from "../../../components/Tabs";
import { Api } from "../../../services/api";
import TokenService from "../../../services/token.services";
import utilities from "../../../utils/utilities";
import SectionList from "./SectionList";
import StudentList from "./StudentList";

export default class CourseSections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSign: {},
      myStudyData: {},
      courseSectionData: [],
      studies: [],
      students: [],
      paramSections: {
        limit: 10,
        page: 0,
        totalDataCourseSections: 0,
        search: "",
      },
      paramStudies: {
        limit: 20,
        page: 0,
        totalDataStudies: 0,
        search: "",
      },
      paramStudents: {
        limit: 20,
        page: 0,
        totalDataStudents: 0,
        search: "",
      },
      thumbnail: "",
      newCourseSections: "",
    };
    this.masterstudyid = this.props.match.params.studyid;
  }

  fetchDataStudies = () => {
    const {
      paramStudies: { limit, page, search },
    } = this.state;
    Api.post("/studies", {
      limit,
      page,
      search,
      filter: {
        study_master: this.masterstudyid,
      },
    })
      .then((resp) => {
        if (resp.data.code === 200 && resp.status === 200) {
          this.setState({
            studies: resp.data.data,
          });
        }
      })
      .catch((err) => alert(err.message));
  };

  fetchDataCourseSections = () => {
    const {
      paramSections: { limit, page, search },
    } = this.state;
    Api.post("/courses_sections", {
      limit,
      page,
      search,
      filter: {
        id_study: this.masterstudyid,
      },
    })
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          this.setState({
            courseSectionData: response.data.data,
          });
        }
      })
      .catch((err) => alert(err.message));
  };

  fetchDataStudy = () => {
    Api.post("/master_studybyid", {
      id: this.masterstudyid,
    })
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          this.setState({
            myStudyData: response.data.data,
          });
          this.fetchThumbnail(response.data.data.id);
        }
      })
      .catch((err) => alert(err.message));
  };

  fetchDataStudents = async () => {
    const {
      paramStudents: { page, limit, search },
    } = this.state;

    try {
      const response = await Api.post("/studies", {
        page,
        limit,
        search,
        filter: {
          role_id: 3,
        },
      });
      if (response.data.code === 200 && response.status === 200) {
        this.setState({ students: response.data.data });
      } else {
        throw Error(response.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  async fetchThumbnail(id) {
    try {
      const res = await Api.post(
        "/master_studies/getfile",
        { id, file: "thumbnail" },
        { responseType: "blob" }
      );

      utilities.readBlobAsText(res.data, (string) => {
        const isJSON = utilities.isJsonString(string);
        if (isJSON) {
          const response = JSON.parse(string);
          if (response.code === 404) {
            this.setState({ thumbnail: "" });
          }
        } else {
          utilities.readFileBlob(res.data, (response) => {
            this.setState({ thumbnail: response });
          });
        }
      });
    } catch (error) {
      alert(error.message);
    }
  }

  handleSaveSectionCourse = (value) => {
    const params = {
      title: value,
      id_study: this.masterstudyid,
      created_by: this.state.userSign.id,
    };
    Api.post("/courses_sections/insert", params)
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          this.fetchDataCourseSections();
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  handleSearchSections = (e) => {
    if (e.key === "enter") {
      this.setState({
        paramSections: {
          ...this.state.paramSections,
          search: e.target.value,
        },
      });
    }
  };

  handleSetCourse = (e, sectionId) => {
    this.props.history.push("/mystudies/setup/course/" + sectionId);
  };

  componentDidMount = () => {
    const userSign = TokenService.getUser();
    this.fetchDataStudy();
    this.fetchDataCourseSections();
    this.fetchDataStudies();
    this.fetchDataStudents();
    this.setState({ userSign: userSign.data });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.paramSections.search !== this.state.paramSections.search) {
      this.fetchDataCourseSections();
    }

    if (
      prevState.paramSections.page !== this.state.paramSections.page ||
      prevState.paramSections.limit !== this.state.paramSections.limit
    ) {
      this.fetchDataCourseSections();
    }
  };

  render() {
    const {
      userSign,
      myStudyData,
      courseSectionData,
      paramSections,
      thumbnail,
      paramStudents,
      students,
    } = this.state;

    return (
      <Grid container spacing={3}>
        <Grid item xl={3} xs={12} sm={12} md={4}>
          {utilities.objectLength(myStudyData) && (
            <>
              <MyStudyCard
                myStudyData={myStudyData}
                sectionTotal={courseSectionData.length}
                studentTotal={students.length}
                teacherUserId={userSign.id}
                thumbnail={thumbnail}
                goBack={() => this.props.history.goBack()}
              />
            </>
          )}
        </Grid>
        <Grid item xl={9} xs={12} sm={12} md={8}>
          <WrapContent>
            <BaseTabs
              tabLabel={["Section", "Students"]}
              tabPanel={[
                {
                  content: () => {
                    return (
                      <SectionList
                        onClickSetCourse={this.handleSetCourse}
                        onSave={this.handleSaveSectionCourse}
                        data={courseSectionData}
                        searchValue={paramSections.search}
                        onSearchEnter={this.handleSearchSections}
                      />
                    );
                  },
                },
                {
                  content: () => {
                    return <StudentList students={students} />;
                  },
                },
              ]}
            />
          </WrapContent>
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
