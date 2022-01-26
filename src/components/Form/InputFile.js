import React from "react";
import styled from "styled-components";

const InputFIle = (props) => {
  const { variant = "container", label, name } = props;
  return (
    <Div>
      <input
        id={name}
        {...props}
        style={{ display: "none" }}
        type={"file"}
      
        
        // onChange={this.fileSelectedHandler}
      />
      <label htmlFor={name} variant={variant} className="button-input">
        {label}
      </label>
    </Div>
  );
};

const Div = styled.div`
  /* min-width : 320px; */
  display: flex;
  .button-input {
    padding: 10px 22px;
    width: 100%;
    color: ${(props) => props.variant === "container" ? "white" : "var(--primary-color)"};
    text-align: center;
    border-radius: 8px;
    border: ${(props) =>
      props.variant === "container" ? "0px" : "1px solid var(--primary-color)"};
    background: ${(props) =>
      props.variant === "container" ? "var(--primary-color)" : "white"};
    &:hover {
      cursor: pointer;
    }
  }
`;

export default InputFIle;
