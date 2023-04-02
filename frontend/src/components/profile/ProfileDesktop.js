import { Button, Paper, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { isAuthenticated } from "../../utils/auth";

const CenteredContainer = styled(Paper)`
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;
const RoundedImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-top: 1.2rem;
`;

export const ProfileDesktop = ({ id, name, email, about, handleChange }) => {
  return (
    <CenteredContainer>
      <RoundedImage src={`/api/users/${id}/photo`} alt="profile" />
      <h2>{name}</h2>
      <Typography variant="body1">{email}</Typography>
      {about && <Typography variant="body1">{about}</Typography>}
      <ButtonContainer>
        <Button
          variant="contained"
          component={RouterLink}
          to={`/users/${isAuthenticated().user._id}/profile/edit`}
          color="primary"
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          component={RouterLink}
          to={`/users/${id}/profile/delete`}
        >
          Delete
        </Button>
      </ButtonContainer>
    </CenteredContainer>
  );
};
