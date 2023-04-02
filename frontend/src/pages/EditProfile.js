import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { isAuthenticated } from "../utils/auth";
import axios from "axios";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Avatar, Button, Card, TextField, Typography } from "@mui/material";
import styled from "styled-components";
const CardContainer = styled(Card)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
`;
const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-top: 1.2rem;
`;

export const EditProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    about: "",
    error: "",
    success: false,
    photo: "",
    photoUrl: "",
  });
  const { name, email, password, photo, photoUrl, error, success, about } =
    user;
  const navigate = useNavigate();
  const handleChange = (name) => (event) => {
    setUser({ ...user, error: false, [name]: event.target.value });
  };
  useEffect(() => {
    const { token } = isAuthenticated();

    axios
      .get(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser({
          ...user,
          name: res.data.name,
          email: res.data.email,
          about: res.data.about,
        });
        setUser({ ...user, photoUrl: `/api/users/${id}/photo` });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setUser({ ...user, error: err.response.data.message });
      });
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    const { token } = isAuthenticated();
    const formData = new FormData();
    name && formData.append("name", name);
    email && formData.append("email", email);
    about && formData.append("about", about);
    password && formData.append("password", password);
    photo && formData.append("photo", photo);

    axios
      .put(`/api/users/${isAuthenticated().user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/users/${id}/profile`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <CardContainer>
        <form onSubmit={onSubmit}>
          <AvatarContainer>
            <Typography variant="h6" style={{ color: "#02DAFF" }}>
              Edit Profile
            </Typography>
            <Avatar
              alt={`${name} avatar`}
              src={photoUrl}
              sx={{ mx: "auto", mb: 2, width: 60, height: 60 }}
            />
            <Button
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
              component="label"
            >
              Upload <FileUploadIcon />
              <input
                hidden
                accept="image/*"
                onChange={(e) => {
                  setUser({ ...user, photo: e.target.files[0] });
                }}
                type="file"
              />
            </Button>
          </AvatarContainer>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            type="name"
            onChange={handleChange("name")}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            type="email"
            onChange={handleChange("email")}
            fullWidth
            margin="normal"
          />
          <TextField
            label="About"
            variant="outlined"
            multiline
            rows={2}
            value={about}
            onChange={handleChange("about")}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            value={password}
            type="password"
            onChange={handleChange("password")}
            fullWidth
            margin="normal"
          />
          <ButtonContainer>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              
              margin="normal"
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="warning"
              
              margin="normal"
              onClick={() => navigate(`/users/${id}/profile`)}
            >
              Cancel
            </Button>
          </ButtonContainer>
        </form>
      </CardContainer>
    </>
  );
};
