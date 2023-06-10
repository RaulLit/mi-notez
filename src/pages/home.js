import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NoteCard } from "../components/NoteCard";
import Masonry from "react-masonry-css";
import { useFetch } from "../hooks/useFetch";

export const Home = () => {
  const { data, refetch } = useFetch("http://localhost:8000/notes", "notes");

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });

    refetch();
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
        {data &&
          data.map((item) => (
            <div key={item.id}>
              <NoteCard note={item} handleDelete={handleDelete} />
            </div>
          ))}
      </Masonry>
    </Container>
  );
};
