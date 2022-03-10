import { Edit, Image } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import DefaultAvatar from "../../assets/images/avatardefault.png";
import BoxCustom from "../../components/Box";
import ButtonCustom from "../../components/Button/Button";
import FormAccount from "../../components/Form/Account/FormAccount";
import InputFIle from "../../components/Form/InputFile";
import { FormPersonalData } from "../../components/Form/Signup";
import Paper from "../../components/Paper";
import { Subtitle } from "../../components/Text";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";
import utilities from "../../utils/utilities";

class Profile extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.user = TokenService.getUser().data;
    this.state = {
      data: {
        study_master: "",
        burger_service_nummer: "",
        family_name: "",
        front_name: "",
        gender: "",
        birthday: "",
        address: "",
        postal_code: "",
        email: "",
        profile_id: "",
        old_password: "",
        new_password: "",
        renew_password: "",
        avatar: undefined,
      },
      userId: "",
      avatar: "",
      errors: {},
      disabled: {
        email: true,
        burger_service_nummer: true,
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value,
      },
    });
  };

  handleSubmit = async (e) => {
    const { name } = e.target;
    const {
      old_password,
      email,
      new_password,
      burger_service_nummer,
      birthday,
      postal_code,
      address,
      front_name,
      family_name,
      profile_id,
      gender,
    } = this.state.data;
    const isValid = true;
    if (name === "edit_profile") {
      const res = await Api.post("/profile/update", {
        id: profile_id,
        burger_service_nummer,
        birthday,
        postal_code,
        address,
        front_name,
        family_name,
        gender,
      });
      if (res.data.code === 200 && res.data.success) {
        Swal.fire({
          title: "Successfull!",
          text: "Your Profile has been updated!",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((confirm) => {
          this.setState({
            ...this.state,
            new_password: "",
            old_password: "",
            renew_password: "",
          });
        });
      } else {
        Swal.fire({
          title: "Update Profile Failed!",
          text: res.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        }).then((confirm) => {
          this.setState({
            ...this.state,
            new_password: "",
            old_password: "",
            renew_password: "",
          });
        });
      }
    } else if (name === "edit_account") {
      const res = await Api.post("/changepwd", {
        email,
        new_password,
        old_password,
      });
      console.log(res);
      if (res.data.code === 200 && res.data.success) {
        Swal.fire({
          title: "Successfull!",
          text: "Your password has been changed!",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((confirm) => {
          this.setState({
            ...this.state,
            new_password: "",
            old_password: "",
            renew_password: "",
          });
        });
      } else if (res.data.code === 100) {
        Swal.fire({
          title: "Change Password Failed!",
          text: res.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        }).then((confirm) => {
          this.setState({
            ...this.state,
            new_password: "",
            old_password: "",
            renew_password: "",
          });
        });
      }
    }
  };

  changeAvatar = async (e) => {
    const { files, name } = e.target;
    const formdata = new FormData();
    formdata.append("id", this.state.data.profile_id);
    formdata.append("avatar", files[0]);
    try {
      const resp = await Api.post("/profile/updateFile", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (resp.data.success && resp.data.code === 200) {
        this.fetchAvatar(this.state.data.profile_id);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  async fetchAvatar(id) {
    try {
      const res = await Api.post(
        "/profile/getfile",
        { id, file: "avatar" },
        { responseType: "blob" }
      );
      utilities.readBlobAsText(res.data, (string) => {
        const isJSON = utilities.isJsonString(string);
        if (isJSON) {
          const response = JSON.parse(string);
          if (response.code === 404) {
            this.setState({ avatar: "" });
          }
        } else {
          utilities.readFileBlob(res.data, (response) => {
            this.setState({ avatar: response });
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async fetchUser(id) {
    try {
      const res = await Api.post("/userbyid/", { id });
      const {
        data: { data },
      } = res;
      if (res.status === 200 && res.data.code === 200) {
        this._isMounted &&
          this.setState({
            data: {
              ...this.state.data,
              burger_service_nummer: data.profile.burger_service_nummer,
              birthday: data.profile.birthday,
              address: data.profile.address,
              email: data.email,
              family_name: data.profile.family_name,
              front_name: data.profile.front_name,
              postal_code: data.profile.postal_code,
              gender: data.profile.gender,
              profile_id: data.profile.id,
              is_profile: data.is_profile,
            },
          });
        this.fetchAvatar(data.profile.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this._isMounted = true;
    const user = TokenService.getUser();

    const userId = user.data.id;
    this.setState({
      userId,
    });
    this._isMounted && this.fetchUser(userId);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { data, errors, disabled, avatar } = this.state;

    return (
      <Wrap>
        <Grid container spacing={1}>
          <Grid className="col wrap-avatar" item lg={2}>
            <div className="imagecontainer">
              <img src={avatar ? avatar : DefaultAvatar} alt="avatar" />
            </div>
            <InputFIle
              label="Change Avatar"
              onChange={this.changeAvatar}
              name="avatar"
            />
            <div className="doc-img-user">
              {this.user.role_id === "2" && (
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Image fontSize="small" />}
                >
                  Proof Of Teacher Grade
                </Button>
              )}
              {this.user.role_id === "3" && (
                <>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ mb: "8px" }}
                    fullWidth
                    startIcon={<Image fontSize="small" />}
                  >
                    Passport/Identity Card
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<Image fontSize="small" />}
                    fullWidth
                  >
                    Grade(s)
                  </Button>
                </>
              )}
            </div>
          </Grid>
          <Grid className="col wrap-profile" item lg={5}>
            <Paper>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  p: "10px",
                }}
              >
                <Subtitle>
                  <span>My Profile</span>
                </Subtitle>
                <Button
                  onClick={this.handleSubmit}
                  name="edit_profile"
                  size="small"
                  color="primary"
                  variant="contained"
                >
                  Save Changes
                </Button>
              </Box>

              <FormPersonalData
                className="form-personal"
                errors={errors}
                data={data}
                disabled={disabled}
                onChange={(e) => this.handleChange(e)}
                isProfile={true}
              />
            </Paper>
          </Grid>
          <Grid item lg={5} className="col wrap-profile">
            <Paper className="paper">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Subtitle>
                  <span>My Account</span>
                </Subtitle>
                <Button
                  onClick={this.handleSubmit}
                  name="edit_account"
                  size="small"
                  color="primary"
                  variant="contained"
                >
                  Save Changes
                </Button>
              </Box>
              <FormAccount
                className="form-account"
                errors={errors}
                disabled={disabled}
                data={data}
                onChange={this.handleChange}
              />
            </Paper>
          </Grid>
        </Grid>
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  /* background: red; */
  .wrap-avatar {
    /* background: yellow; */
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    text-align: center;
    .imagecontainer {
      width: 180px;
      height: 180px;
      background: white;
      overflow: hidden;

      border-radius: 100%;
      margin-bottom: 30px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .doc-img-user {
      margin-top: 20px;
      .btn-prev {
        margin-bottom: 5px;
      }
    }
  }
  .wrap-profile {
    padding: 30px;
    .paper {
      padding: 10px;
      .form-account {
        padding: 0 10px;
        margin-top: 12px;
      }
    }
  }
`;

export default Profile;
