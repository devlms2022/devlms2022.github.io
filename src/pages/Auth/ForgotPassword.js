import { Password } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { Title } from "../../components/Text";

const ForgotPassword = () => {
  return (
    <div>
      <WrapContent>
        <Title text={"Forgot Password"} />
      </WrapContent>
    </div>
  );
};

const WrapContent = styled.div`
  h1 {
    text-align: center;
  }
`;

export default ForgotPassword;
