import { Box, Container, Divider, Paper, Typography } from "@mui/material";

export const Auth = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Paper>
        <Typography>Sign up</Typography>
      </Paper>
      <Paper>
        <Typography>Log in</Typography>
      </Paper>
    </Container>
  );
};
