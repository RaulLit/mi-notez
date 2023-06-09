import { DeleteOutlined } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { blue, green, pink, yellow } from "@mui/material/colors";

export const NoteCard = ({ note, handleDelete }) => {
  return (
    <div>
      <Card elevation={2}>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                backgroundColor: (note) => {
                  if (note.category === "work") return yellow[700];
                  if (note.category === "money") return green[500];
                  if (note.category === "todos") return pink[500];
                  return blue[500];
                },
              }}
            >
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
