import {
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useState } from "react";

const sxField = {
  marginTop: "20px",
  marginBottom: "20px",
  display: "block",
};

export const Create = () => {
  const [category, setCategory] = useState("random");
  const navigate = useNavigate();

  // Schema
  const schema = yup.object().shape({
    title: yup.string().max(100).required("Title is required!"),
    details: yup.string().max(5000).required("Details is required"),
  });

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Add to database
  const notesColRef = collection(db, "users", auth.currentUser.uid, "notes");
  const handleCreate = (data) => {
    addDoc(notesColRef, {
      ...data,
      category,
    })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography
        variant="h6"
        component="h2"
        color="text.secondary"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit(handleCreate)}>
        <TextField
          sx={sxField}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={errors.title ? true : false}
          helperText={errors.title?.message}
          {...register("title")}
        />
        <TextField
          sx={sxField}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={errors.details ? true : false}
          helperText={errors.details?.message}
          {...register("details")}
        />
        <FormControl sx={sxField}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              value="random"
              control={<Radio />}
              label="Random"
            />
            <FormControlLabel
              value="reminder"
              control={<Radio />}
              label="Reminder"
            />
            <FormControlLabel
              value="important"
              control={<Radio />}
              label="Important"
            />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<SendIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};
