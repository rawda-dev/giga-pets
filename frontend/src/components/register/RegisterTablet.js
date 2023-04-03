import logo from "../../assets/logo.png";
import { Button, TextField, Container, FormHelperText } from "@mui/material";
import styled from "styled-components";
const CenteredContainer = styled(Container)`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem !important;
  gap: 0.2rem;
`;
const Logo = styled.img`
  width: 10rem;
  margin-bottom: 2rem;
`;
const ButtonContainer = styled(Button)`
  margin-top: 4rem !important;
`;

export const RegisterTablet = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  error,
  onRegister,
}) => {
  return (
    <CenteredContainer>
      <Logo src={logo} alt="logo" />
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        fullWidth
        type="text"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        fullWidth
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <ButtonContainer
        variant="contained"
        color="warning"
        size="large"
        onClick={onRegister}
      >
        Register
      </ButtonContainer>
      <FormHelperText error>{error}</FormHelperText>
    </CenteredContainer>
  );
};
