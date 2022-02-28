import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import UploadImgDefault from "../../../assets/images/uploadvideo.png";
import CircularLabel from "../../Progress/CircularLabel";
import BaseTabs from "../../Tabs";
import { Label } from "../../Text";
import Input from "../Input";
import TextEditor from "../TextEditor";

const FormStep1 = ({ handleChange, data }) => {
  return (
    <div className="form">
      <Input
        className="form-control"
        placeholder="Enter Title Course"
        label="Title"
        value={data?.title_course}
        name="title_course"
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
    </div>
  );
};

const FormStep2 = (props) => {
  const { handleChange, data, persentaseLoading } = props;

  return (
    <div className="form">
      <div  className="form-control">
        <Label>Video Introduction</Label>
      </div>
      <FormControl fullWidth className="form-control">
        <InputLabel>Type Video</InputLabel>
        <Select
          onChange={handleChange}
          fullWidth
          name="is_embed_video"
          label="Type Video"
          value={data?.is_embed_video}
          
        >
          <MenuItem value={1}>Embed</MenuItem>
          <MenuItem value={0}>Upload</MenuItem>
        </Select>

        <FormHelperText>
          {/* {errors ? (errors.gender ? errors.gender : "") : ""} */}
        </FormHelperText>
      </FormControl>
      <div>
        {data?.is_embed_video === 1 && (
          <Input
            label="Url Video"
            fullWidth
            value={data?.intro_video}
            onChange={handleChange}
            name="intro_video"
            placeholder="eg. https://www.youtube.com/watch?v=CNbmVEEW-mA&list=RDfhn3VE7G06g&index=11"
          />
        )}
        {data?.is_embed_video === 0 && (
          <div className="upload-container">
            {data.blobVideo && (
              <div className="preview">
                <video width="100%" controls>
                  <source src={data.blobVideo}></source>
                </video>

                {persentaseLoading && (
                  <div className="circular-container">
                    <CircularLabel
                      variant="determinate"
                      color="primary"
                      value={persentaseLoading}
                    />
                  </div>
                )}
              </div>
            )}
            {!data.blobVideo && (
              <>
                <input
                  id={"video"}
                  style={{ display: "none" }}
                  type={"file"}
                  name="intro_video"
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
    </div>
  );
};

const FormAddCourse = (props) => {
  //   const [field, setField] = useState({});
  const {  data, handleChange,  persentaseLoading } = props;

  return (
    <WrapContent>
      <BaseTabs
        tabLabel={["Course", "Video (optional)"]}
        tabPanel={[
          {
            content: (
              <FormStep1
                handleChange={handleChange}
                data={data}
              />
            ),
          },
          {
            content: (
              <FormStep2
                handleChange={handleChange}
                data={data}
                persentaseLoading={persentaseLoading}
              />
            ),
          },
        ]}
      />
    </WrapContent>
  );
};

export default FormAddCourse;

const WrapContent = styled.div`
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
        flex-direction: column;
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
