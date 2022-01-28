import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StudyCard from "../../components/Card/StudyCard";
import HeaderContent from "../../components/Header/HeaderContent";
import Paper from "../../components/Paper";
import { Api } from "../../services/api";

const ListStudies = () => {
  const [listStudies, setListStudies] = useState([]);

  //   const getListStudies = async () => {
  //     const response = await Api.post("/master_studies");
  //     setListStudies(response.data.data);
  //   };

  useEffect(() => {
    Api.post("/master_studies")
      .then((res) => setListStudies(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <WrapContent>
      <HeaderContent shownGoBack={false} title="List Studies" />
      <div className="list-mystudies">
        <Grid sx={{ maxHeight: 520 }} container spacing={2}>
          {listStudies.map((study) => (
            <Grid item xl={3} md={6} xs={12}>
              <StudyCard key={study.id} data={study} />
            </Grid>
          ))}
        </Grid>
      </div>
    </WrapContent>
  );
};

const WrapContent = styled(Paper)`
  padding: 12px;
  .list-mystudies {
    margin-top: 15px;
  }
`;

export default ListStudies;
