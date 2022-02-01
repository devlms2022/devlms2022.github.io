import { Grid } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import StudyCard from "../../components/Card/StudyCard";
import HeaderContent from "../../components/Header/HeaderContent";
import Paper from "../../components/Paper";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";

const ListStudies = () => {
  const [listStudies, setListStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listMasterStudy, setListMasterStudy] = useState([]);

  const userSign = TokenService.getUser().data;

  const loadListStudies = async () => {
    try {
      const res = await Api.post("/studies", {
        filter: {
          id_user: userSign.id,
        },
      });
      setListStudies(res.data.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchMasterStudies = () => {
    Api.post("/master_studies")
      .then((res) => setListMasterStudy(res.data.data))
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    loadListStudies();
    fetchMasterStudies();
  }, []);

  const handleEnroll = (id) => {
    Api.post("/studies/insert", {
      id_user: userSign.id,
      study_master: id,
      status_confirm: "pendding",
    })
      .then((res) => {
        if (res.status === 200 && res.data.code === 200) {
          Swal.fire("Successfull!", "the Study has been enrolled!", "success");
          loadListStudies()
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <WrapContent>
      <HeaderContent shownGoBack={false} title="List Studies" />
      <div className="list-mystudies">
        <Grid container spacing={2}>
          {listMasterStudy.map((study, key) => {
            // <div className="item-study">
            const find = listStudies.find(
              (item) => item.study_master === study.id
            );
            if (find) {
              return null;
            }
            return (
              <Grid key={key} item xl={3} md={6} xs={12}>
                <StudyCard
                  enroll={handleEnroll}
                  roleUser={userSign.role_id}
                  key={study.id}
                  data={study}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </WrapContent>
  );
};

const WrapContent = styled(Paper)`
  padding: 12px;
  .list-mystudies {
    padding: 5px;
    margin-top: 15px;
    max-height: 520px;
    overflow-y: scroll;

    .item-study {
      /* overflow-y : scroll; */
    }
  }
`;

export default ListStudies;
