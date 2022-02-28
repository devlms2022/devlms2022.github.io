import React from "react";
import { Book, People, SwitchAccount } from "@mui/icons-material";
import { Button, Chip, Skeleton, Typography } from "@mui/material";
import styled from "styled-components";
import Paper from "../Paper";
import PropTypes from "prop-types";

const CourseCard = (props) => {
  const {
    onClick,
    isLoding = false,
    img,
    faculty,
    study,
    course,
    teacherName,
    totalCh,
    totalStudent,
    idCourse
  } = props;
  return (
    <WrapCard>
      <div className="thumbnail">
        {isLoding ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
          <img
            src={
              img
                ? img
                : "http://beepeers.com/assets/images/tradeshows/default-image.jpg"
            }
            className="img"
            alt="thumbnail-course"
          />
        )}
      </div>
      {isLoding ? (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      ) : (
        <div className="title-content">
          <div className="chip">
            <Chip
              label={faculty}
              className="chip-item"
              variant="outlined"
              size="small"
            />
            <Chip
              label={study}
              className="chip-item"
              color="info"
              variant="outlined"
              size="small"
            />
          </div>
          <Typography variant="subtitle" component={"span"}>
            {course}
          </Typography>
        </div>
      )}

      <div className="info">
        {isLoding ? (
          <Skeleton height={"62px"} />
        ) : (
          <>
            <div className="teacher-info">
              <SwitchAccount fontSize="small" />
              <Typography variant="body2" component={"span"}>
                {teacherName}
              </Typography>
            </div>
            <div className="btn-info">
              <div className="numeric">
                <div className="item-numeric">
                  <People fontSize="small" />
                  <span>{totalStudent}</span>
                </div>
                <div className="item-numeric">
                  <Book fontSize="small" />
                  <span>{totalCh}</span>
                </div>
              </div>
              <div className="btn">
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  onClick={() => onClick(idCourse)}
                >
                  View Course
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </WrapCard>
  );
};

export default CourseCard;

const WrapCard = styled(Paper)`
  border-radius: 14px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 370px;
  .thumbnail {
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 10px;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .title-content {
    display: flex;
    flex-direction: column;
    .chip {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      flex-direction: row;
      margin-bottom: 8px;
      .chip-item {
        margin-top : 3px;
        margin-right: 5px;
      }
    }
  }

  .info {
    display: flex;
    flex-direction: column;

    .teacher-info {
      flex-direction: row;
      display: flex;
      align-items: center;
    }

    .btn-info {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .numeric {
        display: flex;
        .item-numeric {
          margin-right: 9px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          span {
            font-size: 12px;
          }
        }
      }
    }
  }
`;

CourseCard.propTypes = {
  onClick: PropTypes.func,
  idCourse : PropTypes.string,
  isLoding: PropTypes.bool,
  img: PropTypes.string,
  faculty: PropTypes.string.isRequired,
  study: PropTypes.string.isRequired,
  course: PropTypes.string.isRequired,
  teacherName: PropTypes.string.isRequired,
  totalCh: PropTypes.number.isRequired,
  totalStudent: PropTypes.number.isRequired,
};
