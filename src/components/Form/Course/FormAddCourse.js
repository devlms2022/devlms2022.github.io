import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import UploadImgDefault from "../../../assets/images/uploadshow.png";
import UploadVideoDefault from "../../../assets/images/uploadvideo.png";
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
      <div className="form-control">
        <Label>Thumbnail Of Course</Label>
      </div>
      <FormControl fullWidth className="form-control">
        <InputLabel>Type of Thumbnail</InputLabel>
        <Select
          onChange={handleChange}
          fullWidth
          name="is_embed_video"
          label="Type of Thumbnail"
          value={data?.is_embed_video}
        >
          <MenuItem value={2}>Image</MenuItem>
          <MenuItem value={1}>Embed Video</MenuItem>
          <MenuItem value={0}>Upload Video</MenuItem>
        </Select>

        <FormHelperText>
          {/* {errors ? (errors.gender ? errors.gender : "") : ""} */}
        </FormHelperText>
      </FormControl>
      <div>
        {data?.is_embed_video === 1 && (
          <Input
            label="Source"
            fullWidth
            value={data?.intro_video}
            onChange={handleChange}
            name="intro_video"
            placeholder="ex. https://www.youtube.com/watch?v=CNbmVEEW-mA&list=RDfhn3VE7G06g&index=11"
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
                  <img src={UploadVideoDefault} alt="intro-video-preview" />
                  <div>Drop Here Video or Click</div>
                </label>
              </>
            )}
          </div>
        )}
        {data?.is_embed_video === 2 && (
          <div className="upload-container">
            {data.thumbnailImgBlob && (
              <div className="preview">
                <img src={data.thumbnailImgBlob} alt="thumbnail-preview" />
              </div>
            )}
            {!data.thumbnailImgBlob && (
              <>
                <input
                  id={"thumbnail"}
                  style={{ display: "none" }}
                  type={"file"}
                  name="thumbnail"
                  onChange={handleChange}
                />
                <label htmlFor={"thumbnail"} className="upload">
                  <img src={UploadImgDefault} alt="intro-img-preview" />
                  <div>Drop Here Image or Click</div>
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
  const { data, handleChange, persentaseLoading } = props;

  return (
    <WrapContent>
      <BaseTabs
        tabLabel={["Course", "Thumbnail (optional)"]}
        tabPanel={[
          {
            content: <FormStep1 handleChange={handleChange} data={data} />,
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
          max-height: 100%;
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

        img {
          width: 100%;
        }

        .circular-container {
          position: absolute;
          z-index: 99;
          /* width: 100%; */
        }
      }
    }
  }
`;
