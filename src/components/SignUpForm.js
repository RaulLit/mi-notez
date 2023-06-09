import { Send } from "@mui/icons-material";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const SignUpForm = () => {
  // Signup states
  const [username, setUsername] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  // Error states
  const [usernameError, setUsernameError] = useState(false);
  const [emailSignUpError, setEmailSignUpError] = useState(false);
  const [passwordSignUpError, setPasswordSignUpError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError(false);
    setEmailSignUpError(false);
    setPasswordSignUpError(false);

    if (username == "") setUsernameError(true);
    if (emailSignUp == "") setEmailSignUpError(true);
    if (passwordSignUp == "") setPasswordSignUpError(true);
    if (usernameError && emailSignUpError && passwordSignUpError) {
      //code
    }
  };

  return (
    <Container
      sx={{
        flexGrow: 1,
        m: 3,
      }}
    >
      <Typography variant="h4">Sign up</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          label="Username"
          variant="outlined"
          color="secondary"
          required
          fullWidth
          error={usernameError}
        />
        <TextField
          onChange={(e) => setEmailSignUp(e.target.value)}
          margin="normal"
          label="Email"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={emailSignUpError}
        />
        <TextField
          onChange={(e) => setPasswordSignUp(e.target.value)}
          margin="normal"
          label="Password"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={passwordSignUpError}
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
    </Container>
  );
};
