import { Google, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addTemplateNote, auth, db, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const LoginForm = () => {
  const navigate = useNavigate();

  // Schema
  const schema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email is required!"),
    password: yup.string().min(4).required("Password is required"),
  });

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // login with email and password
  const handleLogin = async (data) => {
    const email = data.email;
    const password = data.password;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  // Login with Google
  const handlePopupLogin = () => {
    signInWithPopup(auth, provider)
      .then(async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          navigate("/");
        } else {
          setDoc(
            docRef,
            { name: auth.currentUser.displayName },
            { merge: false }
          )
            .then(() => {
              addTemplateNote()
                .then(() => navigate("/"))
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
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
        <Button
          color="secondary"
          variant="text"
          endIcon={<Google />}
          onClick={handlePopupLogin}
        >
          Sign In With Google
        </Button>
      </Box>
    </Container>
  );
};
