import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StudyCard from "../../components/Card/StudyCard";
import HeaderContent from "../../components/Header/HeaderContent";
import Paper from "../../components/Paper";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";

const ListStudies = () => {
  const [listStudies, setListStudies] = useState([]);
  const userSign = TokenService.getUser().data;

  useEffect(() => {
    Api.post("/master_studies")
      .then((res) => setListStudies(res.data.data))
      .catch((err) => alert(err.message));
  }, []);

  return (
    <WrapContent>
      <HeaderContent shownGoBack={false} title="List Studies" />
      <div className="list-mystudies">
        <Grid  container spacing={2}>
          {listStudies.map((study, key) => (
            // <div className="item-study">
              <Grid key={key} item xl={3} md={6} xs={12}>
                <StudyCard roleUser={userSign.role_id}  key={study.id} data={study} />
              </Grid>
            // </div>
          ))}
        </Grid>
      </div>
    </WrapContent>
  );
};

const WrapContent = styled(Paper)`
  padding: 12px;
  .list-mystudies {
    padding : 5px;
    margin-top: 15px;
    max-height : 520px;
    overflow-y : scroll;
    
    .item-study {
      /* overflow-y : scroll; */
    }
  }
`;

export default ListStudies;
