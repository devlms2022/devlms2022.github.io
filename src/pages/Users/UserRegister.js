import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Component, useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import DefContainerImg from "../../assets/images/imgcontainer.png";
import BoxCustom from "../../components/Box";
import ButtonCustom from "../../components/Button/Button";
import DialogCustome from "../../components/Dialog";
import Input from "../../components/Form/Input";
import Search from "../../components/Form/Search";
import FormPersonalData from "../../components/Form/Signup/FormPersonalData";
import Navtab from "../../components/Navtab";
import Paper from "../../components/Paper";
import { TableUser } from "../../components/Table";
import { Label } from "../../components/Text";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";
import util from "../../utils/utilities";

function CardImageRegister(props) {
  const { role, data, profileid } = props;
  const [proof_teacher_grade, set_proof_teacher_grade] = useState(null);
  const [grades, set_grades] = useState(null);
  const [identity_card, set_identity_card] = useState(null);

  useEffect(() => {
    async function getData() {
      if (role === "2") {
        const proofTeacherGrade = await Api.post(
          "/profile/getFile",
          {
            id: profileid,
            file: "proof_teacher_grade",
          },
          { responseType: "blob" }
        );
  
        util.cekFile(proofTeacherGrade.data, (response) => {
          if (response) set_proof_teacher_grade(response);
        });
      } else if (role === "3") {
        const identity_card = await Api.post(
          "/profile/getFile",
          {
            id: profileid,
            file: "identity_card",
          },
          { responseType: "blob" }
        );
        util.cekFile(identity_card.data, (response) => {
          if (response) set_identity_card(response);
        });
        const grades = await Api.post(
          "/profile/getFile",
          {
            id: profileid,
            file: "grades",
          },
          { responseType: "blob" }
        );
        util.cekFile(grades.data, (response) => {
          if (response) set_grades(response);
        });
      }
    }
    getData();
   
  }, [role]);

  if (role === "2") {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Input
            width="100%"
            inputProps={{ readOnly: true }}
            value={data.reg_code_branch}
            label="Registration of the code on branche"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <BoxCustom width="100%" justify="center" align="center">
            <Label>Proof Of Teacher Grade</Label>
            <ImgContainer>
              <img
                src={
                  proof_teacher_grade ? proof_teacher_grade : DefContainerImg
                }
                alt="default-conainer-img"
              />
            </ImgContainer>
          </BoxCustom>
        </Grid>
      </Grid>
    );
  } else if (role === "3") {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BoxCustom width="100%" justify="center" align="center">
            <Label>Passport/Identity Card</Label>
            <ImgContainer>
              <img
                src={identity_card ? identity_card : DefContainerImg}
                alt="default-conainer-img"
              />
            </ImgContainer>
          </BoxCustom>
        </Grid>
        <Grid item xs={12} md={6}>
          <BoxCustom width="100%" justify="center" align="center">
            <Label variant="bold">Grades</Label>
            <ImgContainer>
              <img
                src={grades ? grades : DefContainerImg}
                alt="default-conainer-img"
              />
            </ImgContainer>
          </BoxCustom>
        </Grid>
      </Grid>
    );
  }
  return <></>;
}

