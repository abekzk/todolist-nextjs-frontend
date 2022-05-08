import {
  Box,
  Container,
  Button,
  List,
  ListItem,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  ListItemIcon,
  TextField,
} from '@mui/material';
import {
  DeleteOutlineRounded as DeleteOutlineRoundedIcon,
  Edit as EditIcon,
  AddCircleOutlineRounded as AddCircleOutlineRoundedIcon,
} from '@mui/icons-material';
import { useTask } from '../hooks/task';
import React from 'react';

const TodoList = () => {
  const { result, addTask } = useTask();
  const task = result.data ?? [];

  function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = data.get('title');
    if (typeof title != 'string') {
      return;
    }
    addTask(title);
  }
  return (
    <Box>
      <Container sx={{ pt: 4 }} maxWidth="sm">
        <form noValidate onSubmit={handleAddTask}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="タスクを入力"
            name="title"
            autoFocus
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<AddCircleOutlineRoundedIcon />}
          >
            Add Todo
          </Button>
        </form>
      </Container>
      <Container sx={{ py: 8 }} maxWidth="md">
        <List dense={true}>
          {task.map((task) => (
            <ListItem key={task.id}>
              <ListItemIcon>
                <Checkbox edge="start" checked={false} tabIndex={-1} />
              </ListItemIcon>
              <ListItemText primary={task.title} secondary={task.description} />

              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="Edit" onClick={() => null}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => null}>
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default TodoList;
