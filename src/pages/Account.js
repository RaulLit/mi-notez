import { Container, Typography } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export const Account = () => {
  const { user } = useContext(AuthContext);
  return (
    <Container>
      <Typography>Name: {user.displayName}</Typography>
      <Typography>Email: {user.email}</Typography>
    </Container>
  );
};
