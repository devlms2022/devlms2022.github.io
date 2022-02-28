import {
  Delete as DeleteIcon,
  ModeEdit as EditIcon,
  RemoveRedEye,
} from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
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
import { default as BoxCustom } from "../Box";

export default function TableStudies(props) {
  const {
    data,
    total,
    limit = 10,
    page,
    onChangePage,
    onChangeRowPerpage,
    actionClicked,
    roleId,
    userId,
  } = props;

  const columns = [
    { id: "no", label: "No", minWidth: 10 },
    {
      id: "name_study",
      label: "title",
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
      id: "total_courses",
      label: "Total Courses",
      minWidth: 100,
      align: "left",
    },
    {
      id: "created_at",
      label: "Created At",
      minWidth: 100,
      align: "left",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 20,
      align: "center",
      format: ({ id, teacher_study }) => {
        if (roleId === "1") {
          return (
            <BoxCustom direction="row" width="100%" justify="center">
              <Tooltip title="See More">
                <IconButton
                  onClick={(e) => actionClicked(e, "detail", id)}
                  color="secondary"
                  size="small"
                >
                  <RemoveRedEye fontSize="12px" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
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
              </Tooltip>
            </BoxCustom>
          );
        } else if (roleId === "2") {
          const cekStatus = teacher_study.find(
            (item) => item.id_user === userId
          );

          console.log(cekStatus);

          return (
            <BoxCustom direction="row" width="100%" justify="center">
              {cekStatus ? (
                <>
                  <Button
                    size="small"
                    variant="text"
                    color={
                      cekStatus.status_confirm === "reject"
                        ? "error"
                        : "primary"
                    }
                    disabled={
                      cekStatus.status_confirm === "reject" ? false : true
                    }
                  >
                    {cekStatus.status_confirm === "pending"
                      ? "Waiting Confirm"
                      : cekStatus.status_confirm === "accept"
                      ? "JOINED"
                      : "REJECTED"}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={(e) => actionClicked(e, "join", id)}
                    size="small"
                    variant="contained"
                  >
                    JOIN
                  </Button>
                </>
              )}
            </BoxCustom>
          );
        }
      },
    },
  ];

  let initialNumber = limit * page;
  let increment = 1;
  const rows = data.map((item, key) => {
    let number = initialNumber + increment;
    increment++;
    return {
      id: item.id,
      no: number,
      name_study: item.name_study,
      faculty: item.faculty.name,
      created_at: util.moment(item.created_at),
      total_courses: 0,
      action: {
        id: item.id,
        teacher_study: item.teacher_study,
      },
    };
  });

  // console.log("rows",rows);

  return (
    <>
      {/* </BoxCustom> */}
      <TableContainer sx={{ maxHeight: 378 }}>
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

TableStudies.propTypes = {
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
  userId: PropsType.string,
};
