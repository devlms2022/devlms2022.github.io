import { Book } from "@mui/icons-material";
import {
  Button
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import styled from "styled-components";
import BoxCustom from "../../Box";
import HeaderContent from "../../Header/HeaderContent";
import Paper from "../../Paper";
import { Subtitle, TextLight } from "../../Text";

const DetailCourse = (props) => {
  const { data, persentaseLoad, onClose } = props;
  const [blobvideo, setBlob] = useState(null);
  const [videoUrl, setvideoUrl] = useState(
    data.is_video_embed ? data.video_materials : ""
  );


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
