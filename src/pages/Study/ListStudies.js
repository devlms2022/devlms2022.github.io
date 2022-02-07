import { Button, Grid, Pagination, TablePagination } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import StudyCard from "../../components/Card/StudyCard";
import Search from "../../components/Form/Search";
import SelectChip from "../../components/Form/Select/SelectChip";
import HeaderContent from "../../components/Header/HeaderContent";
import Paper from "../../components/Paper";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";

const ListStudies = () => {
  const [loading, setLoading] = useState(true);
  const [listMasterStudy, setListMasterStudy] = useState([]);
  const [totalDataMasterStudy, setTotalDataMasterStudy] = useState(0);

  const userSign = TokenService.getUser().data;


  const fetchMasterStudies = () => {
    setLoading(true);
    Api.post("/master_studies")
      .then((res) => {
        if (res.data.code === 200 && res.status === 200) {
          let filter = res.data.data.filter((item) => item.studies.length === 0 || item.studies.filter((study) => study?.id_user !== userSign.id).length > 0);
        
          setListMasterStudy(filter);
          setTotalDataMasterStudy(filter.length);
          setLoading(false);
        } else {
          throw new Error(res.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
        });
        alert(err.message);
      });
  };

  useEffect(() => {
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
          fetchMasterStudies();
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <WrapContent>
      <HeaderContent shownGoBack={false} title="List Studies" />
      <Grid sx={{ marginTop: "5px" }} spacing={1} container>
        <Grid item xs={12} md={6} sm={5} xl={6}>
          <SelectChip
            label="Filter"
            width="30%"
            defaultValue={["Filter"]}
            data={[]}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={7} xl={6}>
          <Search placeholder="Enter Keyword" width="100%" />
        </Grid>
      </Grid>
      <div className="list-mystudies">
        <Grid container spacing={2}>
          {listMasterStudy.map((study, key) => {
            // <div className="item-study">
          
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
      <div className="pagination">
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalDataMasterStudy}
          rowsPerPage={10}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </div>
    </WrapContent>
  );
};

const WrapContent = styled(Paper)`
  padding: 12px;
  .list-mystudies {
    height: 480px;
    padding: 5px;
    margin-top: 15px;
    max-height: 480px;
    overflow-y: scroll;

    .item-study {
      /* overflow-y : scroll; */
    }
  }
  .pagination {
    display: flex;
    direction: row;
    justify-content: flex-end;
    margin-top: 15px;
    overflow-y: scroll;
  }
`;

export default ListStudies;
