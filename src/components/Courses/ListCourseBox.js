import React from "react";
import { Grid } from "@mui/material";
import Book from "@mui/icons-material/Book";
import PropTypes from "prop-types";
import styled from "styled-components";

const ListCourseBox = (props) => {
  const { title_chapter, className } = props;
  return (
    <Grid className={className} xl={4} lg={4} md={6} xs={6} sm={6} item>
      <Wrapper>
        <Book size="small" />
        <span>{title_chapter}</span>
      </Wrapper>
    </Grid>
  );
};

export default ListCourseBox;

ListCourseBox.propTypes = {
  title_chapter: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 10px;
  border: 1px solid #d2d2d2;
  /* box-sizing: border-box; */
  border-radius: 5px;
  span {
    margin-left: 5px;
  }
`;
