import { Divider, Grid, TablePagination } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import MyStudiesCard from "../../components/Card/MyStudiesCard";
import StudyCard from "../../components/Card/StudyCard";
import Search from "../../components/Form/Search";
import SelectChip from "../../components/Form/Select/SelectChip";
import HeaderContent from "../../components/Header/HeaderContent";
import Paper from "../../components/Paper";
import { Api } from "../../services/api";
import TokenService from "../../services/token.services";

export default class MyStudies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myStudiesData: [],
      limit: 10,
      page: 0,
      totalDataMyStudies: 0,
      search: "",
    };
    this.userSign = TokenService.getUser().data;
  }

  fetchData = () => {
    const { limit, page, search } = this.state;
    Api.post("/studies", {
      limit,
      page,
      search,
      filter: {
        id_user: this.userSign.id,
      },
    })
      .then((response) => {
        if (response.data.code === 200 && response.status === 200) {
          this.setState({
            myStudiesData: response.data.data,
            totalDataMyStudies: response.data.total,
          });
        }
      })
      .catch((err) => alert(err.message));
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      limit: +event.target.value,
      page: 0,
    });
  };

  handleSearch = (keyword) => {
    this.setState({
      search: keyword,
    });
  };

  handleClickSetup = (e, studyMasterId) => {
    this.props.history.push("/mystudies/setup/sections/" + studyMasterId);
  };

  componentDidMount = () => {
    this.fetchData();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.fetchData();
    }

    if (
      prevState.page !== this.state.page ||
      prevState.limit !== this.state.limit
    ) {
      this.fetchData();
    }
  }

  render() {
    const { userSign, myStudiesData, totalDataMyStudies, limit, search, page } =
      this.state;
     

    return (
      <WrapContent>
        <HeaderContent shownGoBack={false} title="My Studies" />
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
            <Search
              onChange={this.handleSearch}
              placeholder="Enter Keyword"
              width="100%"
            />
          </Grid>
        </Grid>
        <div className="list-mystudies">
          <Grid container spacing={2}>
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
        <div className="pagination">
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={totalDataMyStudies}
            rowsPerPage={10}
            page={page}
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />

          {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
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
    padding: 5px;
  }
  .pagination {
    display: flex;
    direction: row;
    justify-content: flex-end;
    margin-top: 15px;
  }
`;
