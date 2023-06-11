import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  // Typography,
  Divider,
} from "@mui/material";
import { useContext } from "react";
import { OpenStateContext } from "../contexts/OpenStateContext";
import { AuthContext } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

export const SideDrawer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { open } = useContext(OpenStateContext);

  const handleNavigate = (path) => {
    navigate(path);
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
  return (
    user && (
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Typography
            variant="h5"
            sx={{
              padding: (theme) => theme.spacing(2),
              boxSizing: "border-box",
            }}
            align="center"
          >
            Notes
          </Typography> */}
          <img
            src="./no-bg-logo.png"
            alt="logo"
            style={{ width: "80%", height: "80%" }}
          />
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
    )
  );
};
