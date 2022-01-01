import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components";
import HeroImage from "../../assets/images/hero.png";
import Tittle from "../Text/Tittle";

const HeroSection = () => {
  return (
    <SectionStyled>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Box className="box">
            <Tittle text="Homeless people have the right to education" />
            <span>
              Get an education that you can learn here with a variety of
              education that you can choose to be useful for you..
            </span>
          </Box>
        </Grid>
        <Grid item sm={6}>
          <img src={HeroImage} width={"100%"} />
        </Grid>
      </Grid>
    </SectionStyled>
  );
};

const SectionStyled = styled.section`
  .box {
    width: 100%;
  }
`;

export default HeroSection;
