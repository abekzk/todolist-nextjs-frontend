import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
};

const ErrorToast = ({ open, setOpen, message }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default ErrorToast;
