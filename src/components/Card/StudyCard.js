import {
  DateRange,
  Delete,
  Edit,
  FiberManualRecord,
  Info
} from "@mui/icons-material";
import {
  Button, Chip, IconButton,
  Paper, Tooltip
} from "@mui/material";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import Avatardefault from "../../assets/images/avatardefault.png";
import BoxCustom from "../Box";
import { Label } from "../Text";

const StudyCard = (props) => {
  const { data, onDelete, onUpdate } = props;
  return (
    <PaperStyled img={Avatardefault}>
      <BoxCustom
        className="imgbackground"
        justify="space-between"
        direction="row"
      >
        <FiberManualRecord color="success" />
        <Chip
          label={data.topic.name}
          color="primary"
          size="small"
          variant="outlined"
        />
      </BoxCustom>

      <BoxCustom mt="10px" mb="5px" direction="row" align="center" justify="space-between">
        <BoxCustom direction="row" align="center" className="created_at">
          <DateRange style={{ marginRight: "5px" }} fontSize="8px" />
          <span>{data.created_at && moment(data.created_at).format('YYYY/MM/DD')}</span>
        </BoxCustom>
        <Tooltip title="Careted at" >
          <IconButton size="small" >
            <Info fontSize="10px" />
          </IconButton>
        </Tooltip>
      </BoxCustom>
      <Label>{data.title}</Label>
      <BoxCustom mt="10px" width="100%" justify="space-between" direction="row">
        <Button size="small" variant="contained" color="success" >Active</Button>
        <BoxCustom direction="row" >
          <IconButton color="primary" size="small" >
            <Edit  />
          </IconButton>
          <IconButton size="small" color="error" >
            <Delete  />
          </IconButton>
        </BoxCustom>
      </BoxCustom>
    </PaperStyled>
  );
};

export default StudyCard;

const PaperStyled = styled(Paper)`
  width: "100%";
  padding: 15px;

  .imgbackground {
    background-image: url("https://www.astralife.co.id/beta/wp-content/uploads/2019/11/default-img.png");
    padding: 10px;
    border-radius: 10px;
    min-height: 126px;
  }
  .created_at {
    width : 50%;
    span {
      font-size: 10px;
    }
  }
`;
