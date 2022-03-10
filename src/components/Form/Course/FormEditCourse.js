import React, { useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import styled from "styled-components";
import UploadImgDefault from "../../../assets/images/uploadvideo.png";

import utilities from "../../../utils/utilities";
import HeaderContent from "../../Header/HeaderContent";
import Paper from "../../Paper";
import CircularLabel from "../../Progress/CircularLabel";
import BaseTabs from "../../Tabs";
import { Label } from "../../Text";
import Input from "../Input";
import { Api } from "../../../services/api";
import Swal from "sweetalert2";
import TextEditor from "../TextEditor";

const FormStep1 = ({ handleChange, handleBlur, data }) => {
  return (
    <form className="form">
      <Input
        className="form-control"
        placeholder="Enter Title Course"
        label="Title"
        value={data?.title_course}
        name="title"
        onChange={handleChange}
        fullWidth
      />
      <div className="form-control">
        <Label>Description</Label>
        <TextEditor
          name="description"
          value={data?.description}
          onChange={handleChange}
        
        />
       
      </div>
    </form>
  );
};

const FormStep2 = (props) => {
  const {
    handleChange,
    data,
    previewVideo,
    persentaseLoad,
    handleDeleteVideo,
  } = props;

  return (
    <form className="form">
      <FormControl fullWidth className="form-control">
        <InputLabel>Type Video</InputLabel>
        <Select
          onChange={handleChange}
          fullWidth
          name="type"
          label="Type Video"
          defaultValue={data.is_video_embed === "1" ? "embed" : "upload"}
          type="url"
        >
          <MenuItem value={"embed"}>Embed</MenuItem>
          <MenuItem value={"upload"}>Upload</MenuItem>
        </Select>

        <FormHelperText>
          {/* {errors ? (errors.gender ? errors.gender : "") : ""} */}
        </FormHelperText>
      </FormControl>
      <div>
        {data?.is_video_embed === "1" && (
          <Input
            label="Video Url"
            fullWidth
            onChange={handleChange}
            name="video_url"
            value={data.video_materials}
            placeholder="eg. https://www.youtube.com/watch?v=CNbmVEEW-mA&list=RDfhn3VE7G06g&index=11"
          />
        )}
        {data?.is_video_embed === "0" && (
          <div className="upload-container">
            {previewVideo && (
              <div className="preview">
                <video width="100%" controls>
                  <source src={previewVideo}></source>
                </video>
                <IconButton
                  onClick={() => handleDeleteVideo(data.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>

                {persentaseLoad !== 0 && (
                  <div className="circular-container">
                    <CircularLabel
                      variant="determinate"
                      color="primary"
                      value={persentaseLoad}
                    />
                  </div>
                )}
              </div>
            )}
            {!previewVideo && (
              <>
                <input
                  id={"video"}
                  style={{ display: "none" }}
                  type={"file"}
                  name="video"
                  onChange={handleChange}
                />
                <label htmlFor={"video"} className="upload">
                  <img src={UploadImgDefault} alt="intro-video-preview" />
                  <div>Drop Here Video or Click</div>
                </label>
              </>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

const FormEditCourse = (props) => {
  //   const [field, setField] = useState({});
  const { onSave, onCancle, actionDisabled, persentaseLoad, data } = props;
  const [title, setTitle] = useState(data.title_course);
  const [description, setDescription] = useState(data.description.toString());
  const [type, setType] = useState(data.is_video_embed ? "embed" : "upload");
  const [video, setVideo] = useState(undefined);
  const [blobVideo, setBlobVideo] = useState("");
  const [videoURL, setVideoURL] = useState(
    data.is_video_embed ? data.video_materials : ""
  );

  const getVideo = () => {
    Api.post(
      "/courses/getfile",
      {
        id: data.id,
        file: "video_materials",
      },
      { responseType: "blob" }
    )
      .then((res) => {
        if (res.status === 200) {
          utilities.readBlobAsText(res.data, (string) => {
            const isJSON = utilities.isJsonString(string);
            if (isJSON) {
              const response = JSON.parse(string);
              if (response.code === 404) {
                setBlobVideo("");
              }
            } else {
              utilities.readFileBlob(res.data, (response) => {
                setBlobVideo(response);
              });
            }
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleDeleteVideo = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--primary-color)",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Api.post(`/courses/deletefile/`, {
          id,
          file: "video_materials",
        })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              setBlobVideo("");
            }
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    });
  };
  useEffect(() => {
    getVideo();
  }, []);

  const handleBlur = (e, editorContents) => {
    setDescription(editorContents);
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "type") {
      setType(value);
    } else if (name === "video") {
      const reader = new FileReader();

      reader.onload = (e) => {
        let blobData = e.target.result; //blob data
        setBlobVideo(blobData);
      };
      reader.readAsDataURL(files[0]);
      setVideo(files[0]);
    } else if (name === "video_url") {
      setVideoURL(value);
    }
  };

  const field = {
    id : data.id,
    title_course: title,
    description,
    is_video_embed: type === "embed" ? "1" : "0",
    video_materials: type === "embed" ? videoURL : video,
  };

  const handleSave = () => {
    onSave(field, data.id);
    setTitle("");
    setDescription("");
    setVideo("");
    setType("");
  };

  return (
    <WrapContent>
      <div className="title">
        <HeaderContent title="Edit Course" shownGoBack={false} />
        <div className="btn-group">
          <Button
            onClick={handleSave}
            sx={{ marginRight: "10px" }}
            variant="contained"
            disabled={actionDisabled}
            startIcon={<Edit />}
          >
            Update
          </Button>
          <Button
            disabled={actionDisabled}
            onClick={onCancle}
            variant="outlined"
          >
            Cancle
          </Button>
        </div>
      </div>

      <BaseTabs
        tabLabel={["Course", "Video"]}
        tabPanel={[
          {
            content: (
              <FormStep1
                handleChange={handleChange}
                handleBlur={handleBlur}
                data={field}
              />
            ),
          },
          {
            content: (
              <FormStep2
                previewVideo={blobVideo}
                handleChange={handleChange}
                data={field}
                handleDeleteVideo={handleDeleteVideo}
                persentaseLoad={persentaseLoad}
              />
            ),
          },
        ]}
      />
    </WrapContent>
  );
};

export default FormEditCourse;

const WrapContent = styled(Paper)`
  padding: 12px;
  height: 600px;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  /* background: red; */
  .form {
    height: 450px;
    margin-top: 15px;
    .form-control {
      margin-bottom: 15px;
    }

    .upload-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      /* background: red; */
      .upload {
        width: 60%;
        @media screen and (max-width: 1080px) {
          width: 100%;
        }
        /* background:  yellow; */
        text-align: center;
        &:hover {
          cursor: pointer;
        }
        /* height: 162px; */
        img {
          width: 100%;
          height: 100%;
          /* object-fit: contain; */
        }
      }
      .preview {
        width: 60%;
        @media screen and (max-width: 1080px) {
          width: 100%;
        }
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .circular-container {
          position: absolute;
          z-index: 99;
          /* width: 100%; */
        }
      }
    }
  }
`;
