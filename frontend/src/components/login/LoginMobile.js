import logo from "../../assets/logo.png";
import { Button, TextField, Container, FormHelperText } from "@mui/material";
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

export const LoginMobile = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
  onLogin,
}) => {
  return (
    <CenteredContainer>
      <Logo src={logo} alt="logo" />

      <TextField
        id="outlined-basic"
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
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
        onClick={onLogin}
      >
        Login
      </ButtonContainer>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </CenteredContainer>
  );
};
