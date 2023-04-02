import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { isAuthenticated } from "../utils/auth";
import { ProfileMobile } from "../components/profile/ProfileMobile";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { ProfileDesktop } from "../components/profile/ProfileDesktop";
export const Profile = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.down("xl"));

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    about: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success, about } = user;
  const { token } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setUser({ ...user, error: false, [name]: event.target.value });
  };
  useEffect(() => {
    axios
      .get(`/api/users/${isAuthenticated().user._id}`, {
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
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setUser({ ...user, error: err.response.data.message });
      });
  }, []);
  if (isMobile) {
    return (
      <>
        <Navbar />
        <ProfileMobile
          id={id}
          name={name}
          email={email}
          about={about}
          password={password}
          handleChange={handleChange}
        />
      </>
    );
  }
  if (isTablet || isDesktop) {
    return (
      <>
        <Navbar />
        <ProfileDesktop
          id={id}
          name={name}
          email={email}
          about={about}
          password={password}
          handleChange={handleChange}
        />
      </>
    );
  }
};
