import React from "react";
import { AccountBox, Book, Group } from "@mui/icons-material";
import { Chip, Divider, Grid, Typography } from "@mui/material";
import PropsType from "prop-types";
import styled from "styled-components";
import { Subtitle } from "../Text";
import ListCourseBox from "./ListCourseBox";

const DetailCourse = (props) => {
  const {
    courseTitle = "",
    faculty = "",
    study = "",
    teacherName = "",
    studentNum = 0,
    chapterNum = 0,
    chapters = [],
    description = "",
    thumbnail = "",
    video = "",
  } = props;

  const { isLoading, courseId } = props;
  return (
    <Wrapper>
      <div className="cover-wrapper"></div>
      <div className="content-wrapper">
        <div className="title-course">
          <Subtitle>
            <span>{courseTitle}</span>
          </Subtitle>
        </div>
        <Grid container spacing={1} className="info-course">
          <Grid item xl={4} lg={4} md={5} sm={12} xs={12} className="chips">
            <Chip
              className="chip-item"
              label={faculty}
              size="small"
              color="primary"
              variant="contained"
            />
            <Chip
              className="chip-item"
              label={study}
              size="small"
              color="primary"
              variant="outlined"
            />
            {/* <Divider orientation="vertical" variant="fullWidth" flexItem /> */}
          </Grid>
          <Grid className="label" item xl={3} lg={3} md={4} sm={12} xs={12}>
            <div className="teacher">
              <AccountBox size="small" className="icon" />
              <span>{teacherName}</span>
            </div>
            <div className="numeric">
              <div>
                <Group size="small" className="icon" />
                <span>{studentNum}</span>
              </div>
              <div>
                <Book size="small" className="icon" />
                <span>{chapterNum}</span>
              </div>
            </div>
          </Grid>
          <Grid item xl={5} lg={5} md={3} sm={0} xs={0} />
        </Grid>
        <Typography
          className="desc-container"
          dangerouslySetInnerHTML={{ __html: description }}
          component="div"
        />

        <div className="section-chapter">
          <div className="label-section">
            <Subtitle>
              <span>Course</span>
            </Subtitle>
            <Divider />
          </div>
          <div className="list-chapter">
            <Grid container spacing={1}>
              {chapters.map((itm, key) => {
                return(
                  <ListCourseBox key={key} title_chapter={itm.chapter_title}/>
                );
              })}
            </Grid>
          </div>
        </div>
        <div className="section-assignment"></div>
      </div>
    </Wrapper>
  );
};

export default DetailCourse;

DetailCourse.propTypes = {
  courseTitle: PropsType.string,
  faculty: PropsType.string,
  study: PropsType.string,
  teacherName: PropsType.string,
  studentNum: PropsType.number,
  chapterNum: PropsType.number,
  chapters: PropsType.array,
  description: PropsType.string,
  thumbnail: PropsType.string,
  video: PropsType.string,
  isLoading: PropsType.bool,
  courseId: PropsType.string,
};

const Wrapper = styled.div`
  .cover-wrapper {
    width: 100%;
    height: 237px;
    background: url(https://support.sharphue.com/wp-content/uploads/2018/07/inner-page-banner-3.png);
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .content-wrapper {
    padding: 15px;
    display: flex;
    flex-direction: column;
    .info-course {
      margin-top: 5px;
      .chips {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        
        justify-content: flex-start;
        align-items: center;
        .chip-item {
          margin-top : 3px;
          margin-right: 5px;
        }
      }
      .label {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .teacher {
          display: flex;
          align-items: center;
          .icon {
            margin-right: 5px;
          }
        }
        .numeric {
          display: flex;
          flex-direction: row;
          flex-wrap : wrap;
          justify-content: space-between;
          align-items: center;
          div {
            display: flex;
            align-items: center;
            margin-right: 5px;
            .icon {
              margin-right: 5px;
            }
          }
        }
      }
    }
    .desc-container {
      margin-top: 20px;
      p {
        font-size: 12px;
        line-height: 1.5;
        text-align: justify;
      }
    }
    .section-chapter {
      margin-top: 20px;

      .label-section {
      }
      .list-chapter {
        margin-top: 10px;
        /* background: red; */

       
      }
    }
  }
`;
