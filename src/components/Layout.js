import { styled } from "@mui/material";
import { useContext } from "react";
import { OpenStateContext } from "../contexts/OpenStateContext";
import { Navbar } from "./Navbar";
import { SideDrawer } from "./SideDrawer";

const drawerWidth = 240;

// CUSTOM STYLED COMPONENTS

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const Layout = ({ children }) => {
  const { open } = useContext(OpenStateContext);

  return (
    <div>
      {/* NAVBAR */}
      <Navbar />

      {/* SIDE DRAWER */}
      <SideDrawer />

      <DrawerHeader />
      <Main open={open}>{children}</Main>
    </div>
  );
};
