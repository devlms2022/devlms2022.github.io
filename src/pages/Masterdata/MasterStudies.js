import { Grid } from "@mui/material";
import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ButtonCustom from "../../components/Button/Button";
import StudyCard from "../../components/Card/StudyCard";
import Search from "../../components/Form/Search";
import { Api } from "../../services/api";

export default class MasterStudies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      limit: 10,
      page: 0,
      search: "",
    };
  }

  fetchStudies = () => {
    const { limit, page, search } = this.state;
    Api.post("/master_studies", {
      limit,
      page,
      search,
    })
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          this.setState({ data: response.data.data });
        }
      })
      .catch((error) => alert(error.message));
  };

  handleClickAdd = () => {
    this.props.history.push("/master/setstudy/add");
  };

  componentDidMount = () => {
    this.fetchStudies();
  };
  render() {
    const { data, onAddClicked } = this.state;

    return (
      <WrapContent>
        <Grid className="head" container>
          <Grid item md={7} xl={7} xs={12}>
            <WrapButton>
              <ButtonCustom onClick={this.handleClickAdd}>
                ADD STUDY
              </ButtonCustom>
              <ButtonCustom>FILTER</ButtonCustom>
            </WrapButton>
          </Grid>
          <Grid item md={5} xl={5} xs={12}>
            <Search width="100%" />
          </Grid>
        </Grid>
        <WrapStudy>
          <Grid sx={{ maxHeight: 520 }} container spacing={2}>
            {data.map((itm, index) => {
              return (
                <Grid key={index} item xl={3} md={6} xs={12}>
                  <StudyCard data={itm} />
                </Grid>
              );
            })}
          </Grid>
        </WrapStudy>
      </WrapContent>
    );
  }
}

const WrapContent = styled.div`
  padding: 17px 15px;
`;

const WrapButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;

  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;

const WrapStudy = styled.div`
  padding: 15px 0;
  margin: 15px 0;
  padding-bottom : 15px;
  overflow-y: scroll;
  position: relative;
  /* height: 300px; */
  max-height: 500px;
  /* background: red; */
  /* max-height: 200px; */
`;
