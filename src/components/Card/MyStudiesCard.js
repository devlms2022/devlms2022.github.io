import { FiberManualRecord, Info } from "@mui/icons-material";
import { Button, Chip, IconButton, Paper, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Avatardefault from "../../assets/images/avatardefault.png";
import { Api } from "../../services/api";
import utilities from "../../utils/utilities";
import BoxCustom from "../Box";
import { Label } from "../Text";

const MyStudiesCard = (props) => {
  const { data, onSetupClicked } = props;
  const [thumbnail, setThumbnail] = useState("");

  const fetchAvatar = () => {
    Api.post(
      "/master_studies/getfile",
      {
        file: "thumbnail",
        id: data.study_master,
      },
      { responseType: "blob" }
    )
      .then((res) => {
        utilities.readBlobAsText(res.data, (string) => {
          const isJSON = utilities.isJsonString(string);
          if (isJSON) {
            const response = JSON.parse(string);
            if (response.code === 404) {
              setThumbnail("");
            }
          } else {
            utilities.readFileBlob(res.data, (response) => {
              setThumbnail(response);
            });
          }
        });
      })
      .catch((err) => alert(err.message));
  };
  useEffect(() => {
    console.log("useEffect");
    fetchAvatar();
  }, [data]);
  return (
    <PaperStyled img={thumbnail ? thumbnail : Avatardefault}>
      <BoxCustom
        className="imgbackground"
        justify="space-between"
        direction="row"
      >
        <FiberManualRecord color="success" />
        {/* <Chip
          label={data.master_studies.topic.name}
          color="primary"
          size="small"
          variant="outlined"
        /> */}
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
      {data.status_confirm === "pendding" && (
        <BoxCustom
          mt="10px"
          width="100%"
          justify="space-between"
          direction="row"
        >
          <Chip label="Pendding"  size="small" color="secondary" variant="outlined" /> 
        </BoxCustom>
      )}
      {data.status_confirm === "accept" && (
        <BoxCustom
          mt="10px"
          width="100%"
          justify="space-between"
          direction="row"
        >
          <Button size="small" variant="contained" color="success">
            Active
          </Button>
          <BoxCustom direction="row">
            <Button onClick={(e) => onSetupClicked(e, data.master_studies.id)}>
              setup
            </Button>
          </BoxCustom>
        </BoxCustom>
      )}
    </PaperStyled>
  );
};

export default MyStudiesCard;

const PaperStyled = styled(Paper)`
  width: "100%";
  padding: 15px;
  .imgbackground {
    background-image: url(${({ img }) => img});
    padding: 10px;
    border-radius: 10px;
    min-height: 210px;
    background-size: cover;
  }
  .created_at {
    width: 50%;
    span {
      font-size: 10px;
    }
  }
`;
