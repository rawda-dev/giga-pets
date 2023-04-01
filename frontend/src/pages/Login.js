import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import React, { useState } from "react";
import { LoginTablet } from "../components/login/LoginTablet";
import { LoginDesktop } from "../components/login/LoginDesktop";
import { LoginMobile } from "../components/login/LoginMobile";
import { authenticate } from "../utils/auth";
export const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onLogin = () => {
    if (email === "" || password === "") {
      setError("Please fill in all fields");
    } else {
      axios
        .post("/api/auth/login", {
          email,
          password,
        })
        .then((res) => {
          authenticate(res.data, () => {
            console.log("Login successful");
            console.log(res.data);
            setError("");
            navigate("/");
          });
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
  };

  if (isMobile) {
    return (
      <LoginMobile
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        setError={setError}
        onLogin={onLogin}
      />
    );
  }
  if (isTablet) {
    return (
      <LoginTablet
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        setError={setError}
        onLogin={onLogin}
      />
    );
  }
  if (isDesktop) {
    return (
      <LoginDesktop
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        setError={setError}
        onLogin={onLogin}
      />
    );
  }
};
