import { Dispatch, SetStateAction } from 'react';

import { TIngredient } from '@/types';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

type TIngredientModal = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  ingredient: TIngredient;
};

export default function IngredientModal({ open, setOpen }: TIngredientModal) {
  const onClose = () => setOpen(false);
  const handleConfirm = () => {};

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
      <DialogTitle></DialogTitle>
      <DialogContent>{/* form */}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Não
        </Button>
        <LoadingButton onClick={handleConfirm} autoFocus>
          Sim
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
