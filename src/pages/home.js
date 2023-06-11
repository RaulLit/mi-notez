import { Container } from "@mui/material";
import { NoteCard } from "../components/NoteCard";
import Masonry from "react-masonry-css";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useEffect, useState } from "react";

export const Home = () => {
  const [notes, setNotes] = useState(null);

  const handleDelete = async (id) => {
    deleteDoc(doc(db, "users", auth.currentUser.uid, "notes", id))
      .then(() => {
        const newNotes = notes.filter((item) => item.id != id);
        setNotes(newNotes);
      })
      .catch((err) => console.log(err));
  };

  const colRef = collection(db, "users", auth.currentUser.uid, "notes");
  const getNotes = async () => {
    getDocs(colRef)
      .then((data) =>
        setNotes(data.docs.map((data) => ({ ...data.data(), id: data.id })))
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNotes();
  }, []);

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
