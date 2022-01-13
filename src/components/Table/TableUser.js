import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import ButtonCustom from "../Button/Button";
import Search from "../Form/Search";
import Paper from "../Paper";
import moment from "moment";
import Navtab from "../Navtab";
import CustomeBox from "../Box";

export default function TableUser(props) {
  const {
    data,
    total,
    limit = 10,
    page,
    onChangePage,
    onChangeRowPerpage,
    onSearch,
    onSwitch,
    onClickDetail
  } = props;

  const [navIndexActive, setNavIndexActive] = useState(0);


  const columns = [
    { id: "no", label: "No", minWidth: 20 },
    {
      id: "fullname",
      label: "Full Name",
      minWidth: 170,
      align: "center",
    },
    {
      id: "created_at",
      label: "Date Registration",
      minWidth: 80,
      align: "center",
      format: (val) => {
        return moment(val).format("DD/MM/YYYY HH:mm:ss");
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
            <ButtonCustom onClick={() => onClickDetail(value)} size="small" variant="outlined">
              See More
            </ButtonCustom>
          </>
        );
      },
    },
   
  ];

  let initialNumber = limit*page;
  let increment = 1;
  const rows = data.map((item, key) => {
    let number = initialNumber + increment;
    increment++;
    return {
      no: number,
      fullname: item.profile.front_name + " " + item.profile.family_name,
      created_at: item.created_at,
      detail: item.id,
    };
  });

  const tabs = [
    {
      label: "Students",
      name: "student",
    },
    {
      label: "Teachers",
      name: "teacher",
    },
  ];

  return (
    <ContainTable>
      <Grid className="filter" container spacing={1}>
        <Grid sm={12} md={6} xl={6} item>
          <CustomeBox width="50%">
            <Navtab
              navIndexActive={navIndexActive}
              tabsData={tabs}
              onClick={(e, indexNav) => {
                setNavIndexActive(indexNav);
                onSwitch(e.target.name);
              }}
            />
          </CustomeBox>
        </Grid>
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
    </ContainTable>
  );
}

const ContainTable = styled(Paper)`
  .filter {
    margin-bottom: 15px;
  }
`;
