import { useTask } from '../hooks/task';
import Task from '../models/task';
import ErrorToast from './ErrorToast';
import {
  DeleteOutlineRounded as DeleteOutlineRoundedIcon,
  Edit as EditIcon,
  AddCircleOutlineRounded as AddCircleOutlineRoundedIcon,
} from '@mui/icons-material';
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
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

type FormInputsTaskAdd = {
  title: string;
};

type FormInputsTaskUpdate = {
  title: string;
  description: string;
};

const TodoList = () => {
  const {
    tasks,
    isLoading,
    addTask,
    toggleTaskStatus,
    changeTask,
    removeTask,
  } = useTask();
  const [open, setOpen] = useState(false); // タスク更新モーダルのstate
  const [selected, setSelected] = useState<Task>(); // 更新対象のタスクのstate
  const [openErrToast, setOpenErrToast] = useState(false); // エラートースト表示表のstate
  const [errMessage, setErrMessage] = useState('');
  const {
    handleSubmit: handleSubmitTaskAdd,
    control: controlTaskAdd,
    reset: resetTaskAdd,
    formState: { errors: formErrorsTaskAdd },
  } = useForm<FormInputsTaskAdd>();
  const {
    handleSubmit: handleSubmitTaskUpdate,
    control: controlTaskUpadate,
    reset: resetTaskUpdate,
    setValue: setValueTaskUpdate,
    formState: { errors: formErrorsTaskUpdate },
  } = useForm<FormInputsTaskUpdate>();

  const handleAddTask: SubmitHandler<FormInputsTaskAdd> = async (data) => {
    try {
      await addTask(data.title);
      resetTaskAdd();
    } catch {
      setOpenErrToast(true);
      setErrMessage('タスクの追加に失敗しました');
    }
  };

  const handleUpdateTask: SubmitHandler<FormInputsTaskUpdate> = async (
    data
  ) => {
    try {
      if (!selected) {
        return;
      }
      const task: Task = {
        ...selected,
        title: data.title,
        description: data.description,
      };
      await changeTask(task);
      setOpen(false);
      setSelected(undefined);
      resetTaskUpdate();
    } catch {
      setOpenErrToast(true);
      setErrMessage('タスクの更新に失敗しました');
    }
  };

  const handleToggleStatus = async (task: Task) => {
    try {
      await toggleTaskStatus(task);
    } catch {
      setOpenErrToast(true);
      setErrMessage('タスクの更新に失敗しました');
    }
  };

  const handleDeleteTask = async (task: Task) => {
    try {
      await removeTask(task.id);
    } catch {
      setOpenErrToast(true);
      setErrMessage('タスクの削除に失敗しました');
    }
  };

  const handleOpenUpdateDialog = (task: Task) => {
    setOpen(true);
    setSelected(task);
    setValueTaskUpdate('title', task.title);
    setValueTaskUpdate('description', task.description);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelected(undefined);
    resetTaskUpdate();
  };

  return (
    <Box>
      <Container sx={{ pt: 4 }} maxWidth="sm">
        <form onSubmit={handleSubmitTaskAdd(handleAddTask)} noValidate>
          <Controller
            name="title"
            control={controlTaskAdd}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={formErrorsTaskAdd.title && true}
                variant="outlined"
                margin="normal"
                fullWidth
                required
                label="タスクを入力"
                helperText={
                  formErrorsTaskAdd.title && 'タスク名を入力してください'
                }
                autoFocus
              />
            )}
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
      <Container sx={{ py: 4 }} maxWidth="md">
        {isLoading && ( // ローディング
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!isLoading &&
          tasks.length == 0 && ( // タスクなしの場合
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'text.disabled',
                fontWeight: 'bold',
              }}
            >
              タスクはありません
            </Box>
          )}
        {!isLoading &&
          tasks.length > 0 && ( // タスクありの場合
            <List dense={true}>
              {tasks.map((task) => (
                <ListItem key={task.id}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={task.status === 'DONE'}
                      tabIndex={-1}
                      onChange={() => handleToggleStatus(task)}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={task.title}
                    secondary={task.description}
                    sx={{
                      textDecoration:
                        task.status === 'DONE' ? 'line-through' : 'none',
                    }}
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="Edit"
                      onClick={() => handleOpenUpdateDialog(task)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteTask(task)}
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        <Dialog open={open} onClose={handleCloseDialog}>
          <form noValidate onSubmit={handleSubmitTaskUpdate(handleUpdateTask)}>
            <DialogContent>
              <Controller
                name="title"
                control={controlTaskUpadate}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    required
                    margin="normal"
                    label="タスク名"
                    type="text"
                    fullWidth
                    error={formErrorsTaskUpdate.title && true}
                    helperText={
                      formErrorsTaskUpdate.title && 'タスク名を入力してください'
                    }
                  />
                )}
              />
              <Controller
                name="description"
                control={controlTaskUpadate}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    margin="normal"
                    label="詳細"
                    type="text"
                    fullWidth
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
      <ErrorToast
        {...{
          open: openErrToast,
          setOpen: setOpenErrToast,
          message: errMessage,
        }}
      />
    </Box>
  );
};

export default TodoList;
