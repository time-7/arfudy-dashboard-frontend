import { Dispatch, SetStateAction } from 'react';

import { TOrder, TStatusOrder } from '@/types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 6,
          backgroundColor: 'secondary.main',
          border: '2px solid #000',
        },
      }}
    >
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 2,
          p: 0,
        }}
      >
        <Box
          sx={{
            width: 600,
            height: 300,
            position: 'relative',
          }}
        >
          <Image
            src="https://files.edgestore.dev/k1h85kjlhc106fdq/publicFiles/_public/4c5a4b46-affc-4b28-b5b3-13a3dcc35361.png"
            alt="kk"
            unoptimized
            fill
            style={{
              borderBottom: '2px solid #000',
            }}
          />
        </Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: 'white', px: 3 }}
        >
          {order.product.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            justifyContent: 'center',
            color: 'white',
            px: 3,
          }}
        >
          <Typography sx={{ fontSize: '20px' }}>
            Cliente: <strong>{order.clientName}</strong>
          </Typography>

          <Typography sx={{ fontSize: '20px' }}>
            Mesa: <strong>{order.tableNum}</strong>
          </Typography>

          <Typography sx={{ fontSize: '20px' }}>
            Quantidade: <strong>{order.product.quantity}</strong>
          </Typography>

          <Typography sx={{ fontSize: '20px' }}>
            Status:{' '}
            <Typography
              sx={{
                fontSize: '20px',
                color: 'primary.light',
                fontWeight: 600,
                display: 'inline',
              }}
            >
              {getStatus(order.product.status)}
            </Typography>
          </Typography>
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
