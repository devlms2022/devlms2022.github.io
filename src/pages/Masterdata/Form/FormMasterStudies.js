import { ArrowBack } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import UploadImgDefault from "../../../assets/images/uploadshow.png";
import BoxCustom from "../../../components/Box";
import Input from "../../../components/Form/Input";
import InputFIle from "../../../components/Form/InputFile";
import TextEditor from "../../../components/Form/TextEditor";
import Paper from "../../../components/Paper";
import Tabs from "../../../components/Tabs";
import { Label, Subtitle } from "../../../components/Text";
import { Api } from "../../../services/api";
import TokenService from "../../../services/token.services";

export default class FormMasterStudies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSign: {},
      topicData: [],
      dataInput: {},
      thumbnail: "",
    };
  }

  fetchMasterStudies = () => {
    Api.post("/topic")
      .then((response) => {
        if (response.status === 200 && response.data.code === 200) {
          this.setState({
            topicData: response.data.data,
          });
        }
      })
      .catch((err) => alert(err.message));
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      dataInput: {
        ...this.state.dataInput,
        [name]: value,
      },
    });
  };

  handleChangeFile = (event) => {
    const { name, files } = event.target;

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          [name]: reader.result,
          dataInput: {
            ...this.state.dataInput,
            [name]: files[0],
          },
        });
      }
    };
    reader.readAsDataURL(files[0]);
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { dataInput, userSign } = this.state;
    const formdata = new FormData();
    Object.entries(dataInput).forEach((item) => {
      const attr = item[0];
      const value = item[1];
      if (value) {
        formdata.append(attr, value);
      }
    });
    formdata.append("created_by", userSign.id);

    try {
      const response = await Api.post("/master_studies/insert", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 && response.data.code === 200) {
        this.fetchMasterStudies();
        this.setState({ dataInput: {} });
        this.props.history.goBack();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  handleBlur = (event, editorContents) => {
    this.setState({
      dataInput: {
        ...this.state.dataInput,
        description: editorContents,
      },
    });
  };

  componentDidMount = () => {
    const userSign = TokenService.getUser();
    this.setState({ userSign: userSign.data });
    this.fetchMasterStudies();
  };

  render() {
    const { topicData, thumbnail } = this.state;
    return (
      <PaperStyled>
        <BoxCustom direction="row" width="100%" algin="center">
          <IconButton
            onClick={() => this.props.history.goBack()}
            style={{ marginRight: "10px" }}
            color="primary"
          >
            <ArrowBack />
          </IconButton>
          <Subtitle>Add Study</Subtitle>
        </BoxCustom>
        <form method="post" className="form">
          <Grid container spacing={2}>
            <Grid item xl={6} md={6} xs={12}>
              <Input
                placeholder="Enter Title"
                fullWidth
                label="Title"
                name="title"
                className="form-control"
                onChange={this.handleChange}
              />
              <FormControl fullWidth className="form-control">
                <InputLabel>Topic</InputLabel>
                <Select
                  onChange={this.handleChange}
                  fullWidth
                  //   value={data.gender ? data.gender : ""}
                  name="id_topic"
                  label="Topic"
                  defaultValue=""
                  //   inputProps={{
                  //     readOnly: disabled
                  //       ? disabled.gender
                  //         ? true
                  //         : false
                  //       : forDetail
                  //       ? true
                  //       : false,
                  //   }}
                >
                  {topicData.map((item, index) => (
                    <MenuItem value={item.id} key={index}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText>
                  {/* {errors ? (errors.gender ? errors.gender : "") : ""} */}
                </FormHelperText>
              </FormControl>
              <div className="form-controll">
                <Label>Description</Label>
                <TextEditor
                  onChange={this.handleBlur}
                  name="description"
                  value={this.state.dataInput.description}
                />
              </div>
            </Grid>
            <Grid item xl={6} sm={12} md={6} xs={12}>
              <div className="form-control">
                <Label>Thumbnail</Label>
                <div className="preview-container">
                  <img
                    src={thumbnail ? thumbnail : UploadImgDefault}
                    alt="thumbnail-preview"
                  />
                </div>
                <InputFIle
                  onChange={this.handleChangeFile}
                  label="Upload Thumbnail"
                  name="thumbnail"
                />
              </div>
              <div className="form-control">
                <Label>Introduction of Study</Label>
                <Tabs
                  tabLabel={["Upload", "Embed"]}
                  tabPanel={[
                    {
                      content: () => (
                        <>
                          <div className="preview-container">
                            <img
                              src={UploadImgDefault}
                              alt="intro-video-preview"
                            />
                          </div>
                          <InputFIle label="Upload Video" name="intro_video" />
                        </>
                      ),
                    },
                    {
                      content: () => (
                        <>
                          <div className="preview-container">
                            <Input
                              placeholder="eg. https://www.youtube.com/watch?v=CNbmVEEW-mA&list=RDyJ75APh42Rc&index=9"
                              fullWidth
                              label="Video URL"
                              name="video_embed"
                              className="form-control"
                              onChange={this.handleChange}
                            />
                          </div>
                        </>
                      ),
                    },
                  ]}
                />
              </div>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={this.handleSubmit}
              >
                Save Study
              </Button>
            </Grid>
          </Grid>
        </form>
      </PaperStyled>
    );
  }
}

const PaperStyled = styled(Paper)`
  padding: 15px;

  .form {
    margin-top: 10px;
    .form-control {
      margin-bottom: 25px;
      .preview-container {
        width: 100%;
        height: 162px;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        margin-bottom: 10px;
      }
    }
  }
`;
