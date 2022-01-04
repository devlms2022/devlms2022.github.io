import { Grid, Paper } from "@mui/material";
import React from "react";
import Button from "../../Button/Button";
import Input from "../Input";
import { Styling as WrapContent } from "./index";
import UploadIcon from "../../../assets/icons/upload_icon.png";
import styled from "styled-components";

const FormTeachUploadDoc = (props) => {

  const {onChangeFile, onChange, errors, proofTeacherGrade} = props;
  return (
    <WrapContent>
      <InputFileWrapper>
        <label>Proof Of Teacher Grade</label>
        <Paper elevation={2} className="paper">
          <img src={proofTeacherGrade ? proofTeacherGrade : UploadIcon} alt="upload-icon" />
          <input
            id="myInput"
            style={{ display: "none" }}
            type={"file"}
            name="proof_teacher_grade"
            onChange={onChangeFile}
          />
          <label
            htmlFor="myInput"
            id="file-proof_teacher_grade"
            className="button-input"
          >
            Select File
          </label>
        </Paper>
        {/* <label htmlFor="myInput"> */}
        {/* <Icon style={{ fontSize: "20px" }} type="camera" /> */}
        {/* </label> */}
      </InputFileWrapper>
      <Grid spacing={2} container>
        <Grid className="col" item xs={12}>
          <Input
            className="form-control"
            label="Registrion Code Of Branch"
            name="reg_code_branch"
            onChange={onChange}
            error={errors.reg_code_branch ? true : false}
            helperText={errors.reg_code_branch ? errors.reg_code_branch : " "}
          />
        </Grid>
      </Grid>
    </WrapContent>
  );
};

const InputFileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  .paper {
    display: flex;
    min-width : 204px;
    min-height : 204px;
    padding: 5px 5px;
    margin: 10px 0px;
    flex-direction: column;
   
    justify-content: space-between;

    img {
      max-width : 250px;
    }
    
    /* background: red; */
  }
  .button-input {
    padding: 10px 0px;
    width: 100%;
    color: var(--white-color);
    text-align: center;
    border-radius: 8px;
    background: var(--primary-color);
    &:hover {
      cursor: pointer;
    }
  }
`;

export default FormTeachUploadDoc;
