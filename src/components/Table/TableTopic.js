import {
  Delete as DeleteIcon,
  ModeEdit as EditIcon
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import util from "../../utils/utilities";
import { default as BoxCustom } from "../Box";
import Input from "../Form/Input";

export default function TableFaculty(props) {
  const {
    data,
    limit = 10,
    page,
    actionClicked,
    edit,
    onChangeEdit,
    onSaveEdit,
  } = props;

  const rowdata = (column, value, id) => {
    let result = column.format ? column.format(value) : value;
    if (edit.id) {
      if (edit.id === id) {
        if (column.id === "name")
          result = (
            <Input
              size="small"
              onBlur={onSaveEdit}
              autoFocus
              onChange={onChangeEdit}
              value={edit.name}
              name="name"
            />
          );
      }
    }
    return result;
  };

  const columns = [
    { id: "no", label: "No", minWidth: 10 },
    {
      id: "name",
      label: "Faculty",
      minWidth: 100,
      align: "left",
    },
    {
      id: "created_at",
      label: "Date Input",
      minWidth: 100,
      align: "left",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 20,
      align: "center",
      format: (id) => {
        return (
          <BoxCustom direction="row" width="100%" justify="center">
            <IconButton
              onClick={(e) => actionClicked(e, "edit", id)}
              color="primary"
              size="small"
            >
              <EditIcon fontSize="12px" />
            </IconButton>
            <IconButton
              onClick={(e) => actionClicked(e, "delete", id)}
              color="error"
              size="small"
            >
              <DeleteIcon fontSize="12px" />
            </IconButton>
          </BoxCustom>
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
      id: item.id,
      no: number,
      name: item.name,
      created_at: util.moment(item.created_at),
      action: item.id,
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
                        {/* {column.format ? column.format(value) : value} */}
                        {rowdata(column, value, row.id)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
