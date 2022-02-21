import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import BoxCustom from "../Box";
import HeaderContent2 from "../Header/HeaderContent2";
import ListAssignment from "../List/ListAssignment";
import Navtab from "../Navtab";

const AssignmentCourse = (props) => {
  const { data, sectionId, onSwitch } = props;
  const [navIndexActive, setNavIndexActive] = useState(0);
  const history = useHistory();


  const handleClickAdd = () => {
    history.push("/mystudies/setup/addassignment/" + sectionId);
  };
  
  const handleClickEdit = (id) => {
    history.push("/mystudies/setup/assignment/questions/" + id);
  }

  const tabs = [
    {
      label: "Multiple Choice",
      name: "mc",
    },
    {
      label: "Essay",
      name: "essay",
    },
  ];

  return (
    <Div>
      <HeaderContent2
        shownGoBack={false}
        title="Assignment"
        subtitle={"Studies of Flutter Advance"}
        className="header"
      />
      <Grid container>
        <Grid item sm={12} xs={12} md={6} xl={6}>
          <Navtab
            navIndexActive={navIndexActive}
            tabsData={tabs}
            onClick={(e, indexNav) => {
              setNavIndexActive(indexNav);
              onSwitch(e.target.name);
            }}
          />
        </Grid>
        <Grid sx={{ float: "right" }} item sm={12} xs={12} md={6} xl={6}>
          <BoxCustom width="100%" direction="row" justify="flex-end">
            <Button onClick={handleClickAdd} variant="contained">
              Add Assignment
            </Button>
          </BoxCustom>
        </Grid>
      </Grid>
      <div className="assignment-container">
        <ul>
          {data.map((item, index) => {
            return <ListAssignment onClickEdit={handleClickEdit} key={index} item={item} />;
          })}
        </ul>
      </div>
    </Div>
  );
};

export default AssignmentCourse;

const Div = styled.div`
  .header {
    margin-bottom: 20px;
  }
  .assignment-container {
    margin-top: 1rem;
  }
`;
