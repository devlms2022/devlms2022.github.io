import { Delete, TextSnippet } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropsType from "prop-types";
import React from "react";
import util from "../../utils/utilities";
import { default as BoxCustom } from "../Box";

export default function TableStudentEnrollCourse(props) {
  const { data, actionClicked, role_id, limit, page } = props;

  const columns = [
    { id: "no", label: "No", minWidth: 10 },
    {
      id: "name",
      label: "Name",
      align: "left",
    },
    {
      id: "email",
      label: "Email",
      align: "left",
    },
    {
      id: "progress",
      label: "Progress",
      minWidth: 100,
      align: "center",
    },
    {
      id: "created_at",
      label: "Join Date",
      minWidth: 100,
      align: "left",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 20,
      align: "center",
      format: ({ id_class, id_user }) => {
        return (
          <BoxCustom direction="row" width="100%" justify="center">
            <Tooltip placement="top" title="See More">
              <IconButton
                onClick={(e) => actionClicked(e, "detail", id_class, id_user)}
                color="info"
                size="small"
              >
                <TextSnippet />
              </IconButton>
            </Tooltip>
            <Tooltip placement="top" title="Delete">
              <IconButton
                onClick={(e) => actionClicked(e, "delete", id_class, id_user)}
                size="small"
                color="error"
              >
                <Delete />
              </IconButton>
            </Tooltip>
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
      name: item.user.profile.fullname,
      email: item.user.email,
      progress: "0%",
      created_at: util.moment(item.created_at),
      action: {
        id_class: item.id,
        id_user: item.id_user,
      },
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
    </>
  );
}

TableStudentEnrollCourse.propTypes = {
  data: PropsType.array.isRequired,
  actionClicked: PropsType.func,
  role_id: PropsType.number,
  limit: PropsType.number.isRequired,
  page: PropsType.number.isRequired,
};
