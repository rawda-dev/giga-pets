import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated, clearJWT } from "../utils/auth";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../assets/logo_transparent.png";
import { Button, Link } from "@mui/material";

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const preventDefault = (e) => e.preventDefault();
  React.useEffect(() => {
    if (!isAuthenticated()) {
        navigate("/login");
    }
    }, []);

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={(e) => {
                  handleCloseNavMenu();
                  preventDefault(e);
                }}
              >
                <Link
                  textAlign="center"
                  component={RouterLink}
                  to="/my-appointments"
                  underline="none"
                >
                  My Appointments
                </Link>
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  handleCloseNavMenu();
                  preventDefault(e);
                }}
              >
                <Link
                  textAlign="center"
                  component={RouterLink}
                  to="/new-appointment"
                  underline="none"
                >
                  New Appointment
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <img src={Logo} alt="logo" />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              to="/my-appointments"
              underline="none"
              component={RouterLink}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              My Appointments
            </Button>
            <Button
              to="/new-appointment"
              underline="none"
              component={RouterLink}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              New Appointments
            </Button>
          </Box>
          {!isAuthenticated() && (
            <>
              <Button
                to="/login"
                underline="none"
                component={RouterLink}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login
              </Button>
              <Button
                to="/register"
                underline="none"
                component={RouterLink}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Register
              </Button>
            </>
          )}
          {isAuthenticated() && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={`${isAuthenticated().user.name} avatar`}
                    src={`/api/users/${isAuthenticated().user._id}/photo`}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  component={RouterLink}
                  to={`/users/${isAuthenticated().user._id}/profile`}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">My Profile</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    clearJWT(() => {
                      navigate("/");
                    });
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
