import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ButtonCustom from "../Button/Button";
import { Button } from "@mui/material";
import BoxCustom from "../Box";

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
          <ButtonCustom size="small" variant="outlined" >See More</ButtonCustom>
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
        <BoxCustom direction="row" align="center" justify="space-evenly" >
          <ButtonCustom >Apply</ButtonCustom>
          <Button color="error">Decline</Button>
        </BoxCustom>
       
      );
    },
  },
];




export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {data} = props;

  const rows = data.map((item,key) => {
    return {
      no : key+1,
      fullname : item.front_name+" "+item.family_name,
      category : item.category === "2" ? "Teacher" : (item.category === "3" ? "Student" : ""),
      detail : item.id,
      action : item.id
    }
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                const fullname = row.front_name+" "+row.family_name;
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
    </Paper>
  );
}
