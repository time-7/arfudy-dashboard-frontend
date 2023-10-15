import { Dispatch, SetStateAction } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type ConfirmModal = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleConfirm: () => void;
  text: string;
  title: string;
};

export default function ConfirmModal({
  open,
  setOpen,
  handleConfirm,
  text,
  title,
}: ConfirmModal) {
  const onClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          backgroundColor: 'primary.light',
          border: '2px solid #000',
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Não
        </Button>
        <Button onClick={handleConfirm} autoFocus>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}
