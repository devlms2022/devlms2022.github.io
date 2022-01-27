import { Book, Group } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";
import styled from "styled-components";
import BoxCustom from "../Box";
import HeaderContent from "../Header/HeaderContent";
import Paper from "../Paper";

const MyStudyCard = (props) => {
  const { shownHeader = true, myStudyData, thumbnail, goBack } = props;
  return (
    <WrapContent>
      {shownHeader && (
        <HeaderContent
          goBack={goBack}
          title="Back to My Studies"
          className="header"
        />
      )}
      <div className="img-container-thumbnail">
        <img src={thumbnail} />
      </div>
      <div className="label-topic">
        <Chip size="small" label={myStudyData.topic.name} color="secondary" />
      </div>
      <span className="title">{myStudyData.title}</span>
      <BoxCustom direction="row" width="80%" justify="space-between">
        <span className="teacher_name info">By Mr. Bagus Fatwan Alfiat</span>
        <BoxCustom
          width="12%"
          className="user-group"
          direction="row"
          justify="space-between"
        >
          <Group fontSize="10px" color="secondary" />
          <span className="count">20</span>
        </BoxCustom>
        <BoxCustom
          width="9%"
          className="user-group"
          direction="row"
          justify="space-between"
        >
          <Book fontSize="10px" color="secondary" />
          <span className="count">5</span>
        </BoxCustom>
      </BoxCustom>
      <div
        dangerouslySetInnerHTML={{
          __html: myStudyData.description,
        }}
        className="description"
      />
    </WrapContent>
  );
};

export default MyStudyCard;

const WrapContent = styled(Paper)`
  padding: 12px;
  max-height: 695px;
  display: flex;
  flex-direction: column;

  .header {
    margin-bottom: 20px;
  }
  .img-container-thumbnail {
    width: 100%;
    position: relative;
    object-fit: cover;
    overflow: hidden;
    /* background : red; */
    border-radius: 15px;
    height: 256px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .label-topic {
    margin: 10px 0;
    display: block;
  }
  span.title {
    font-weight: 500;
    font-size: 18px;
  }
  .teacher_name {
    font-size: 10px;
    color: #848484;
  }
  .user-group {
    span {
      font-size: 12px;
      font-weight: 500;
    }
  }
  .description {
    margin-top: 10px;
    div {
      font-size: 10px;
      text-align: justify;
    }
    p {
      font-size: 10px;
      text-align: justify;
    }
  }
`;
