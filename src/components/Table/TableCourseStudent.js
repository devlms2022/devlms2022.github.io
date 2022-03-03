import { Badge, PlayLesson, TextSnippet } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
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

export default function TableCourseStudent(props) {
  const { data, actionClicked, role_id, limit, page } = props;

  const columns = [
    { id: "no", label: "No", minWidth: 10 },

    {
      id: "course",
      label: "Course",
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
      id: "status",
      label: "Status",
      minWidth: 100,
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
      label: "",
      minWidth: 20,
      align: "center",
      format: ({ id_class, id_study, id_course, status_confirm }) => {
        return (
          <BoxCustom direction="row" width="100%" justify="center">
            {status_confirm === "accept" && (
              <Button
                onClick={(e) =>
                  actionClicked(e, "continue", id_class, id_course)
                }
                startIcon={<PlayLesson fontSize="small" />}
                size="small"
              >
                Continue Learning
              </Button>
            )}
            {(status_confirm === "pending" || status_confirm === "reject") && (
              <Button
                onClick={(e) => actionClicked(e, "detail", id_class, id_course)}
                startIcon={<TextSnippet fontSi9ze="small" />}
                size="small"
              >
                See More Course
              </Button>
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
      course: item.master_course.title_course,
      teacher: item.master_course.created.profile.fullname || "-",
      progress: "0%",
      status: item.status_confirm,
      created_at: util.moment(item.created_at),
      action: {
        id_class: item.id,
        id_study: item.id_study,
        id_course: item.id_course,
        status_confirm: item.status_confirm,
      },
    };
  });

  // console.log("rows",rows);

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

TableCourseStudent.propTypes = {
  data: PropsType.array.isRequired,
  actionClicked: PropsType.func,
  role_id: PropsType.number,
  limit: PropsType.number.isRequired,
  page: PropsType.number.isRequired,
};