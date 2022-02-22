import {
  Button
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "suneditor/dist/css/suneditor.min.css";
import Swal from "sweetalert2";
import BoxCustom from "../../../components/Box";
import FormAssignment from "../../../components/Form/Assignment/FormAssignment";
import HeaderContent from "../../../components/Header/HeaderContent";
import Paper from "../../../components/Paper";
import { Api } from "../../../services/api";
import TokenService from "../../../services/token.services";

const AddAssignment = (props) => {
  const [dateStart, setdateStart] = useState(moment().format("YYYY-MM-DD"));
  const [dateEnd, setdateEnd] = useState(moment().format("YYYY-MM-DD"));
  const [field, setField] = useState({
    assignment_type: "1",
  });
  const [instruction, setInstruction] = useState("");
  const userSign = TokenService.getUser();

  const history = useHistory();
  const { sectionId } = useParams();

  const value = {
    title_assignment: field.title_assignment,
    instruction: instruction,
    date_start: dateStart,
    date_end: dateEnd,
    assignment_type: field.assignment_type,
    created_by: userSign.data.id,
    id_section: sectionId,
  };

  const handleChangeDate = (type, newDate) => {
    if (type === "start") setdateStart(newDate.format("YYYY-MM-DD"));
    else if (type === "end") setdateEnd(newDate.format("YYYY-MM-DD"));
  };

  const handleChange = (event, editor) => {
    const { name, value } = event.target;
    setField({ ...field, [name]: value });
  };

  const handleBlur = (e, editor) => {
    setInstruction(editor);
  };

  const handleSave = async () => {
    try {
      const res = await Api.post("/courses_assigment/insert", value);
      if (res.status === 200 && res.data.code === 200) {
        Swal.fire({
          title: "Success!",
          text: "Create Assignment Success Created!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            history.goBack();
          }
        });
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <WrapContent>
      <HeaderContent className="head" title="Add Assignment" />
      <FormAssignment
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleChangeDate={handleChangeDate}
        field={value}
      />
      <BoxCustom width="100%" direction="row" justify="flex-end" mt="10px">
        <Button
          onClick={() => history.goBack()}
          sx={{ mr: "10px" }}
          variant="outlined"
        >
          Cancle
        </Button>
        <Button onClick={handleSave} variant="contained">
          Save Assignment
        </Button>
      </BoxCustom>
    </WrapContent>
  );
};

export default AddAssignment;

const WrapContent = styled(Paper)`
  padding: 20px;
  .formContainer {
    margin-top: 20px;
  }
`;
