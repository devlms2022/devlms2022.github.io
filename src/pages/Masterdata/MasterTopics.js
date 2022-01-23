import { AddCircle as AddIcon, Close } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import React, { Component } from "react";
import styled from "styled-components";
import BoxCustom from "../../components/Box";
import ButtonCustom from "../../components/Button/Button";
import Input from "../../components/Form/Input";
import Search from "../../components/Form/Search";
import Modal from "../../components/Modal";
import Paper from "../../components/Paper";
import { TableTopic } from "../../components/Table";
import { Api } from "../../services/api";
// import { Api as api} from "../../services/api";
import TokenService from "../../services/token.services";

const FormAddTopic = (props) => {
  const { onCancel, onChange, onSave } = props;
  return (
    <BoxCustom direction="row" align="center" width="100%">
      <BoxCustom justify="center" width="65%">
        <Input
          onChange={onChange}
          fullWidth
          placeholder="Enter name of topic"
          name="topic"
        />
      </BoxCustom>
      <BoxCustom
        direction="row"
        justify="space-evenly"
        align="center"
        width="35%"
      >
        <ButtonCustom onClick={onSave} variant="text" size="small">
          Save
        </ButtonCustom>
        <IconButton onClick={onCancel} size="small">
          <Close />
        </IconButton>
      </BoxCustom>
    </BoxCustom>
  );
};

export default class MasterTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicData: [],
      userSign: {},
      role_id: 3,
      search: "",
      page: 0,
      limit: 10,
      totalData: 0,
      shownAdd: false,
      topic: "",
      edit: {},
    };
  }

  componentDidMount = () => {
    const userSign = TokenService.getUser();
    this.setState({ userSign: userSign.data });
    this.fetchDataTopic();
  };

  fetchDataTopic = () => {
    const { limit, page, search } = this.state;
    Api.post("/topic", {
      limit,
      page,
      sortby: "DESC",
      search
    })
      .then((response) => {
        this.setState({
          topicData: response.data.data,
          totalData: response.data.total,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  handleSaveTopic = async () => {
    const { topic, userSign } = this.state;
    try {
      const response = await Api.post("/topic/insert", {
        name: topic,
        created_by: userSign.id,
      });
      if (response.data.code === 200 && response.status === 200) {
        this.setState({
          shownAdd: false,
        });
        this.fetchDataTopic();
      }
    } catch (error) {
      alert(error.message);
    }
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

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleAction = async (e, action, id) => {
    try {
      if (action === "delete") {
        const response = await Api.post("/topic/delete", {
          id,
        });
        if (response.data.code === 200 && response.status === 200) {
          this.fetchDataTopic();
        } else if (response.data.code === 110) {
          throw new Error(response.data.message);
        }
      } else if (action === "edit") {
        const response = await Api.post("/topicbyid", {
          id,
        });

        this.setState({
          edit: response.data.data,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.fetchDataTopic();
    }
    if (prevState.search !== this.state.search) {
      this.fetchDataTopic();
    }
    if (
      prevState.page !== this.state.page ||
      prevState.limit !== this.state.limit
    ) {
      this.fetchDataTopic();
    }
  }

  render() {
    const { topicData, page, limit, totalData, shownAdd, edit } = this.state;

    return (
      <>
        <ContainContent>
          <Grid className="head" container spacing={1}>
            <Grid sm={12} md={6} xl={6} item>
              {shownAdd ? (
                <FormAddTopic
                  onCancel={() => this.setState({ shownAdd: !shownAdd })}
                  onSave={this.handleSaveTopic}
                  onChange={this.handleChange}
                />
              ) : (
                <>
                  <ButtonCustom
                    onClick={() => this.setState({ shownAdd: true })}
                    startIcon={<AddIcon />}
                  >
                    Add
                  </ButtonCustom>
                </>
              )}
            </Grid>
            <Grid sm={12} md={6} xl={6} item>
              <Search
                onChange={this.handleSearch}
                width="100%"
                placeholder="Search..."
              />
            </Grid>
          </Grid>
          <TableTopic
            actionClicked={this.handleAction}
            data={topicData}
            total={totalData}
            page={page}
            limit={limit}
            onChangePage={this.handleChangePage}
            onChangeRowPerpage={this.handleChangeRowsPerPage}
            edit={edit}
          />
        </ContainContent>
      </>
    );
  }
}

const ContainContent = styled(Paper)`
  padding: 15px;
  .head {
    margin-bottom: 15px;
  }
`;
