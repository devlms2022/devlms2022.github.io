import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import BoxCustom from "../Box";
import { Subtitle } from "../Text";

const HeaderContent2 = (props) => {
  const { title, subtitle, shownBtn = false, componentBtn } = props;
  return (
    <Div {...props} className="head">
      <div>
        <Subtitle>
          <span>{title}</span>
        </Subtitle>
        <span className="label-study">{subtitle}</span>
      </div>
      {shownBtn && <div>{componentBtn}</div>}
    </Div>
  );
};

export default HeaderContent2;

HeaderContent2.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  shownBtn: PropTypes.bool,
  componentBtn: PropTypes.element,
};

const Div = styled(BoxCustom)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  .label-study {
    font-size: 14px;
    color: #b8b8b8;
  }
  margin-bottom: 15px;
`;
