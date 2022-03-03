import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Grid, TablePagination } from "@mui/material";
import { TableStudentEnrollCourse } from "../../components/Table";
import { AddRounded } from "@mui/icons-material";
import Search from "../../components/Form/Search";
import DialogCustome from "../../components/Dialog";
import InputSelect from "../../components/Form/Select";

const StudentCourseList = (props) => {
  const {
    data,
    total,
    page,
    handleChangePage,
    limit,
    role_id,
    handleChangeRowsPerPage,
    onSearch,
    onClickSave,
    studentData = [],
  } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [studentIdAdd, setStudentIdAdd] = useState("");

  const handleClickSave = () => {
    onClickSave(studentIdAdd);
  };

  const handleChange = (e) => {
    setStudentIdAdd(e.target.value);
  };

  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} lg={5} md={6} xl={5}>
          {role_id === "1" && (
            <Button
              onClick={() => setOpenDialog(!openDialog)}
              size="small"
              startIcon={<AddRounded />}
            >
              Add Student
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sm={12} lg={7} md={6} xl={7}>
          <Search
            placeholder="Search Students"
            width="100%"
            onChange={onSearch}
          />
        </Grid>
      </Grid>
      <TableStudentEnrollCourse
        data={data}
        total={total}
        page={page}
        handleChangePage={handleChangePage}
        limit={limit}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <DialogCustome
        showSaveButton
        onSave={() => handleClickSave()}
        title="Add Student"
        open={openDialog}
        onClose={() => setOpenDialog(!openDialog)}
      >
        <InputSelect
          label="Select Student"
          data={studentData}
          defaultValue=""
          fullWidth
          onChange={handleChange}
        />
      </DialogCustome>
    </Wrapper>
  );
};

export default StudentCourseList;

const Wrapper = styled.div`
  padding: 10px;
  .add-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
`;

StudentCourseList.propTypes = {
  data: PropTypes.array,
  total: PropTypes.number,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
  limit: PropTypes.number,
  handleChangeRowsPerPage: PropTypes.func,
  onSearch: PropTypes.func,
  role_id: PropTypes.string,
  onClickSave: PropTypes.func,
  studentData: PropTypes.array,
};
