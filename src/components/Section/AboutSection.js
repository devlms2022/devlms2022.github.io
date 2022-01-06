import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components";
import { Title } from "../Text";
import AboutImage from "../../assets/images/about.svg";

const AboutSection = () => {
  return (
    <SectionStyled>
      <Grid container className="flex">
        <Grid item sm={6}>
          <img src={AboutImage} width={"100%"} />
        </Grid>
        <Grid item sm={6}>
          <Box className="box">
            <Title text="Join Now" />
            <span>
              This website is an assistance facility from the government which
              is devoted to the homeless in getting an education which aims as a
              foundation to help the homeless in getting a job and a better
              life.
            </span>
          </Box>
        </Grid>
      </Grid>
    </SectionStyled>
  );
};

const SectionStyled = styled.section`
  margin-bottom: 200px;

  .box {
    margin-left: 50px;
    width: 80%;
  }

  .flex {
    display: flex;
    align-items: flex-start;
    h1 {
      margin-bottom: 50px;
    }

    span {
      line-height: 150%;
      font-size: 16pt;
      font-weight: 300;
    }
  }
`;

export default AboutSection;
