import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Login } from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Register } from "./pages/Register";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Profile } from "./pages/Profile";
import { EditProfile } from "./pages/EditProfile";
import { DeleteProfile } from "./pages/DeleteProfile";
import { NewAppointment } from "./pages/NewAppointment";
import { MyAppointments } from "./pages/MyAppointments";
import { EditAppointment } from "./pages/EditAppointment";
import { DeleteAppointment } from "./pages/DeleteAppointment";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/users/:id/profile" exact element={<Profile />} />
        <Route path="/users/:id/profile/edit" exact element={<EditProfile />} />
        <Route path="/users/:id/profile/delete" exact element={<DeleteProfile />} />
        <Route path="/new-appointment" exact element={<NewAppointment />} />
        <Route path="/appointments/:id/edit" exact element={<EditAppointment />} />
        <Route path="/appointments/:id/delete" exact element={<DeleteAppointment />} />
        <Route path="/my-appointments" exact element={<MyAppointments />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
