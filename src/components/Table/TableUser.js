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

export default function TableUser(props) {
  const {
    data,
    total,
    limit = 10,
    page,
    onChangePage,
    onChangeRowPerpage,
    onClickDetail,
  } = props;

  const columns = [
    { id: "no", label: "No", maxWidth: 12 },
    {
      id: "fullname",
      label: "Full Name",
      minWidth: 170,
      align: "center",
    },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
    },
    {
      id: "role",
      label: "Role",
      minWidth: 170,
    },
    {
      id: "created_at",
      label: "Date Registration",
      minWidth: 80,
      align: "center",
      format: (val) => {
        return moment(val).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      id: "detail",
      label: "Detail",
      minWidth: 170,
      align: "center",
      format: (value) => {
        return (
          <>
            <Button
              onClick={() => onClickDetail(value)}
              size="small"
              variant="contained"
            >
              See More
            </Button>
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
      fullname: item.profile.fullname,
      email: item.email,
      role: item.role_id === "2" ? "Teacher" : "Student",
      created_at: item.created_at,
      detail: item.id,
    };
  });

  return (
    <>
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
