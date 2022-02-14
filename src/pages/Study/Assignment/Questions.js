import { Grid } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import FormAssignment from "../../../components/Form/Assignment/FormAssignment";
import HeaderContent from "../../../components/Header/HeaderContent";
import ListQuestions from "../../../components/List/ListQuestions";
import Paper from "../../../components/Paper";

export const Questions = (props) => {
  const history = useHistory();
  return (
    <Grid container spacing={2}>
      <Grid item xl={5} xs={12} sm={12} lg={5} sm={5}>
        <WrapContent>
          <HeaderContent
            shownBtn
            btnLabel="Save Changes"
            onClickButton={() => {}}
            goBack={() => history.goBack()}
            title="Back to Assignments"
          />
          <div className="content">
            <FormAssignment
              field={{}}
              handleBlur={() => {}}
              handleChangeDate={() => {}}
              handleChange={() => {}}
            />
          </div>
        </WrapContent>
      </Grid>
      <Grid item xl={7} xs={12} sm={12} lg={7} sm={7}>
        <WrapContent>
          <HeaderContent shownGoBack={false} title="Questions - Tugas Baru" />
          <div className="content">
            <ListQuestions />
          </div>
        </WrapContent>
      </Grid>
    </Grid>
  );
};

const WrapContent = styled(Paper)`
  padding: 15px;
  .content {
    margin-top: 12px;
  }
`;
