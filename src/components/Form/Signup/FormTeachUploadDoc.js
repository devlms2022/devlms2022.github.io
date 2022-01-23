import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import Button from "../../Button/Button";
import Input from "../Input";
import { Styling as WrapContent } from "./index";
import UploadIcon from "../../../assets/icons/upload_icon.png";
import styled from "styled-components";

const FormTeachUploadDoc = (props) => {
  const { onChangeFile, onChange, errors, proofTeacherGrade } = props;
  return (
    <Content>
      <WrapContent>
        <Box className="box">
          <label>Proof Of Teacher Grade</label>
          <div className="paper">
            <img
              src={proofTeacherGrade ? proofTeacherGrade : UploadIcon}
              alt="upload-icon"
            />
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
          </div>
          <Grid spacing={2} container>
            <Grid className="col" item xs={12} sm={12} mb={"none"}>
              <Input
                className="form-control input"
                label="Registrion Code Of Branch"
                name="reg_code_branch"
                onChange={onChange}
                error={errors.reg_code_branch ? true : false}
                helperText={
                  errors.reg_code_branch ? errors.reg_code_branch : " "
                }
              />
            </Grid>
          </Grid>
        </Box>
      </WrapContent>
    </Content>
  );
};

const Content = styled.div`
  .box {
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 25px 50px rgba(129, 129, 129, 0.1);
    border-radius: 10px;
    gap: 30px;
  }

  .paper {
    display: flex;
    /* min-width: 204px;
    min-height: 204px; */
    width: 100%;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: space-between;

    img {
      width: 30vh;
      height: 30vh;
      object-fit: cover;
      border: 3px dashed #dfdfdf;
    }
    /* background: red; */
  }

  .input {
    margin-top: 10px;
    width: 40vh;
    margin: 0;
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
