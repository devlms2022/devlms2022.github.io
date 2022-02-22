import {
  AppRegistration,
  Delete as DeleteIcon,
  ModeEdit as EditIcon,
  Badge,
  Settings,
} from "@mui/icons-material";
import {  IconButton, Tooltip } from "@mui/material";
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

export default function TableClasses(props) {
  const {
    data,
    total,
    limit = 10,
    page,
    onChangePage,
    onChangeRowPerpage,
    actionClicked,
    role_id,
  } = props;

  const columns = [
    { id: "no", label: "No", minWidth: 10 },
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
      id: "name",
      label: "Name",
      minWidth: 100,
      align: "left",
    },
    {
      id: "email",
      label: "Email Enrollment",
      minWidth: 100,
      align: "left",
    },
    {
      id: "role",
      label: "Role",
      minWidth: 100,
      align: "left",
    },
    {
      id: "created_at",
      label: "Registered At",
      minWidth: 100,
      align: "left",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 20,
      align: "center",
      format: ({id, id_study, id_user}) => {
        return (
          <BoxCustom direction="row" width="100%" justify="center">
            {role_id === "1" && (
              <>
              
                <Tooltip placement="top" title="See Profile">
                  <IconButton
                    onClick={(e) => actionClicked(e, "detail", id, id_user)}
                    color="info"
                  
                    size="small"
                  >
                     <Badge />
                  </IconButton>
                </Tooltip>
              </>
            )}
            {role_id === "2" && (
              <>
                <Tooltip title="Set Course">
                  <IconButton
                    onClick={(e) => actionClicked(e, "setup", id, id_study)}
                    color="secondary"
                    size="small"
                  >
                    <AppRegistration />
                  </IconButton>
                </Tooltip>
              </>
            )}
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
      study: item.master_study.name_study,
      faculty: item.master_study.faculty.name,
      name: item.user.profile.fullname || "-",
      email: item.user.email,
      role: item.user.role_id === "2" ? "Teacher" : "Student",
      created_at: util.moment(item.created_at),
      action: {
        id: item.id,
        id_study: item.id_study,
        id_user : item.id_user,
      }
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

TableClasses.propTypes = {
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
