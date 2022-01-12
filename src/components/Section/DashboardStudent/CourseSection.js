import { Search } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

const CourseSection = () => {
  return (
    <SectionCourse>
      <div>
        <Search>
          <SearchIconWrappe>
            <SearchIcon />
          </SearchIconWrappe>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </div>
    </SectionCourse>
  );
};

const SectionCourse = styled.div``;

export default CourseSection;
