import { Book, Delete, Edit, Visibility } from "@mui/icons-material";
import { Grid, Button, IconButton } from "@mui/material";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import BoxCustom from "../Box";
import { Subtitle } from "../Text";

const ListCourses = (props) => {
  const { data } = props;
  return (
    <Div>
      <div className="head">
        <Subtitle>What is Javascript</Subtitle>
        <span className="label-study">Studies of Javascript Beginner</span>
      </div>
      <div className="contain-list">
        {data.length > 0 &&
          data.map((item, key) => {
            return (
              <ul key={key} className="list-course">
                <li className="item-course">
                  <Grid container spacing={1}>
                    <Grid item xl={8} sm={12} xs={12} md={7}>
                      <BoxCustom className="label" width="100%">
                        <div className="title">
                          <Book fontSize="18px" /> {item.title_course}
                        </div>
                        <div className="date">Created at {moment(item.created_at).format('ll')}</div>
                      </BoxCustom>
                    </Grid>
                    <Grid item xl={4} sm={12} xs={12} md={5}>
                      <BoxCustom className="actions" width="100%">
                        <BoxCustom
                          direction="row"
                          width="100%"
                          justify="space-between"
                          className="action"
                        >
                          <Button size="small" color="success">
                            Active
                          </Button>
                          <div className="button-group">
                            <IconButton size="small" color="info">
                              <Visibility fontSize="18px" />
                            </IconButton>
                            <IconButton size="small" color="primary">
                              <Edit fontSize="18px" />
                            </IconButton>
                            <IconButton size="small" color="error">
                              <Delete fontSize="18px" />
                            </IconButton>
                          </div>
                        </BoxCustom>
                      </BoxCustom>
                    </Grid>
                  </Grid>
                </li>
              </ul>
            );
          })}
      </div>
      {data.length === 0 && <div className="not-found">No Course Found</div>}
    </Div>
  );
};

export default ListCourses;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  .head {
    .label-study {
      font-size: 14px;
      color: #b8b8b8;
    }
    margin-bottom: 15px;
  }
  .not-found {
    display: flex;
    flex: 1;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .contain-list {
    overflow-y: scroll;
    .list-course {
      margin-bottom: 10px;
      .item-course {
        padding: 10px 8px;
        border-radius: 10px;
        border: 1px solid var(--primary-color-light);
        .label {
          .title {
            font-size: 18px;
            font-weight: 500;
          }
          .date {
            font-size: 12px;
            color: #b8b8b8;
            margin-top: 12px;
          }
        }
      }
    }
  }
`;
