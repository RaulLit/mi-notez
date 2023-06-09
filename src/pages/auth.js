import { Container, Divider } from "@mui/material";
import { SignUpForm } from "../components/SignUpForm";
import { LoginForm } from "../components/LoginForm";

export const Auth = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <SignUpForm />
      <Divider orientation="vertical" variant="middle" flexItem color="black" />
      <LoginForm />
    </Container>
  );
};
