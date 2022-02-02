import React, { useState } from "react";
import { Book, Delete, Edit } from "@mui/icons-material";
import { Button, Grid, IconButton, Popover, Popper } from "@mui/material";
import styled from "styled-components";
import Input from "../Form/Input";

const ListSections = (props) => {
  const { data, onClickSetCourse, onClickDelete, onClickeEdit, sectionSelected } = props;
  const [openPover, setOpenPover] = useState(null);

  const handleClickEdit = (event, id) => {
    setOpenPover(event.currentTarget);
    onClickeEdit(event, id);
  };
  const handleCloseEdit = () => {
    setOpenPover(null);
  };
  
  console.log(openPover);
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
              aria-describedby={id}
              onClick={(e) => onClickSetCourse(e, data.id)}
              startIcon={<Book fontSize="15px" />}
            >
              Set Course
            </Button>
            <IconButton
              onClick={(e) => handleClickEdit(e, data.id)}
              size="small"
              color="primary"
            >
              <Edit fontSize="18px" />
            </IconButton>
            
            <Popover
              id={id}
              open={open}
              anchorEl={openPover}
              onClose={handleCloseEdit}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <PoverContent>
                <Input
                  onChange={() => {}}
                  width="320px"
                  value={sectionSelected.title}
                  size="small"
                  label="Section of course"
                />
                <Button onClick={() => {}} sx={{ marginLeft: "12px" }}>
                  Edit
                </Button>
              </PoverContent>
            </Popover>
            <IconButton
              onClick={(e) => onClickDelete(e, data.id)}
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
