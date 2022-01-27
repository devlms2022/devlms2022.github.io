import { Delete, Edit, FiberManualRecord, Info } from "@mui/icons-material";
import { Button, Chip, IconButton, Paper, Tooltip } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Avatardefault from "../../assets/images/avatardefault.png";
import BoxCustom from "../Box";
import { Label } from "../Text";

const MyStudiesCard = (props) => {
  const { data, onSetupClicked } = props;
  return (
    <PaperStyled img={Avatardefault}>
      <BoxCustom
        className="imgbackground"
        justify="space-between"
        direction="row"
      >
        <FiberManualRecord color="success" />
        <Chip
          label={data.master_studies.topic.name}
          color="primary"
          size="small"
          variant="outlined"
        />
      </BoxCustom>

      <BoxCustom
        mt="10px"
        mb="5px"
        direction="row"
        align="center"
        justify="flex-end"
      >
        <Tooltip title="Careted at">
          <IconButton size="small">
            <Info fontSize="10px" />
          </IconButton>
        </Tooltip>
      </BoxCustom>
      <Label>{data.master_studies.title}</Label>
      <BoxCustom mt="10px" width="100%" justify="space-between" direction="row">
        <Button size="small" variant="contained" color="success">
          Active
        </Button>
        <BoxCustom direction="row">
          <Button onClick={(e) => onSetupClicked(e, data.master_studies.id)}>
            setup
          </Button>
        </BoxCustom>
      </BoxCustom>
    </PaperStyled>
  );
};

export default MyStudiesCard;

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
    width: 50%;
    span {
      font-size: 10px;
    }
  }
`;
