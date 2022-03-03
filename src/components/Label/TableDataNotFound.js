import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

const TableDataNotFound = (props) => {
  const { label } = props;
  return (
    <Wrapper>
      <Typography variant="body2">{label ? label : "No Data Found"}</Typography>
    </Wrapper>
  );
};

export default TableDataNotFound;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
`;

TableDataNotFound.propTypes = {
  label: PropTypes.string,
};
