import { Dispatch, SetStateAction } from 'react';

import { TOrder } from '@/types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type TOrderModal = {
  order: TOrder;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function OrderModal({ order, open, setOpen }: TOrderModal) {
  const onClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          backgroundColor: 'secondary.main',
          border: '2px solid #000',
        },
      }}
    >
      <DialogTitle>{order.product.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>fsdfddfs</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
