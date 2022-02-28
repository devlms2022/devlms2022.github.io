import { Book, People, SwitchAccount } from "@mui/icons-material";
import { Chip, Skeleton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Paper from "../Paper";
import LinearProgressWithLabel from "../Progress/LinearProgressWithLabel";

const MyCourseCard = (props) => {
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
    progress,
    idCourse
  } = props;
  return (
    <WrapCard onClick={() => onClick(idCourse)}>
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
        <Skeleton width={"100%"} />
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
          </>
        )}

        <div className="progress">
          {isLoding ? (
            <Skeleton />
          ) : (
            <LinearProgressWithLabel
              variant="determinate"
              value={progress ? progress : 0}
            />
          )}
        </div>
      </div>
    </WrapCard>
  );
};

export default MyCourseCard;

const WrapCard = styled(Paper)`
  border-radius: 14px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 370px;
  cursor: pointer;
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
      flex-direction: row;
      flex-wrap: wrap;
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

    .numeric {
      display: flex;
      flex-direction: row;
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

    .progress {
      margin-top: 15px;
      width: 100%;
      .item-progress {
        height: 20px;
        border-radius: 20px;
      }
    }
  }
`;

MyCourseCard.propTypes = {
  idCourse : PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isLoding: PropTypes.bool,
  img: PropTypes.string,
  faculty: PropTypes.string.isRequired,
  study: PropTypes.string.isRequired,
  course: PropTypes.string.isRequired,
  teacherName: PropTypes.string.isRequired,
  totalCh: PropTypes.number.isRequired,
  totalStudent: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
};
