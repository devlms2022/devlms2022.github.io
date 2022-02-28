import { Delete, Edit } from "@mui/icons-material";
import {
  IconButton,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material";
import PropsType from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import ControlledAccordions from "../../components/Accordion";
import TokenService from "../../services/token.services";

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const ChapterList = (props) => {
  const {
    total,
    page,
    handleChangePage,
    limit = 10,
    handleChangeRowsPerPage,
    clickEdit,
    clickDelete,
    data,
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  const userSign = TokenService.getUser().data;

  return (
    <Wrapper>
      {data.length === 0 && (
        <Typography variant="caption" component={"span"}>
          No Chapter Found
        </Typography>
      )}

      {data.length > 0 &&
        data.map((item, index) => {
          return (
            <ControlledAccordions
              name={item.chapter_title}
              desc={item.description}
              key={index}
              index={index}
            >
              <ContentAccordion>
                {userSign.role_id === "2" && (
                  <div className="action">
                    <Tooltip
                      placement="top"
                      className="action-item"
                      title="Edit"
                    >
                      <IconButton
                        aria-label="delete"
                        onClick={(e) => clickEdit(e, "edit", item.id)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      placement="top"
                      className="action-item"
                      title="Delete"
                    >
                      <IconButton
                        aria-label="delete"
                        onClick={(e) => clickDelete(e, "delete", item.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}

                <div className="desc">
                  <div className={item.video ? "video" : "no-display"}>
                    <iframe
                      width="100%"
                      height="480"
                      src={item.video}
                      hidden={item.is_video_embed === 1 ? false : true}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    />
                  </div>
                  <div className="text">
                    <Typography
                      dangerouslySetInnerHTML={{ __html: item.description }}
                      component={"span"}
                      className="desc-item"
                    />
                  </div>
                </div>
              </ContentAccordion>
            </ControlledAccordions>
          );
        })}

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Wrapper>
  );
};

export default ChapterList;

ChapterList.propTypes = {
  total: PropsType.number,
  page: PropsType.number,
  handleChangePage: PropsType.func,
  limit: PropsType.number,
  handleChangeRowsPerPage: PropsType.func,
  data: PropsType.array,
};

const ContentAccordion = styled.div`
  display: flex;
  width: 100%;
  /* background: red; */
  flex-direction: column;
  text-align: justify;
  flex-shrink: 1;
  .desc {
    width: 100%;
    .desc-item {
      p {
        font-size: 12px;
      }
    }
    .no-display {
      display: none;
    }
    .video {
      overflow: hidden;
      padding-bottom: 56.25%;
      position: relative;
      height: 0;
      iframe {
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        position: absolute;
      }
    }
    .text {
      margin-top: 10px;
    }
  }

  .action {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
`;
