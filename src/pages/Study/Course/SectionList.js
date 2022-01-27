import { Button, Popover } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import BoxCustom from "../../../components/Box";
import Input from "../../../components/Form/Input";
import Search from "../../../components/Form/Search";
import ListSections from "../../../components/List/ListSections";

const Div = styled.div`
  .list-secction {
    margin-top: 40px;
    max-height: 470px;
    overflow-y: scroll;

  }
`;

const PoverContent = styled.div`
  padding: 20px 10px;
`;

const SectionList = (props) => {
  const { data, onSave, onClickSetCourse } = props;
  const [courseSections, setCoutseSections] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    const {value} = e.target;
    setCoutseSections(value);
  };

  const handleSave = () => {
    onSave(courseSections);
    setCoutseSections('');
  }

  const handleSetCourse = (e, id) => {
    onClickSetCourse(e,id);
  }

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;
  return (
    <Div>
      <BoxCustom
        width="100%"
        align="center"
        direction="row"
        justify="space-between"
      >
        <Button
          color="primary"
          aria-describedby={id}
          onClick={handleClick}
          variant="contained"
        >
          ADD SECTION
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <PoverContent>
            <Input
              onChange={handleChange}
              width="320px"
              value={courseSections}
              size="small"
              placeholder="Enter section of course"
              label="Section of course"
            />
            <Button onClick={handleSave} sx={{ marginLeft: "12px" }}>Save</Button>
          </PoverContent>
        </Popover>
        <Search placeholder="Enter Search" name="search" width="60%" />
      </BoxCustom>
      <div className="list-secction">
        {data.length > 0 && data.map((item,key) => (<ListSections onClickSetCourse={handleSetCourse} key={key} data={item} />))}
        {data.length === 0 && <span>No Course Section Found</span>}
      </div>
    </Div>
  );
};

export default SectionList;
