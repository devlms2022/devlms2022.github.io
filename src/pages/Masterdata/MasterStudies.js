import React, { Component } from "react";
import { AddCircle } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import styled from "styled-components";
import DialogCustome from "../../components/Dialog";
import Input from "../../components/Form/Input";
import Search from "../../components/Form/Search";
import InputSelect from "../../components/Form/Select";
import Paper from "../../components/Paper";
import TableStudies from "../../components/Table/TableStudies";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";
import Swal from "sweetalert2";
export default class MasterStudies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      studyData: [],
      facultyData: [],
      page: 0,
      totalData: 0,
      openDialog: false,
      search: "",
      editForm: false,
      study: {
        name_study: "",
        id_faculty: "",
      },
    };
    this.userSign = TokenService.getUser().data;
  }

  fetchStudies = () => {
    const { limit, page, search } = this.state;
    Api.post("/master_study", {
      limit,
      page,
      search,
    })
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          this.setState({
            studyData: response.data.data,
            totalData: response.data.total,
          });
        }
      })
      .catch((error) => alert(error.message));
  };

  fetchStudyById = (id) => {
    Api.post(`/master_studybyid`, {
      id,
    })
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          this.setState({
            study: {
              id,
              name_study: response.data.data.name_study,
              id_faculty: response.data.data.id_faculty,
            },
          });
        }
      })
      .catch((error) => alert(error.message));
  };

  fetchFaculty = () => {
    Api.post("/faculty")
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          this.setState({
            facultyData: response.data.data,
          });
        }
      })
      .catch((error) => alert(error.message));
  };

  saveStudy = () => {
    const { study, editForm, openDialog } = this.state;
    if (editForm) {
      Api.post("/master_study/update", {
        id: study.id,
        name_study: study.name_study,
        id_faculty: study.id_faculty,
      })
        .then((response) => {
          if (response.data.code === 200 && response.status === 200) {
            this.openDialog(openDialog);
            this.fetchStudies();
          }
        })
        .catch((error) => alert(error.message));
    } else {
      Api.post("/master_study/insert", {
        ...study,
        created_by: this.userSign.id,
      })
        .then((response) => {
          if (response.data.code === 200 && response.status === 200) {
            this.openDialog(openDialog);
            this.fetchStudies();
          }
        })
        .catch((error) => alert(error.message));
    }
  };

  deleteStudy = (id) => {
    Api.post("/master_study/delete", {
      id,
    })
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          Swal.fire("Deleted!", "Study has been deleted.", "success");
          this.fetchStudies();
        }
      })
      .catch((error) => alert(error.message));
  };

  openDialog = (openDialog) => {
    if (openDialog) {
      //clear form
      this.setState({
        openDialog: !openDialog,
        study: { name_study: "", id_faculty: "" },
        editForm: false,
      });
    } else {
      this.setState({ openDialog: !openDialog });
    }
  };

  joinStudy = (id) => {
    Api.post("/classes/insert", {
      id_study: id,
      id_user: this.userSign.id,
      status_confirm: "pending",
    })
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          Swal.fire(
            "Request Sending!",
            "Your request to join the study has been sent",
            "success"
          );
          this.fetchStudies();
        } else {
          throw new Error(response.message);
        }
      })
      .catch((error) => alert(error.message));
  };

  handleClickAction = (e, action, id) => {
    if (action === "edit") {
      this.setState({ openDialog: true, editForm: true });
      this.fetchStudyById(id);
    } else if (action === "delete") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "var(--primary-color)",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteStudy(id);
        }
      });
    } else if (action === "join") {
      this.joinStudy(id);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      study: {
        ...this.state.study,
        [name]: value,
      },
    });
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

  componentDidMount = () => {
    this.fetchStudies();
    this.fetchFaculty();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.search !== this.state.search) {
      this.fetchStudies();
    }
    if (prevState.search !== this.state.search) {
      this.fetchStudies();
    }
    if (
      prevState.page !== this.state.page ||
      prevState.limit !== this.state.limit
    ) {
      this.fetchStudies();
    }
  };

  render() {
    const { studyData, openDialog, editForm, facultyData, totalData, study } =
      this.state;

    return (
      <WrapContent>
        <Grid spacing={2} className="head" container>
          <Grid item md={6} xl={6} xs={12}>
            {this.userSign.role_id === "1" && (
              <WrapButton>
                <Button
                  size="small"
                  variant="contained"
                  onClick={this.openDialog.bind(this, openDialog)}
                  startIcon={<AddCircle size="14px" />}
                >
                  ADD STUDY
                </Button>
              </WrapButton>
            )}
          </Grid>
          <Grid item md={6} xl={6} xs={12}>
            <Search width="100%" placeholder="Enter keyword" />
          </Grid>
        </Grid>
        <WrapStudy>
          <TableStudies
            data={studyData}
            page={this.state.page}
            limit={this.state.limit}
            total={totalData}
            actionClicked={this.handleClickAction}
            onChangePage={this.handleChangePage}
            roleId={this.userSign.role_id}
            userId={this.userSign.id}
            onChangeRowPerpage={this.handleChangeRowsPerPage}
          />
        </WrapStudy>
        <DialogCustome
          title={editForm ? "Edit Study" : "Add Study"}
          onClose={this.openDialog.bind(this, openDialog)}
          open={openDialog}
          showSaveButton={true}
          onSave={this.saveStudy}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                label="Title"
                className="form-control"
                name="name_study"
                placeholder="Title of Study"
                onChange={this.handleChange}
                size="small"
                value={study.name_study}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <InputSelect
                fullWidth={true}
                name="id_faculty"
                className="form-control"
                label="Select Faculty"
                attrKey={{
                  value: "id",
                  label: "name",
                }}
                data={facultyData}
                value={study.id_faculty}
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
        </DialogCustome>
      </WrapContent>
    );
  }
}

const WrapContent = styled(Paper)`
  padding: 17px 15px;
`;

const WrapButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;

  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;

const WrapStudy = styled.div`
  padding: 15px 0;
  margin: 15px 0;
  padding-bottom: 15px;
  /* height: 300px; */
  max-height: 500px;
  /* background: red; */
  /* max-height: 200px; */
`;
