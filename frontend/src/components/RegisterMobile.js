import logo from "../assets/logo.png";
import { Button, TextField, Container } from "@mui/material";
import styled from "styled-components";
const CenteredContainer = styled(Container)`
    display: flex !important;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    gap: 0.2rem;
    
`;
const Logo = styled.img`
    width: 10rem;
    margin-bottom: 2rem;
`;
const ButtonContainer = styled(Button)`
   
    margin-top: 4rem !important;
`;

export const RegisterMobile = () => {
  return (
    <CenteredContainer>
      <Logo  src={logo} alt="logo" />
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <ButtonContainer variant="contained" color="warning" size="large">
        Register
      </ButtonContainer>
    </CenteredContainer>
  );
};
