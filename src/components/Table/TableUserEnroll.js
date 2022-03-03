import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import React from "react";
import BoxCustom from "../Box";

export default function TableUserEnroll(props) {
  const {
    data,
    total,
    limit = 10,
    page = 0,
    onClickAction,
    onChangePage,
    onChangeRowPerpage,
  } = props;

  const columns = [
    { id: "no", label: "No", maxWidth: 12 },
    {
      id: "created_at",
      label: "Date Enroll",
      minWidth: 170,
      align: "center",
      format: (val) => {
        return moment(val).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      id: "fullname",
      label: "Fullname",
      minWidth: 80,
      align: "center",
    },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
      align: "center",
    },
    {
      id: "study",
      label: "Study Taken",
      minWidth: 170,
      align: "center",
    },
    {
      id: "detail",
      label: "Detail",
      minWidth: 120,
      align: "center",
      format: (id) => {
        console.log(id);
        return (
          <>
            <BoxCustom direction="row" justify="space-between">
              <Button
                onClick={(e) => onClickAction(e, id, "accept")}
                size="small"
                variant="contained"
              >
                Accept
              </Button>
              <Button
                onClick={(e) => onClickAction(e, id, "reject")}
                size="small"
                variant="outlined"
                color="error"
              >
                Reject
              </Button>
            </BoxCustom>
          </>
        );
      },
    },
  ];

  let initialNumber = limit * page;
  let increment = 1;
  const rows = data.map((item, key) => {
    let number = initialNumber + increment;
    increment++;
    return {
      no: number,
      fullname: item.user.profile.fullname,
      email: item.user.email,
      created_at: item.created_at,
      study: item.master_studies.title,
      detail: item.id,
    };
  });

  return (
    <>
      {/* </BoxCustom> */}
      <TableContainer sx={{ height: "75%" }}>
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
                    if (column.id === "detail") console.log(value);
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
