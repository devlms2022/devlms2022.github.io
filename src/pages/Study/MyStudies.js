import { Grid } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import DialogCustome from "../../components/Dialog";
import FormAddCourse from "../../components/Form/Course/FormAddCourse";
import Search from "../../components/Form/Search";
import SelectChip from "../../components/Form/Select/SelectChip";
import HeaderContent from "../../components/Header/HeaderContent";
import Paper from "../../components/Paper";
import { TableClasses } from "../../components/Table";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";

export default class MyStudies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myStudiesData: [],
      formCourse: {
        id_study: "",
        title_course: "",
        description: "",
        thumbnail: "",
        intro_video: "",
        is_embed_video: 1,
        blobVideo: undefined,
        video: undefined,
      },
      idSelect: "",
      persentaseLoading: 0,
      limit: 10,
      page: 0,
      totalDataMyStudies: 0,
      search: "",
      openDialog: false,
      isLoading: false,
    };
    this.userSign = TokenService.getUser().data;
  }

  fetchData = () => {
    const { limit, page, search } = this.state;
    Api.post("/classes", {
      limit,
      page,
      search,
      filter: {
        id_user: this.userSign.id,
        status_confirm: "accept",
        id_course: null,
      },
    })
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          this.setState({
            myStudiesData: response.data.data,
            totalDataMyStudies: response.data.total,
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
      idSelect: id,
      formCourse: {
        ...this.state.formCourse,
        id_study,
      },
    });
  };

  handleCloseDialog = () => {
    const { openDialog } = this.state;
    if (openDialog) {
      this.setState({
        openDialog: !openDialog,
        formCourse: {
          id_study: "",
          title_course: "",
          description: "",
          thumbnail: "",
          intro_video: "",
          is_embed_video: 1,
          blobVideo: undefined,
          video: undefined,
        },
      });
    } else {
      this.setState({
        openDialog: !openDialog,
      });
    }
  };

  handleSave = async (param) => {
    const { formCourse, idSelect } = this.state;
    const formdata = new FormData();

    formdata.append("title_course", formCourse.title_course);
    formdata.append("description", formCourse.description);
    if (formCourse.is_embed_video === 0) {
      formdata.append("intro_video", formCourse.video);
    } else if (formCourse.is_embed_video === 1) {
      formdata.append("intro_video", formCourse.intro_video);
    }
    formdata.append("is_embed_video", formCourse.is_embed_video);
    formdata.append("created_by", this.userSign.id);
    formdata.append("id_study", formCourse.id_study);

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
          this.setState({ persentaseLoading: parseInt(persentase.toFixed(0)) });
        },
      });

      if (response.status === 200 && response.data.code === 200) {
        Api.post("/classes/update", {
          id: idSelect,
          id_course: response.data.data.id,
        })
          .then((res) => {
            this.fetchData();
            this.handleCloseDialog();
            this.setState({
              isLoading: false,
            });
            Swal.fire("Succesfull!", "The Course has ben created!", "success");
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
      if (this.state.formCourse.is_embed_video === 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          let blobData = e.target.result; //blob data
          this.setState({
            formCourse: {
              ...this.state.formCourse,
              blobVideo: blobData,
              video: files[0],
            },
          });
        };
        reader.readAsDataURL(files[0]);
      } else {
        this.setState({
          formCourse: {
            ...this.state.formCourse,
            [name]: value,
          },
        });
      }
    } else {
      this.setState({
        formCourse: {
          ...this.state.formCourse,
          [name]: value,
        },
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
      myStudiesData,
      totalDataMyStudies,
      limit,
      openDialog,
      search,
      formCourse,
      persentaseLoading,
      page,
      isLoading,
    } = this.state;

    return (
      <WrapContent>
        <HeaderContent shownGoBack={false} title="Set Course" />
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
            data={myStudiesData}
            page={page}
            limit={limit}
            total={totalDataMyStudies}
            role_id={this.userSign.role_id}
            actionClicked={this.handleActionClicked}
            onChangePage={() => {}}
            onChangeRowPerpage={() => {}}
          />
        </WrapClassTable>

        <DialogCustome
          maxWidth="md"
          isLoading={isLoading}
          title="Setup Course "
          open={openDialog}
          onClose={this.handleCloseDialog}
          showSaveButton
          onSave={this.handleSave}
        >
          <FormAddCourse
            data={formCourse}
            persentaseLoading={persentaseLoading}
            handleChange={this.handleChange}
          />
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
  /* height: 300px; */
  max-height: 500px;
`;
