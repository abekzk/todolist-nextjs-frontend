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
import { useTasks } from '../hooks/task';

const TodoList = () => {
  const tasks = useTasks();
  return (
    <Box>
      <Container sx={{ pt: 4 }} maxWidth="sm">
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="todo"
            label="タスクを入力"
            name="todo"
            autoFocus
            value=""
            onChange={() => null}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => null}
            startIcon={<AddCircleOutlineRoundedIcon />}
          >
            Add Todo
          </Button>
        </form>
      </Container>
      <Container sx={{ py: 8 }} maxWidth="md">
        <List dense={true}>
          {tasks.map((task) => (
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
