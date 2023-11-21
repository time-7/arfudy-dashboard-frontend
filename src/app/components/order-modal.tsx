import { Dispatch, SetStateAction } from 'react';

import { TOrder, TStatusOrder } from '@/types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import Image from 'next/image';

type TOrderModal = {
  order: TOrder;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const getStatus = (status: TStatusOrder): string => {
  let value = '';

  if (status === 'DONE') {
    value = 'Pronto';
  } else if (status === 'IN_PREPARE') {
    value = 'Em preparo';
  } else if (status === 'PENDING') {
    value = 'Pendente';
  }

  return value;
};

export default function OrderModal({ order, open, setOpen }: TOrderModal) {
  const onClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 4,
          backgroundColor: 'secondary.main',
          border: '2px solid #000',
        },
      }}
    >
      <DialogTitle>{order.product.name}</DialogTitle>
      <DialogContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'center',
          }}
        >
          <Typography>
            Cliente: <strong>{order.clientName}</strong>
          </Typography>

          <Typography>
            Quantidade: <strong>{order.product.quantity}</strong>
          </Typography>

          <Typography>
            Status: <strong>{getStatus(order.product.status)}</strong>
          </Typography>
        </Box>

        <Box
          sx={{
            width: 300,
            height: 300,
            position: 'relative',
          }}
        >
          <Image
            src="https://files.edgestore.dev/k1h85kjlhc106fdq/publicFiles/_public/4c5a4b46-affc-4b28-b5b3-13a3dcc35361.png"
            alt="kk"
            unoptimized
            fill
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
