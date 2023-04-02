import React, { useEffect, useState } from "react";
import { WithNavbar } from "./WithNavbar";
import vector from "../assets/pets_vector.png";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";
import styled from "styled-components";
import { isAuthenticated } from "../utils/auth";
const StyledCard = styled(Card)`
  margin: 10px;
  width: 100%;
  max-width: 500px;
  margin: 10px auto;
`;
const CenteredImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  max-width: 500px;
  margin: 0 auto;
`;

export const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/users/${isAuthenticated().user._id}/appointments`, {
        headers: { Authorization: `Bearer ${isAuthenticated().token}` },
      })
      .then((response) => {
        console.log(response.data);
        setAppointments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    setFilteredAppointments(
      appointments.filter((appointment) => {
        if (
          appointment.petName &&
          appointment.petName.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
        if (
          appointment.ownerName &&
          appointment.ownerName.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
        if (
          appointment.aptNotes &&
          appointment.aptNotes.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
      })
    );
  }, [search, appointments]);

  return (
    <WithNavbar>
      <CenteredImage src={vector} alt="animals vector" />
      <StyledContainer>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={search}
          margin="normal"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        {filteredAppointments.map((appointment) => (
          <StyledCard key={appointment._id}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {appointment.aptDate}
              </Typography>
              <Typography variant="h5" component="div">
                {appointment.petName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {appointment.ownerName}
              </Typography>
              <Typography variant="body2">{appointment.aptNotes}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="primary">
                Edit
              </Button>
              <Button size="small" variant="contained" color="error">
                Delete
              </Button>
            </CardActions>
          </StyledCard>
        ))}
      </StyledContainer>
    </WithNavbar>
  );
};
