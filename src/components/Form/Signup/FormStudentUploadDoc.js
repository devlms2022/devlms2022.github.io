import { Grid, Paper } from "@mui/material";
import React from "react";
import Button from "../../Button/Button";
import Input from "../Input";
import { Styling as WrapContent } from "./index";
import UploadIcon from "../../../assets/icons/upload_icon.png";
import styled from "styled-components";

const FormStudentUploadDoc = (props) => {
  const {onChangeFile} = props;
  return (
    <WrapContent>
      <InputFileWrapper>
        <div className="item">
          <label>Passport / Identity Card</label>
          <Paper elevation={2} className="paper">
            <img src={UploadIcon} alt="upload-icon" />
            <input
              id="myInput"
              style={{ display: "none" }}
              type={"file"}
              name="proof_teacher_grade"
              onChange={onChangeFile}
              // onChange={this.fileSelectedHandler}
            />
            <label
              htmlFor="myInput"
              id="file-proof_teacher_grade"
              className="button-input"
            >
              Select File
            </label>
          </Paper>
        </div>
        <div className="item">
          <label>Grade(s)</label>
          <Paper elevation={2} className="paper">
            <img src={UploadIcon} alt="upload-icon" />
            <input
              id="myInput"
              style={{ display: "none" }}
              type={"file"}
              name="proof_teacher_grade"
              onChange={onChangeFile}
              // onChange={this.fileSelectedHandler}
            />
            <label
              htmlFor="myInput"
              id="file-proof_teacher_grade"
              className="button-input"
            >
              Select File
            </label>
          </Paper>
        </div>
        {/* <label htmlFor="myInput"> */}
        {/* <Icon style={{ fontSize: "20px" }} type="camera" /> */}
        {/* </label> */}
      </InputFileWrapper>
    </WrapContent>
  );
};

const InputFileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  .item {
    text-align: center;
  }
  .paper {
    display: flex;
    min-width: 204px;
    min-height: 204px;
    padding: 5px 5px;
    margin: 10px 0px;
    flex-direction: column;
    justify-content: space-between;

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

export default FormStudentUploadDoc;
