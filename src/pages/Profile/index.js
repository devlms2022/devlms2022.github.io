import { Grid } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import DefaultAvatar from "../../assets/images/avatardefault.png";
import BoxCustom from "../../components/Box";
import ButtonCustom from "../../components/Button/Button";
import FormAccount from "../../components/Form/Account/FormAccount";
import InputFIle from "../../components/Form/InputFile";
import { FormPersonalData } from "../../components/Form/Signup";
import { Subtitle } from "../../components/Text";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";
import utilities from "../../utils/utilities";

class Profile extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
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
          <Grid className="col wrap-avatar" item sm={3} xs={12}>
            <div className="imagecontainer">
              <img src={avatar ? avatar : DefaultAvatar} alt="avatar" />
            </div>
            <InputFIle
              label="Change Avatar"
              onChange={this.changeAvatar}
              name="avatar"
            />
          </Grid>
          <Grid className="col wrap-profile" item sm={5} xs={12}>
            <BoxCustom mb={1} direction="row" justify="space-between">
              <Subtitle>
                <span>My Profile</span>
              </Subtitle>
              <ButtonCustom
                name="edit_profile"
                onClick={this.handleSubmit}
                variant="outlined"
              >
                EDIT PROFILE
              </ButtonCustom>
            </BoxCustom>
            <FormPersonalData
              className="form-personal"
              errors={errors}
              data={data}
              disabled={disabled}
              onChange={(e) => this.handleChange(e)}
              isProfile={true}
            />
          </Grid>
          <Grid item sm={4} xs={12} className="col wrap-profile">
            <BoxCustom mb={1} direction="row" justify="space-between">
              <Subtitle>
                <span>My Account</span>
              </Subtitle>
              <ButtonCustom
                onClick={this.handleSubmit}
                name="edit_account"
                variant="outlined"
              >
                EDIT ACCOUNT
              </ButtonCustom>
            </BoxCustom>
            <FormAccount
              className="form-account"
              errors={errors}
              disabled={disabled}
              data={data}
              onChange={this.handleChange}
            />
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
      width: 250px;
      height: 250px;
      background: white;
      overflow: hidden;
      border-radius: 100%;
      margin-bottom: 30px;
      img {
        width: 100%;
        /* height: 100%; */
      }
    }
  }
  .wrap-profile {
    padding: 30px;
  }
`;

export default Profile;
