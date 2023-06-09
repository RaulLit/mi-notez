import { Container, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { NoteCard } from "../components/NoteCard";
import Masonry from "react-masonry-css";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const Home = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });

    const newNotes = notes.filter((item) => item.id != id);
    setNotes(newNotes);
  };

  const customBreakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container sx={{ padding: (theme) => theme.spacing(3) }}>
      <Masonry
        breakpointCols={customBreakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes &&
          notes.map((item) => (
            <div key={item.id}>
              <NoteCard note={item} handleDelete={handleDelete} />
            </div>
          ))}
      </Masonry>
    </Container>
  );
};
