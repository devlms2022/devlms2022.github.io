import { Book } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import UploadImgDefault from "../../../assets/images/uploadvideo.png";
import { Api } from "../../../services/api";
import utilities from "../../../utils/utilities";
import BoxCustom from "../../Box";
import HeaderContent from "../../Header/HeaderContent";
import Paper from "../../Paper";
import CircularLabel from "../../Progress/CircularLabel";
import BaseTabs from "../../Tabs";
import { Label, Subtitle, TextLight } from "../../Text";
import Input from "../Input";

const DetailCourse = (props) => {
  const { data, persentaseLoad, onClose } = props;
  const [blobvideo, setBlob] = useState(null);
  const [videoUrl, setvideoUrl] = useState(
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
                setBlob("");
              }
            } else {
              utilities.readFileBlob(res.data, (response) => {
                setBlob(response);
              });
            }
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  useEffect(() => {
    if (!data.is_video_embed) {
      getVideo();
    }
  }, []);

  const video = data.is_video_embed ? videoUrl : blobvideo;

  return (
    <WrapContent>
      <div className="title">
        <HeaderContent title="Detail Course" shownGoBack={false} />
        <div className="btn-group">
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
        </div>
      </div>
      <div className="content">
        <BoxCustom direction="row" align="center">
          <Book sx={{ mr: "10px" }} />
          <Subtitle variant={"600"}>{data?.title_course}</Subtitle>
        </BoxCustom>
        <BoxCustom mt={"10px"}>
          <TextLight>
            Created at {moment(data.created_at).format("LL")}{" "}
          </TextLight>
          <div className="topic-tag"></div>
        </BoxCustom>
        <div className="section">
          <BoxCustom
            className="section-video"
            justify="center"
            width="100%"
            direction="row"
          >
            <div className="contain-video">
              <video width="100%" controls>
                <source src={"https://www.youtube.com/watch?v=B1ynHmn0XZ4&list=RD797liGPCzSk&index=4"}></source>
              </video>
            </div>
          </BoxCustom>
          <div
            dangerouslySetInnerHTML={{ __html: data.description }}
            className="description"
          />
        </div>
      </div>
    </WrapContent>
  );
};

export default DetailCourse;

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

  .content {
    overflow: hidden;
    /* position: relative; */
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    .section {
      /* height: 100%; */
      padding: 5px;
      .section-video {
        margin: 10px 0;
        .contain-video {
          width: 80%;
          @media screen and (max-width: 1080px) {
            width: 100%;
          }
        }
      }
      .description {
        margin: 15px 0;
        p {
          text-align: justify;
          font-size: 12px;
        }
      }
    }
  }
`;
