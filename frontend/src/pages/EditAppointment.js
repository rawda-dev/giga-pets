import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { isAuthenticated } from "../utils/auth";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { WithNavbar } from "./WithNavbar";
import { Button, Card, TextField, Typography } from "@mui/material";
import styled from "styled-components";

const CardContainer = styled(Card)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  justify-content: center;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-top: 1.2rem;
`;
const CenteredForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

export const EditAppointment = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState({
    id: "",
    petName: "",
    ownerName: "",
    aptDate: dayjs(Date.now()),
    aptNotes: "",
    error: "",
    success: false,
  });
  const { petName, ownerName, aptDate, aptNotes, error, success } = appointment;

  const navigate = useNavigate();
  useEffect(() => {
    const { token } = isAuthenticated();
    axios
      .get(`/api/users/${isAuthenticated().user._id}/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {

        setAppointment({
          petName: response.data.petName,
          ownerName: response.data.ownerName,
          aptDate: dayjs(response.data.aptDate),
          aptNotes: response.data.aptNotes,
        });
      })
      .catch((error) => {
        setAppointment({
          ...appointment,
          error: error.response.data.error,
        });
      });
  }, [id, appointment]);
  const handleChange = (name) => (event) => {
    setAppointment({
      ...appointment,
      error: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { token } = isAuthenticated();
    axios
      .put(
        `/api/users/${isAuthenticated().user._id}/appointments/${id}`,
        { petName, ownerName, aptNotes, aptDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setAppointment({
          ...appointment,
          petName: "",
          ownerName: "",
          aptDate: dayjs(appointment.aptDate),
          aptNotes: "",
          error: "",
          success: true,
        });
        navigate(`/my-appointments`);
      })
      .catch((error) => {
        setAppointment({
          ...appointment,
          error: error.response.data.error,
        });
      });
  };

  return (
    <WithNavbar>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CardContainer>
          <Typography variant="h5" component="h2">
            Edit Appointment
          </Typography>
          <CenteredForm onSubmit={onSubmit}>
            <TextField
              label="Pet Name"
              variant="outlined"
              value={petName}
              onChange={handleChange("petName")}
              required
            />
            <TextField
              label="Owner Name"
              variant="outlined"
              value={ownerName}
              onChange={handleChange("ownerName")}
              required
            />
            <TextField
              label="Appointment Notes"
              variant="outlined"
              value={aptNotes}
              onChange={handleChange("aptNotes")}
              required
            />
            <DatePicker
              label="Appointment Date"
              
              onChange={( newValue) => {
                setAppointment({
                  ...appointment,
                  aptDate: newValue,
                });
                  
                }}
              renderInput={(params) => <TextField {...params} />}
            />

            <ButtonContainer>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </ButtonContainer>
          </CenteredForm>
        </CardContainer>
      </LocalizationProvider>
    </WithNavbar>
  );
};
