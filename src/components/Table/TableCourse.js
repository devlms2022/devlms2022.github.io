import { ChromeReaderMode } from "@mui/icons-material";
import { Button, Chip, Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PropsType from "prop-types";
import React from "react";
import util from "../../utils/utilities";
import BoxCustom from "../Box";

export default function TableCourse(props) {
  const {
    data,
    total,
    limit = 10,
    page,
    role_id,
    onChangePage,
    onChangeRowPerpage,
    actionClicked,
  } = props;

  const columns = [
    { id: "no", label: "No", minWidth: 10 },
    {
      id: "name_course",
      label: "Course Name",
      minWidth: 100,
      align: "left",
    },
    {
      id: "study",
      label: "Study",
      minWidth: 100,
      align: "left",
    },
    {
      id: "faculty",
      label: "Faculty",
      minWidth: 100,
      align: "left",
    },
    {
      id: "teacher",
      label: "Teacher (Author)",
      minWidth: 100,
      align: "left",
    },
    {
      id: "chapter",
      label: "Total Chapter",
      minWidth: 100,
      align: "center",
    },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      align: "center",
      format: status => {
        return <Chip label={status === 'accept' ? "published" : status} size="small" color="secondary" />
      }
    },
    {
      id: "updated_at",
      label: "Update Course",
      minWidth: 100,
      align: "center",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 20,
      align: "center",
      format: ({idStudy, idCourse}) => {
        return (
          
          <BoxCustom direction="row" width="100%" justify="center">
            <Tooltip title="View Detail">
              <Button
                onClick={(e) => actionClicked(e, "detail", {idStudy, idCourse})}
                color="primary"
                variant="contained"
                size="small"
              >
                View Detail
              </Button>
            </Tooltip>
            {/* <Tooltip title="Edit">
              <IconButton
                onClick={(e) => actionClicked(e, "edit", id)}
                color="primary"
                size="small"
              >
                <EditIcon fontSize="12px" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={(e) => actionClicked(e, "delete", id)}
                color="error"
                size="small"
              >
                <DeleteIcon fontSize="12px" />
              </IconButton>
            </Tooltip> */}
          </BoxCustom>
        );
      },
    },
  ];

  let initialNumber = limit * page;
  let increment = 1;
  const rows = data.map((item, key) => {
    const { chapters, master_study, created } = item;
    let number = initialNumber + increment;
    increment++;
    return {
      id: item.id,
      no: number,
      name_course: item.title_course,
      study: master_study.name_study,
      faculty: master_study.faculty.name,
      teacher: created.profile.fullname,
      chapter: chapters.length,
      status : item.status.toLowerCase() ,
      updated_at: util.moment(item.updated_at),
      action: {
        idStudy: master_study.id,
        idCourse: item.id,
      },
    };
  });

  // console.log("rows",rows);

  return (
    <>
      {/* </BoxCustom> */}
      <TableContainer sx={{ height : "75%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.no}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={total}
        rowsPerPage={limit}
        page={page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowPerpage}
      />
    </>
  );
}

TableCourse.propTypes = {
  data: PropsType.array,
  total: PropsType.number,
  limit: PropsType.number,
  page: PropsType.number,
  onChangePage: PropsType.func,
  onChangeRowPerpage: PropsType.func,
  actionClicked: PropsType.func,
  edit: PropsType.object,
  onChangeEdit: PropsType.func,
  onSaveEdit: PropsType.func,
};
