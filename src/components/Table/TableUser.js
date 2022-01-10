import React, { useState } from "react";
import Paper from "../Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ButtonCustom from "../Button/Button";
import { Button, Grid } from "@mui/material";
import BoxCustom from "../Box";
import Swal from "sweetalert2";
import Search from "../Form/Search";
import styled from "styled-components";

export default function TableUser(props) {
  const { data, total, limit = 10, onSearch} = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limit);

  const handleAction = (e) => {
    const { name, id } = e.target;
    Swal.fire({
      title: `Are you sure, want to ${name} this user?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        props.actionClicked({ status: name, id });
      }
    });
  };

  const columns = [
    { id: "no", label: "No", minWidth: 20 },
    {
      id: "fullname",
      label: "Full Name",
      minWidth: 170,
      align: "center",
    },
    {
      id: "category",
      label: "Category",
      minWidth: 170,
      align: "center",
    },
    {
      id: "detail",
      label: "Detail",
      minWidth: 170,
      align: "center",
      format: (value) => {
        return (
          <>
            <ButtonCustom size="small" variant="outlined">
              See More
            </ButtonCustom>
          </>
        );
      },
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
      format: (value) => {
        return (
          <BoxCustom direction="row" align="center" justify="space-evenly">
            <ButtonCustom id={value} onClick={handleAction} name="accept">
              Accept
            </ButtonCustom>
            <Button
              id={value}
              onClick={handleAction}
              name="reject"
              color="error"
            >
              Reject
            </Button>
          </BoxCustom>
        );
      },
    },
  ];

  const rows = data.map((item, key) => {
    return {
      no: key + 1,
      fullname: item.profile.front_name + " " + item.profile.family_name,
      category:
        item.role_id === "2"
          ? "Teacher"
          : item.role_id === "3"
          ? "Student"
          : "Admin",
      detail: item.id,
      action: item.id,
    };
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ContainTable >
      <Grid className="filter" container spacing={1}>
        <Grid sm={12} md={6} xl={6} item></Grid>
        <Grid sm={12} md={6} xl={6} item>
          <Search onChange={onSearch} width="100%" placeholder="Search..." />
        </Grid>
      </Grid>
      {/* </BoxCustom> */}
      <TableContainer sx={{ maxHeight: 440 }}>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                // console.log(row);
                const fullname = row.front_name + " " + row.family_name;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ContainTable>
  );
}

const ContainTable = styled(Paper)`
    .filter {
        margin-bottom : 15px;
    }
`;
