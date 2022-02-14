import { Book, Delete, Edit } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import Dialog from "../Dialog";

const ListSections = (props) => {
  const {
    data,
    onClickSetCourse,
    onClickeEdit,
    onClickDelete,
    sectionSelected,
    openPover,
    onCosePover,
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
    <Div>
      <Grid container spacing={1}>
        <Grid item md={7} sm={12} xs={12} xl={7}>
          <span className="section-title">{data.title}</span>
        </Grid>
        <Grid item sm={12} xs={12} md={5} xl={5}>
          <div className="action">
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={(e) => onClickSetCourse(e, data.id)}
              startIcon={<Book fontSize="15px" />}
            >
              Set Course
            </Button>
            <IconButton
              onClick={(e) => handleClickEdit(e, data.id)}
              size="small"
              color="primary"
              aria-describedby={id}
            >
              <Edit fontSize="18px" />
            </IconButton>

            
            <IconButton
              onClick={(e) => handleClickDelete(data.id)}
              edge="start"
              size="small"
              color="error"
            >
              <Delete fontSize="18px" />
            </IconButton>
          </div>
        </Grid>
      </Grid>
     
    </Div>
  );
};

export default ListSections;

const Div = styled.div`
  padding: 15px 10px;
  border: 1px solid var(--primary-color-light);
  margin-bottom: 20px;
  .section-title {
    font-size: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    font-weight: 500;
  }

  border-radius: 10px;
  .action {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const PoverContent = styled.div`
  padding: 20px 10px;
`;
