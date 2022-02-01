import React, { useEffect, useState } from "react";
import { Book, Group } from "@mui/icons-material";
import { Chip } from "@mui/material";
import styled from "styled-components";
import BoxCustom from "../Box";
import HeaderContent from "../Header/HeaderContent";
import Paper from "../Paper";
import { Api } from "../../services/api";

const MyStudyCard = (props) => {
  const {
    shownHeader = true,
    myStudyData,
    thumbnail,
    goBack,
    sectionTotal,
    teacherUserId, 
    studentTotal
  } = props;
  const [teacherData, setTeacherData] = useState({});
  
  useEffect(() => {
    fetchTeacher();
  },[]);

  const fetchTeacher = () => {
    Api.post("/userbyid", {
      id : teacherUserId
    }).then(res => {
      if(res.status === 200 && res.data.code === 200) {
        setTeacherData(res.data.data);
      }
    }).catch(err=>alert(err.message))
  }


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
        <span className="teacher_name info">By Mr. {teacherData?.profile?.front_name} {teacherData?.profile?.family_name}</span>
        <BoxCustom
          width="12%"
          className="user-group"
          direction="row"
          justify="space-between"
        >
          <Group fontSize="10px" color="secondary" />
          <span className="count">{studentTotal}</span>
        </BoxCustom>
        <BoxCustom
          width="9%"
          className="user-group"
          direction="row"
          justify="space-between"
        >
          <Book fontSize="10px" color="secondary" />
          <span className="count">{sectionTotal}</span>
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
    /* margin-bottom: 20px; */
  }
  .img-container-thumbnail {
    width: 100%;
    margin-top : 5px;
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
