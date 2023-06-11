import { Menu as MenuIcon, Login, Person, Logout } from "@mui/icons-material";
import {
  AppBar as MuiAppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { OpenStateContext } from "../contexts/OpenStateContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { open, toggleOpen } = useContext(OpenStateContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const profileItems = [
    {
      text: "Account",
      icon: <Person color="secondary" />,
      path: "/account",
      handleClick: () => handleNavigate("/account"),
    },
    {
      text: "Logout",
      icon: <Logout color="secondary" />,
      path: "/user/logout",
      handleClick: () => {
        signOut(auth).then(() => {
          handleNavigate("/auth");
        });
      },
    },
  ];

  const capitaliseFirstLetter = (str) => {
    if (typeof str === "string") {
      if (str.length > 0) {
        return str.charAt(0).toUpperCase();
      } else {
        return str;
      }
    } else {
      return str;
    }
  };

  return (
    <AppBar
      sx={{
        color: (theme) => theme.palette.secondary.main,
        background: (theme) => theme.palette.common.white,
      }}
      elevation={1}
      open={open}
      position="fixed"
    >
      <Toolbar sx={{ marginLeft: 2, marginRight: 2 }}>
        {user && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography sx={{ flexGrow: 1 }}>Welcome to notes keeping</Typography>
        {!user ? (
          <>
            <Button
              variant="outlined"
              endIcon={<Login />}
              color="secondary"
              sx={{ m: 1 }}
              onClick={() => handleNavigate("/auth")}
            >
              Login
            </Button>
          </>
        ) : (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={user?.photoURL} alt={user?.displayName}>
                  {capitaliseFirstLetter(user?.displayName)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px", "& .MuiList-padding": { p: 0 } }}
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
              {profileItems.map((item) => (
                <MenuItem
                  key={item.text}
                  onClick={handleCloseUserMenu}
                  sx={{ p: 0 }}
                >
                  <Button
                    variant="text"
                    endIcon={item.icon}
                    color="secondary"
                    onClick={item.handleClick}
                    sx={{ p: 2, width: "100%" }}
                  >
                    {item.text}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
