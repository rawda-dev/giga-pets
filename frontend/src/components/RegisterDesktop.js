import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import petsVector from "../assets/pets_vector.png";
import styled from "styled-components";
import { RegisterTablet } from "./RegisterTablet";
const CenteredContainer = styled(Grid)`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Image = styled.img`
  width: 50%;
  object-fit: cover;
`;
const RightGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  background-color: #E5F8FB;
`;
const GridContainer = styled(Grid)`
  height: 100vh;
`;

export const RegisterDesktop = () => {
  return (
    <GridContainer container>
      <Grid item xs={6}>
        <CenteredContainer>
          <Image src={petsVector} alt="Cat and dog vector" />
        </CenteredContainer>
      </Grid>
      <RightGrid item xs={6}>
        <RegisterTablet />
      </RightGrid>
    </GridContainer>
  );
};
