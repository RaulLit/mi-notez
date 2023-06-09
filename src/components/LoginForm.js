import { Google, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const LoginForm = () => {
  // login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(email, password);
  };

  return (
    <Container
      sx={{
        flexGrow: 1,
        m: 1,
      }}
    >
      <Typography variant="h4">Log in</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          label="Email"
          variant="outlined"
          color="secondary"
          required
          fullWidth
          error={false}
          helperText=""
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          label="Password"
          variant="outlined"
          color="secondary"
          required
          fullWidth
          error={false}
          helperText=""
        />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<Send />}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button color="secondary" variant="text" endIcon={<Google />}>
          Sign In With Google
        </Button>
      </Box>
    </Container>
  );
};
