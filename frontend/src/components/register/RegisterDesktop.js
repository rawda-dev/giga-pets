import React from "react";
import { Button, FormHelperText, Grid, TextField } from "@mui/material";
import petsVector from "../../assets/pets_vector.png";
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
  background-color: #e5f8fb;
`;
const GridContainer = styled(Grid)`
  height: 100vh;
`;

export const RegisterDesktop = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
  onRegister,
}) => {
  return (
    <GridContainer container>
      <Grid item xs={6}>
        <CenteredContainer>
          <Image src={petsVector} alt="Cat and dog vector" />
        </CenteredContainer>
      </Grid>
      <RightGrid item xs={6}>
        <RegisterTablet
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          setError={setError}
          onRegister={onRegister}
        />
      </RightGrid>
      {error && <FormHelperText>{error}</FormHelperText>}
    </GridContainer>
  );
};
