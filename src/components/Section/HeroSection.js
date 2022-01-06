import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components";
import HeroImage from "../../assets/images/hero.png";
import { Title, Label } from "../Text";
import { OpenAccess, Education, Teacher, Everyone } from "../../assets/icons";

const HeroSection = () => {
  return (
    <SectionStyled>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Box className="box">
            <Title text="Homeless people have the right to education" />
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
      <div className="paper">
        <Grid container className="panjang">
          <Grid item sm={3}>
            <Box className="properFitur">
              <img src={OpenAccess} />
              <Label>Open to Everyone</Label>
            </Box>
          </Grid>
          <Grid item sm={3}>
            <Box className="properFitur">
              <img src={Everyone} />
              <Label>Open to Everyone</Label>
            </Box>
          </Grid>
          <Grid item sm={3}>
            <Box className="properFitur">
              <img src={Education} />
              <Label>Adequate Education</Label>
            </Box>
          </Grid>
          <Grid item sm={3}>
            <Box className="properFitur">
              <img src={Teacher} />
              <Label>Competent Teacher</Label>
            </Box>
          </Grid>
        </Grid>
      </div>
    </SectionStyled>
  );
};

const SectionStyled = styled.section`
  margin-top: 70px;
  margin-bottom: 200px;

  .box {
    width: 100%;
  }

  .font {
    font-size: 12pt;
  }

  .paper {
    margin-top: 100px;
    background: #ffffff;
    box-shadow: 0px 25px 50px rgba(129, 129, 129, 0.1);
    border-radius: 10px;
  }

  .properFitur {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    label {
      font-size: 16px;
    }
  }
`;

export default HeroSection;
