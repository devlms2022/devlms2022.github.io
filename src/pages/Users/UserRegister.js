import React, { Component, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import styled from "styled-components";
import Swal from "sweetalert2";
import DefContainerImg from "../../assets/images/imgcontainer.png";
import BoxCustom from "../../components/Box";
import ButtonCustom from "../../components/Button/Button";
import DialogCustome from "../../components/Dialog";
import Input from "../../components/Form/Input";
import Search from "../../components/Form/Search";
import FormPersonalData from "../../components/Form/Signup/FormPersonalData";
import HeaderContent from "../../components/Header/HeaderContent";
import TableDataNotFound from "../../components/Label/TableDataNotFound";
import Navtab from "../../components/Navtab";
import Paper from "../../components/Paper";
import { TableUser } from "../../components/Table";
import { Label } from "../../components/Text";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";
import util from "../../utils/utilities";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

function CardImageRegister(props) {
  const { role, data, profileid } = props;
  const [proof_teacher_grade, set_proof_teacher_grade] = useState(null);
  const [grades, set_grades] = useState(null);
  const [identity_card, set_identity_card] = useState(null);
  const [loadViewImage, setLoadViewImage] = useState("");

  const onClickImage = (e) => {
    const { id } = e.target;
    setLoadViewImage(id);
  };

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
              {loadViewImage === "proof_teacher_grade" ? (
                <Lightbox
                  image={
                    proof_teacher_grade ? proof_teacher_grade : DefContainerImg
                  }
                  alt="default-conainer-img"
                  className="img"
                  title="Proof Of Teacher Grade"
                  onClose={() => setLoadViewImage("")}
                />
              ) : (
                <img
                  src={
                    proof_teacher_grade ? proof_teacher_grade : DefContainerImg
                  }
                  alt="default-conainer-img"
                  className="img"
                  id="proof_teacher_grade"
                  title="Proof Of Teacher Grade"
                  onClick={onClickImage}
                />
              )}
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
              {loadViewImage === "identity_card" ? (
                <Lightbox
                  startIndex={0}
                  image={identity_card ? identity_card : DefContainerImg}
                  alt="default-conainer-img"
                  title="Passport/Identity Card"
                  className="img"
                  onClose={() => setLoadViewImage("")}
                />
              ) : (
                <img
                  src={identity_card ? identity_card : DefContainerImg}
                  alt="default-conainer-img"
                  className="img"
                  id="identity_card"
                  onClick={onClickImage}
                />
              )}
            </ImgContainer>
          </BoxCustom>
        </Grid>
        <Grid item xs={12} md={6}>
          <BoxCustom width="100%" justify="center" align="center">
            <Label variant="bold">Grades</Label>
            <ImgContainer>
              {loadViewImage === "grades" ? (
                <Lightbox
                  image={grades ? grades : DefContainerImg}
                  alt="default-conainer-img"
                  className="img"
                  title="Grades"
                  onClose={() => setLoadViewImage("")}
                />
              ) : (
                <img
                  src={grades ? grades : DefContainerImg}
                  alt="default-conainer-img"
                  className="img"
                  id="grades"
                  onClick={onClickImage}
                />
              )}
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
        id_course: "",
        id_study: "",
        id_faculty: "",
      },
      listStudies: [],
      listFaculties: [],
      listCourses: [],
      navIndexActive: 0,
    };
  }

  componentDidMount = () => {
    this.getUsers();
    this.getStudyMaster();
    this.getFacultyMaster();
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

  getUserClassById = async (id) => {
    const response = await Api.post("/classes", {
      find: {
        id_user: id,
        status_confirm: "pending",
      },
    });
    const {
      data: { data },
    } = response;

    this.setState({
      registerDetail: {
        id: data.id_user,
        role_id: data.user.role_id,
        profile_id: data.user.profile_id,
        burger_service_nummer: data.user.profile.burger_service_nummer,
        family_name: data.user.profile.family_name,
        front_name: data.user.profile.front_name,
        gender: data.user.profile.gender,
        birthday: data.user.profile.birthday,
        address: data.user.profile.address,
        postal_code: data.user.profile.postal_code,
        reg_code_branch: data.user.profile.reg_code_branch,
        email: data.user.email,
        id_course: data.master_course.id,
        id_study: data.master_study.id,
        id_faculty: data.master_study.faculty.id,
      },
    });
  };

  getTeacherStudy = async (id) => {
    try {
      const response = await Api.post("/teacher_study", {
        find: {
          id_user: id,
          status_confirm: "pending",
        },
      });
      const {
        data: { data },
      } = response;
      if (response.data.code === 200 || response.status === 200) {
        this.setState({
          registerDetail: {
            id: data.id_user,
            role_id: data.user.role_id,
            profile_id: data.user.profile_id,
            burger_service_nummer: data.user.profile.burger_service_nummer,
            family_name: data.user.profile.family_name,
            front_name: data.user.profile.front_name,
            gender: data.user.profile.gender,
            birthday: data.user.profile.birthday,
            address: data.user.profile.address,
            postal_code: data.user.profile.postal_code,
            reg_code_branch: data.user.profile.reg_code_branch,
            email: data.user.email,
            id_study: data.master_study.id,
            id_faculty: data.master_study.faculty.id,
          },
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!" + error.message,
      });
    }
  };

  getStudyMaster = async () => {
    const { registerDetail } = this.state;
    const filter = {};
    if (registerDetail.id_faculty) {
      filter.id_faculty = registerDetail.id_faculty;
    }
    const response = await Api.post("/master_study", {
      limit: 1000,
      filter,
    });
    const {
      data: { data },
    } = response;

    this.setState({
      listStudies: data,
    });
  };

  getFacultyMaster = async () => {
    try {
      const response = await Api.post("/faculty", {
        limit: 1000,
      });
      const {
        data: { data },
      } = response;
      this.setState({
        listFaculties: data,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!" + error.message,
      });
    }
  };

  getCoursesByStudy = async () => {
    const { registerDetail } = this.state;
    try {
      const response = await Api.post("/master_course", {
        filter: {
          id_study: registerDetail.id_study,
        },
        limit: 1000,
      });
      const {
        data: { data },
      } = response;
      this.setState({
        listCourses: data,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!" + error.message,
      });
    }
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
      id_role: this.state.registerDetail.role_id,
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
    if (this.state.role_id === 2) this.getTeacherStudy(id);
    else if (this.state.role_id === 3) this.getUserClassById(id);
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

    if (
      prevState.registerDetail.id_study !== this.state.registerDetail.id_study
    ) {
      this.getCoursesByStudy();
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
      listCourses,
      listFaculties,
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
      <WrapContent height={this.props.heightContent + "px"}>
        <HeaderContent shownGoBack={false} title="User Register" />
        <Grid className="filter" container spacing={1}>
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
        {users.length > 0 ? (
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
        ) : (
          <TableDataNotFound />
        )}

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
                listCourses={listCourses}
                listFaculties={listFaculties}
                data={registerDetail}
                user={parseInt(registerDetail.role_id)}
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
  height: ${(props) => props.height};
  padding: 15px;
  margin-bottom: 15px;
  .filter {
    margin-top: 5px;
  }
`;

const ImgContainer = styled.div`
  width: 280px;
  /* background-color: var(--background-light-color); */
  padding: 12px;
  height: 230px;
  position: relative;
  overflow: hidden;
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;
