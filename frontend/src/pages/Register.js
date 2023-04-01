import { Grid, Item, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { RegisterMobile } from "../components/RegisterMobile";
import { RegisterTablet } from "../components/RegisterTablet";
import { RegisterDesktop } from "../components/RegisterDesktop";
export const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  if (isMobile) {
    return <RegisterMobile />;
  }
  if (isTablet) {
    return <RegisterTablet />;
  }
    if (isDesktop) {
    return <RegisterDesktop />;
    }
};
