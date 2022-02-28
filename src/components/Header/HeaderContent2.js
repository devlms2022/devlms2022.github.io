import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import BoxCustom from "../Box";
import { Subtitle } from "../Text";

const HeaderContent2 = (props) => {
  const { title, subtitle } = props;
  return (
    <Div {...props} className="head">
      <Subtitle>
        <span>{title}</span>
      </Subtitle>
      <span className="label-study">{subtitle}</span>
    </Div>
  );
};

export default HeaderContent2;

HeaderContent2.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

const Div = styled(BoxCustom)`
  .label-study {
    font-size: 14px;
    color: #b8b8b8;
  }
  margin-bottom: 15px;
`;