export default class UserRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userSign: {},
      role_id: 3,
      search: "",
      page: 0,
      limit: 10,
      totalData: 0,
      shownModalDetail: false,
      registerDetail: {
        id: "",
        role_id: 0,
        profile_id: "",
        burger_service_nummer: "",
        family_name: "",
        front_name: "",
        gender: "",
        birthday: "",
        address: "",
        postal_code: "",
        reg_code_branch: "",
        email: "",
        proof_teacher_grade: undefined,
        grades: undefined,
        identity_card: undefined,
      },
      listStudies: [],
      navIndexActive: 0,
    };
  }

  componentDidMount = () => {
    this.getUsers();
    this.getStudyMaster();
    const userSign = TokenService.getUser();
    this.setState({ userSign: userSign.data });
  };

  getUsers = async () => {
    const { page, limit } = this.state;
    const response = await Api.post("/user", {
      filter: {
        status: "waiting",
        role_id: this.state.role_id,
      },
      search: this.state.search,
      page,
      limit,
    });
    this.setState({
      users: response.data.data,
      totalData: response.data.total,
    });
  };

  getUserById = async (id) => {
    const response = await Api.post("/userbyid", {
      id,
    });
    const {
      data: { data },
    } = response;

    this.setState({
      registerDetail: {
        id: data.id,
        role_id: data.role_id,
        profile_id: data.profile_id,
        burger_service_nummer: data.profile.burger_service_nummer,
        family_name: data.profile.family_name,
        front_name: data.profile.front_name,
        gender: data.profile.gender,
        birthday: data.profile.birthday,
        address: data.profile.address,
        postal_code: data.profile.postal_code,
        reg_code_branch: data.profile.reg_code_branch,
        email: data.email,
      },
    });
  };

  getStudyMaster = async () => {
    const response = await Api.post("/master_study", {
      limit: 1000,
    });
    const {
      data: { data },
    } = response;

    this.setState({
      listStudies: data,
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

  handleAction = ({ id, status }) => {
    Api.post("/activate", {
      id,
      status,
      id_role : this.state.registerDetail.role_id, 
    })
      .then((res) => {
        if (res.status === 200 && res.data.code === 200) {
          this.getUsers();
          this.setState({
            shownModalDetail: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSwitch = (role) => {
    role = role === "teacher" ? 2 : 3;
    this.setState({ role_id: role });
  };

  handleSearch = (keyword) => {
    this.setState({
      search: keyword,
    });
  };

  handleDetailClicked = (id) => {
    this.setState({ shownModalDetail: true });
    this.getUserById(id);
  };

  handleActionDetail = (e, id) => {
    const { name } = e.target;

    Swal.fire({
      title: name.toUpperCase(),
      text: `Are you sure you want to ${name} this registrant?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Ok",
    }).then((confirm) => {
      if (confirm.isConfirmed) {
        this.handleAction({ id, status: name });
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.role_id !== this.state.role_id) {
      this.getUsers();
    }
    if (prevState.search !== this.state.search) {
      this.getUsers();
    }
    if (prevState.search !== this.state.search) {
      this.getUsers();
    }
    if (
      prevState.page !== this.state.page ||
      prevState.limit !== this.state.limit
    ) {
      this.getUsers();
    }
  }

  render() {
    const {
      users,
      page,
      limit,
      totalData,
      shownModalDetail,
      registerDetail,
      listStudies,
      navIndexActive,
    } = this.state;

    const tabs = [
      {
        label: "Students",
        name: "student",
      },
      {
        label: "Teachers",
        name: "teacher",
      },
    ];

    return (
      <WrapContent>
        <Grid className="filter" container spacing={3}>
          <Grid sm={12} md={3} xl={3} lg={3} item>
            <Box>
              <Navtab
                navIndexActive={navIndexActive}
                tabsData={tabs}
                onClick={(e, indexNav) => {
                  this.setState({ navIndexActive: indexNav });
                  this.handleSwitch(e.target.name);
                }}
              />
            </Box>
          </Grid>
          <Grid item sm={12} md={4} lg={4} xl={4}></Grid>
          <Grid sm={12} md={5} xl={5} lg={5} item>
            <Search
              onChange={this.handleSearch}
              width="100%"
              placeholder="Search..."
            />
          </Grid>
        </Grid>
        <TableUser
          actionClicked={this.handleAction}
          data={users}
          total={totalData}
          page={page}
          limit={limit}
          onChangePage={this.handleChangePage}
          onChangeRowPerpage={this.handleChangeRowsPerPage}
          onClickDetail={(id) => this.handleDetailClicked(id)}
        />
        <DialogCustome
          maxWidth="lg"
          title="Detail User Register"
          open={shownModalDetail}
          showSaveButton={false}
          onClose={() => this.setState({ shownModalDetail: !shownModalDetail })}
        >
          <Grid sx={{ width: "100%" }} container spacing={4}>
            <Grid item sm={12} md={5}>
              <FormPersonalData
                forDetail
                listStudies={listStudies}
                data={registerDetail}
              />
            </Grid>
            <Grid item md={7} sm={12}>
              <WrapContent>
                <Grid style={{ marginBottom: "9px" }} container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ width: "100%", marginBottom: "10px" }}>
                      <InputLabel>Role</InputLabel>
                      <Select
                        autoWidth
                        value={registerDetail.role_id}
                        label="Role"
                        inputProps={{
                          readOnly: true,
                        }}
                      >
                        <MenuItem value="0">Select</MenuItem>
                        <MenuItem value="2">Teacher</MenuItem>
                        <MenuItem value="3">Student</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Input
                      width="100%"
                      label="Email"
                      value={registerDetail.email}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Input
                      width="100%"
                      label="Study"
                      value="Study"
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>

                <CardImageRegister
                  data={{
                    reg_code_branch: registerDetail.reg_code_branch,
                  }}
                  role={registerDetail.role_id}
                  profileid={registerDetail.profile_id}
                />
              </WrapContent>
              <BoxCustom
                height="6rem"
                justify="space-between"
                px="2.8rem"
                width="100%"
              >
                <ButtonCustom
                  fullWidth
                  name="accept"
                  onClick={(e) => this.handleActionDetail(e, registerDetail.id)}
                >
                  Accept
                </ButtonCustom>
                <Button
                  fullWidth
                  color="error"
                  name="reject"
                  onClick={(e) => this.handleActionDetail(e, registerDetail.id)}
                  variant="contained"
                >
                  Reject
                </Button>
              </BoxCustom>
            </Grid>
          </Grid>
        </DialogCustome>
      </WrapContent>
    );
  }
}

const WrapContent = styled(Paper)`
  padding: 15px;
  margin-bottom: 15px;
`;

const ImgContainer = styled.div`
  width: 250px;
  background-color: var(--background-light-color);
  padding: 12px;
  height: 195px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;
