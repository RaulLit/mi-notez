import {
  AddCircleOutlineOutlined,
  Menu as MenuIcon,
  SubjectOutlined,
  Login,
  Person,
  Logout,
} from "@mui/icons-material";
import {
  AppBar as MuiAppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
  styled,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { auth } from "../config/firebase";
const authState = auth.currentUser ? true : false;

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
  })
);

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(authState);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];

  const profileItems = [
    {
      text: "Account",
      icon: <Person color="secondary" />,
      path: "/user/:user/account",
    },
    {
      text: "Logout",
      icon: <Logout color="secondary" />,
      path: "/user/logout",
    },
  ];

  return (
    <div>
      {/* NAVBAR */}
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
          {authState && (
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
          {!authState ? (
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
                  <Avatar src="" />
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
                {profileItems.map((item) => (
                  <MenuItem key={item.text} onClick={handleCloseUserMenu}>
                    <Button
                      variant="text"
                      endIcon={item.icon}
                      color="secondary"
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

      {/* SIDE DRAWER */}
      {authState && (
        <Drawer
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          open={open}
        >
          <div>
            <Typography
              variant="h5"
              sx={{
                padding: (theme) => theme.spacing(2),
                boxSizing: "border-box",
              }}
              align="center"
            >
              Notes
            </Typography>
          </div>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                sx={{
                  "& .active": {
                    background: "#f4f4f4",
                  },
                }}
                className={location.pathname === item.path ? "active" : null}
                disablePadding
              >
                <ListItemButton onClick={() => handleNavigate(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      <DrawerHeader />
      <Main open={open}>{children}</Main>
    </div>
  );
};
