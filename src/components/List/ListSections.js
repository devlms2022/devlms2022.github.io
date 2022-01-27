import { Book, Delete, Edit } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import BoxCustom from "../Box";

const ListSections = (props) => {
  const {data, onClickSetCourse, onClickDelete, onClickeEdit} = props;
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
              onClick={(e)=>onClickSetCourse(e,data.id)}
              startIcon={<Book fontSize="15px" />}
            >
              Set Course
            </Button>
            <IconButton onClick={(e)=>onClickeEdit(e,data.id)} size="small" color="primary">
              <Edit fontSize="18px" />
            </IconButton>
            <IconButton  onClick={(e)=>onClickDelete(e,data.id)} edge="start" size="small" color="error">
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
  margin-bottom : 20px;
  .section-title {
    font-size: 16px;
    display : flex;
    flex-direction : row;
    align-items : center;
    height : 100%;
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
