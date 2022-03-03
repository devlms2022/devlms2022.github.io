import { AddCircle } from "@mui/icons-material";
import { Box, Button, Grid, MenuItem } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import DialogCustome from "../../components/Dialog";
import { FormAddCourse } from "../../components/Form/Course";
import Search from "../../components/Form/Search";
import InputSelect from "../../components/Form/Select";
import SelectChip from "../../components/Form/Select/SelectChip";
import HeaderContent from "../../components/Header/HeaderContent";
import TableDataNotFound from "../../components/Label/TableDataNotFound";
import Paper from "../../components/Paper";
import { TableCourse } from "../../components/Table";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      courseData: [],
      studyData: [],
      page: 0,
      total: 0,
      limit: 10,
      search: "",
      courseAdd: {
        data: {
          id_study: "",
          title_course: "",
          description: "",
          thumbnail: "",
          intro_video: "",
          is_embed_video: 1,
          blobVideo: undefined,
          video: undefined,
          thumbnailImgBlob: undefined,
        },
        persentaseLoading: 0,
      },
      filter: [
        {
          key: "status",
          label: "Status",
          value: [
            {
              label: "Published",
              value: "accept",
            },
            {
              label: "Draft",
              value: "draft",
            },
            {
              label: "Rejected",
              value: "reject",
            },
          ],
        },
      ],
      filterChanged: {
        key: "",
        value: "",
      },
      openDialog: false,
    };
    this.userSign = TokenService.getUser().data;
  }

  componentDidMount = () => {
    this.fetchMyCourse();
    this.fetchMyStudies();
  };

  fetchMyCourse = () => {
    const filter = {
      id_user: this.userSign.id,
    };

    if (this.state.filterChanged.value !== "") {
      filter[this.state.filterChanged.key] = this.state.filterChanged.value;
    }

    Api.post("/master_course", {
      limit: this.state.limit,
      page: this.state.page,
      search: this.state.search,
      filter,
    })
      .then((res) => {
        if (res.data.code === 200 && res.status === 200) {
          if (
            this.state.filter.find(
              (itm) => itm?.key === "id_study" || itm?.key === "id_faculty"
            )
          ) {
            this.setState({
              courseData: res.data.data,
            });
          } else {
            this.setState({
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

  fetchMyStudies = () => {
    Api.post("/teacher_study", {
      limit: 1000,
      filter: {
        id_user: this.userSign.id,
        status_confirm: "accept",
      },
    })
      .then((res) => {
        if (res.data.code === 200 && res.status === 200) {
          this.setState({
            studyData: res.data.data,
          });
        } else {
          throw new Error(res.data.message);
        }
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

  handleDialog = () => {
    const { openDialog } = this.state;
    if (openDialog) {
      this.setState({
        openDialog: !openDialog,
        is_loading: false,
        courseAdd: {
          data: {
            id_study: "",
            title_course: "",
            description: "",
            thumbnail: undefined,
            intro_video: "",
            is_embed_video: 1,
            blobVideo: undefined,
            video: undefined,
            thumbnailImgBlob: undefined,
          },
          persentaseLoading: 0,
        },
      });
    } else {
      this.setState({
        openDialog: !openDialog,
      });
    }
  };

  handleSaveCourse = async (param) => {
    const {
      courseAdd: { data, persentaseLoading },
    } = this.state;
    const formdata = new FormData();

    formdata.append("title_course", data.title_course);
    formdata.append("description", data.description);
    if (data.is_embed_video === 0) {
      formdata.append("intro_video", data.video);
    } else if (data.is_embed_video === 1) {
      formdata.append("intro_video", data.intro_video);
    }
    if (data.thumbnail) {
      formdata.append("thumbnail", data.thumbnail);
    }
    formdata.append("is_embed_video", data.is_embed_video);
    formdata.append("created_by", this.userSign.id);
    formdata.append("id_study", data.id_study);

    try {
      this.setState({
        isLoading: true,
      });
      const response = await Api.post("/master_course/insert", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const sizeOfFile = progressEvent.total;
          let loadedData = progressEvent.loaded;
          let persentase = (loadedData / sizeOfFile) * 100;
          this.setState({
            ...this.state.courseAdd,
            courseAdd: { persentaseLoading: parseInt(persentase.toFixed(0)) },
          });
        },
      });

      if (response.status === 200 && response.data.code === 200) {
        Api.post("/classes/insert", {
          id_study: data.id_study,
          id_user: this.userSign.id,
          status_confirm: "accept",
          id_course: response.data.data.id,
        })
          .then((res) => {
            if (res.data.code === 200 && res.status === 200) {
              Swal.fire(
                "Succesfull!",
                "The Course has ben created!",
                "success"
              );
              this.handleDialog();
              this.fetchMyCourse();
            }
          })
          .catch((err) => {
            throw new Error(err.message);
          });
        this.setState({
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      alert(error.message);
    }
  };

  handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "intro_video") {
      if (this.state.courseAdd.data.is_embed_video === 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          let blobData = e.target.result; //blob data
          this.setState({
            courseAdd: {
              ...this.state.courseAdd,
              data: {
                ...this.state.courseAdd.data,
                [name]: value,
                blobVideo: blobData,
                video: files[0],
              },
            },
          });
        };
        reader.readAsDataURL(files[0]);
      }
    } if (name === "thumbnail") {
      const reader = new FileReader();
      reader.onload = (e) => {
        let blobData = e.target.result; //blob data
        this.setState({
          courseAdd: {
            ...this.state.courseAdd,
            data: {
              ...this.state.courseAdd.data,
              [name]: 0,
              blobVideo: blobData,
              thumbnail: files[0],
              thumbnailImgBlob: blobData,
            },
          },
        });
      };
      reader.readAsDataURL(files[0]);
    } else {
      this.setState({
        courseAdd: {
          data: {
            ...this.state.courseAdd.data,
            [name]: value,
          },
        },
      });
    }
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
    if (prevState.search !== this.state.search) {
      this.fetchMyCourse();
    }
    if (prevState.filterChanged.value !== this.state.filterChanged.value) {
      this.fetchMyCourse();
    }
  }

  render() {
    const {
      courseData,
      isLoading,
      openDialog,
      studyData,
      courseAdd,
      filter,
      filterChanged,
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
      <WrapContent height={this.props.heightContent + "px"}>
        <HeaderContent
          shownGoBack={false}
          title={this.userSign.role_id === "1" ? "Course List" : "My Course"}
        />
        <Grid sx={{ marginTop: "5px" }} spacing={1} container>
          <Grid item lg={2} sm={12} md={2} xl={2}>
            {this.userSign.role_id === "2" && (
              <Button
                variant="contained"
                size="small"
                startIcon={<AddCircle fontSize="14px" />}
                onClick={this.handleDialog}
              >
                Add Course
              </Button>
            )}
          </Grid>
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
              label="All"
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
          <Grid item xs={12} md={6} sm={7} xl={6}>
            <Search
              placeholder="Enter Keyword"
              onChange={this.handleSearch}
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
        <DialogCustome
          onClose={this.handleDialog}
          open={openDialog}
          onSave={this.handleSaveCourse}
          showSaveButton
          isLoading={isLoading}
          maxWidth="md"
          title="Add Course"
        >
          <Box>
            <InputSelect
              data={studyData}
              label="Select Your Study"
              name="id_study"
              onChange={this.handleChange}
              renderMenuItem={(item, index) => {
                return (
                  <MenuItem value={item.master_study.id} key={index}>
                    {item.master_study.name_study}
                  </MenuItem>
                );
              }}
              defaultValue=""
              value={courseAdd?.data?.id_study}
            />
          </Box>
          <Box>
            <FormAddCourse
              data={courseAdd.data}
              persentaseLoading={courseAdd.persentaseLoading}
              handleChange={this.handleChange}
            />
          </Box>
        </DialogCustome>
      </WrapContent>
    );
  }
}

export default CourseList;

const WrapContent = styled(Paper)`
  padding: 15px;
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
    height: 100%;
    padding-bottom: 15px;
  }
`;
