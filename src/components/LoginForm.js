import { Google, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const LoginForm = () => {
  const schema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email is required!"),
    password: yup.string().min(4).required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => {
    console.log(data);
  };

  return (
    <Container
      sx={{
        flexGrow: 1,
        m: 1,
      }}
    >
      <Typography variant="h4">Log in</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
        <TextField
          margin="normal"
          label="Email"
          variant="outlined"
          color="secondary"
          required
          fullWidth
          error={errors.email ? true : false}
          helperText={errors.email?.message}
          {...register("email")}
        />
        <TextField
          margin="normal"
          label="Password"
          variant="outlined"
          color="secondary"
          type="password"
          required
          fullWidth
          error={errors.password ? true : false}
          helperText={errors.password?.message}
          {...register("password")}
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
