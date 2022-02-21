import {
  Assignment,
  Delete,
  Edit, Visibility
} from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from "@mui/material";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import BoxCustom from "../Box";
import { TextLight } from "../Text";

const ListAssignment = (props) => {
  const {
    data,
    onClickSetCourse,
    onClickeEdit,
    onClickDelete,
    sectionSelected,
    openPover,
    onCosePover,
    item,
    onClickEdit
  } = props;
  const handleClickEdit = (event, id) => {
    onClickeEdit(event, id);
  };
  const handleCloseEdit = () => {
    onCosePover();
  };
  const handleClickDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--primary-color)",
    }).then((result) => {
      if (result.isConfirmed) {
        onClickDelete(id);
      }
    });
  };

  const open = Boolean(openPover);
  const id = open ? "popover" : undefined;

  return (
    <List className="item-course">
      <Grid container spacing={1}>
        <Grid item xl={9} sm={12} xs={12} md={7}>
          <BoxCustom className="label" width="100%">
            <div className="title">
              <Assignment color="action" fontSize="18px" />
              <span>{item?.title_assignment}</span>
            </div>
            <div className="date">
              Created at {moment(item?.created_at).format("ll")}
            </div>
          </BoxCustom>
        </Grid>
        <Grid item xl={3} sm={12} xs={12} md={5}>
          <BoxCustom className="actions" width="100%">
            <BoxCustom
              direction="row"
              width="100%"
              justify="flex-end"
              className="action"
            >
              <div className="button-group">
                <Tooltip title="See Detail" placement="top">
                  <IconButton onClick={() => {}} size="small" color="info">
                    <Visibility fontSize="18px" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit" placement="top">
                  <IconButton onClick={() => onClickEdit(item.id)} size="small" color="primary">
                    <Edit fontSize="18px" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="top">
                  <IconButton onClick={() => {}} size="small" color="error">
                    <Delete fontSize="18px" />
                  </IconButton>
                </Tooltip>
              </div>
            </BoxCustom>
            <BoxCustom width="100%" justify="flex-end" direction="row">
              {/* <TextLight>{item.assignment_type}</TextLight> */}
              <TextLight>
                {item.assignment_type === "1" ? "Multiple Choice" : "Essay"}
              </TextLight>
            </BoxCustom>
          </BoxCustom>
        </Grid>
      </Grid>
    </List>
  );
};

export default ListAssignment;

const List = styled.li`
  padding: 10px 8px;
  border-radius: 10px;
  border: 1px solid var(--primary-color-light);
  margin-bottom: 12px;
  .label {
    .title {
      display: flex;
      flex-direction : 'row';
      align-items : center;
      span {
        font-size: 16px;
        font-weight: 500;
      }
    }
    .date {
      font-size: 12px;
      color: #b8b8b8;
      margin-top: 12px;
    }
  }
`;

const PoverContent = styled.div`
  padding: 20px 10px;
`;
