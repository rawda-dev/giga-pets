import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import React, { useState } from "react";
import { RegisterMobile } from "../components/register/RegisterMobile";
import { RegisterTablet } from "../components/register/RegisterTablet";
import { RegisterDesktop } from "../components/register/RegisterDesktop";
export const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onRegister = () => {
    if (name === "" || email === "" || password === "") {
      setError("Please fill in all fields");
    } else {
      axios
        .post("/api/users", {
          name,
          email,
          password,
        })
        .then((res) => {
          console.log(res.data);
          navigate("/login");
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
  };

  if (isMobile) {
    return (
      <RegisterMobile
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
    );
  }
  if (isTablet) {
    return (
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
    );
  }
  if (isDesktop) {
    return (
      <RegisterDesktop
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
    );
  }
};
