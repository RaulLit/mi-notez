import { auth } from "../config/firebase";
import { Container, Typography } from "@mui/material";

export const Account = () => {
  return (
    <Container>
      <Typography>Name: {auth.currentUser.displayName}</Typography>
      <Typography>Email: {auth.currentUser.email}</Typography>
    </Container>
  );
};
