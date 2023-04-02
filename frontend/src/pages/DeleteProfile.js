import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Icon, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { isAuthenticated, clearJWT } from "../utils/auth";
import axios from "axios";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

const ErrorMessageContainer = styled.div`

    font-size: 2rem;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;

`;
export const DeleteProfile = () => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(""); // [error, setError
  const [redirectToLogin, setRedirectToLogin] = React.useState(false);
  const { token } = isAuthenticated();
  console.log(token);

  const deleteAccount = () => {
    axios
      .delete(`/api/users/${isAuthenticated().user._id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        clearJWT(() => {
          setRedirectToLogin(true);
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.error);
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (redirectToLogin) return <Navigate to="/" />;
  return (
    <ErrorMessageContainer>
      <Typography component="h6">Delete Account</Typography>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete your account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can't be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={deleteAccount}>Confirm</Button>
        </DialogActions>
      </Dialog>
      {error && (
        <Typography component="p" color="error">
          <Icon color="error">error</Icon>
          {error}
        </Typography>
      )}
    </ErrorMessageContainer>
  );
};
