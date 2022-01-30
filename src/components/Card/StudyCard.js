import {
  DateRange,
  Delete,
  Edit,
  FiberManualRecord,
  Info,
} from "@mui/icons-material";
import { Button, Chip, IconButton, Paper, Tooltip } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Avatardefault from "../../assets/images/avatardefault.png";
import { Api } from "../../services/api";
import utilities from "../../utils/utilities";
import BoxCustom from "../Box";
import { Label } from "../Text";

const StudyCard = (props) => {
  const { data, onDelete, onUpdate, roleUser } = props;
  const [thumbnail, setThumbnail] = useState("");

  const fetchAvatar = () => {
    Api.post(
      "/master_studies/getfile",
      {
        file: "thumbnail",
        id: data.id,
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
    fetchAvatar();
  }, []);

  return (
    <PaperStyled img={thumbnail ? thumbnail : Avatardefault}>
      <BoxCustom
        className="imgbackground"
        justify="space-between"
        direction="row"
      >
        <FiberManualRecord color="success" />
        {/* <Chip
          label={data.topic.name}
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
        justify="space-between"
      >
        <BoxCustom direction="row" align="center" className="created_at">
          <DateRange style={{ marginRight: "5px" }} fontSize="8px" />
          <span>
            {data.created_at && moment(data.created_at).format("YYYY/MM/DD")}
          </span>
        </BoxCustom>
        <Tooltip title="Careted at">
          <IconButton size="small">
            <Info fontSize="10px" />
          </IconButton>
        </Tooltip>
      </BoxCustom>
      <Label>{data.title}</Label>
      {roleUser === "1" && (
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
            <IconButton color="primary" size="small">
              <Edit />
            </IconButton>
            <IconButton size="small" color="error">
              <Delete />
            </IconButton>
          </BoxCustom>
        </BoxCustom>
      )}
      {roleUser !== "1" && (
        <BoxCustom
          mt="10px"
          width="100%"
          justify="space-between"
          direction="row"
        >
          <Button size="small" variant="contained" color="primary">
            Enroll
          </Button>
         
        </BoxCustom>
      )}
    </PaperStyled>
  );
};

export default StudyCard;

const PaperStyled = styled(Paper)`
  width: "100%";
  padding: 15px;

  .imgbackground {
    background-image: url(${({ img }) => img});
    padding: 10px;
    border-radius: 10px;
    /* min-height: 168px; */
    height: 210px;
    background-size: cover;
  }
  .created_at {
    width: 50%;
    span {
      font-size: 10px;
    }
  }
`;
