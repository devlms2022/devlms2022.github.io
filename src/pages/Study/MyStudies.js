import { Divider, Grid } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import MyStudiesCard from "../../components/Card/MyStudiesCard";
import StudyCard from "../../components/Card/StudyCard";
import HeaderContent from "../../components/Header/HeaderContent";
import Paper from "../../components/Paper";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";

export default class MyStudies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSign: {},
      myStudiesData: [],
      limit: 10,
      page: 0,
      totalDataMyStudies: 0,
      search: "",
    };
  }

  fetchData = (user) => {
    const { limit, page, search } = this.state;
    Api.post("/studies", {
      limit,
      page,
      search,
      filter: {
        id_user: user.id,
      },
    })
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          this.setState({
            myStudiesData: response.data.data,
          });
        }
      })
      .catch((err) => alert(err.message));
  };

  handleClickSetup = (e, studyMasterId) => {
    this.props.history.push("/mystudies/setup/sections/" + studyMasterId);
  };

  componentDidMount = () => {
    const userSign = TokenService.getUser();
    this.fetchData(userSign.data);
    this.setState({ userSign: userSign.data });
  };

  render() {
    const { userSign, myStudiesData } = this.state;

    return (
      <WrapContent>
        <HeaderContent shownGoBack={false} title="My Studies" />
       
        <div className="list-mystudies">
          <Grid  container spacing={2}>
            {myStudiesData.map((itm, index) => {
              return (
                <Grid key={index} item xl={3} md={6} xs={12}>
                  <MyStudiesCard
                    data={itm}
                    onSetupClicked={this.handleClickSetup}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </WrapContent>
    );
  }
}

const WrapContent = styled(Paper)`
  padding: 12px;
  .list-mystudies {
    margin-top: 15px;
    max-height: 520px;
    overflow-y: scroll;
    padding : 5px;
  }
`;
