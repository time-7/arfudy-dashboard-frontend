import { Dispatch, SetStateAction, useEffect } from 'react';
import { Api } from '@/lib/axios';
import { TGet, TOrder, TStatusOrder, TTable } from '@/types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Skeleton,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

type TTableModal = {
  table: TTable;
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

export default function TableModal({ table, open, setOpen }: TTableModal) {
  const onClose = () => setOpen(false);

  const { data, error, isFetching, isFetched, refetch } = useQuery<
    TGet<TOrder[][]>
  >({
    queryKey: ['getOrderByTable', table.id],
    queryFn: () => Api.get(`/orders/table/${table.id}`).then((res) => res.data),
    gcTime: 0,
    retry: false,
  });

  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 6,
          backgroundColor: 'secondary.main',
          border: '2px solid #000',
          transition: 'width 1s ease-in-out',
        },
      }}
    >
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 1.5,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, color: 'white' }}>
          Mesa {table.tableNum}
        </Typography>

        {isFetching && (
          <Box sx={{ width: 400 }}>
            <Skeleton animation="wave" variant="rounded" />

            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ marginY: 1.5 }}
            />

            <Skeleton animation="wave" variant="rounded" />
          </Box>
        )}

        {isFetched && error && (
          <Typography sx={{ color: 'white', fontWeight: 500 }}>
            Nenhum atendimento iniciado para esta mesa!
          </Typography>
        )}

        {!isFetching &&
          isFetched &&
          data?.data?.map((orderList) => {
            const [order] = orderList;

            return (
              <Box
                key={order.orderProductId}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>
                  {order.clientName}
                </Typography>

                {orderList.map((order) => (
                  <Box
                    key={order.orderProductId}
                    sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}
                  >
                    <Typography sx={{ fontSize: '16px', maxWidth: 300 }}>
                      Pedido: <strong>{order.product.name}</strong>
                    </Typography>

                    <Typography sx={{ fontSize: '16px' }}>
                      Quantidade: <strong>{order.product.quantity}</strong>
                    </Typography>

                    <Typography sx={{ fontSize: '16px' }}>
                      Status:{' '}
                      <Typography
                        sx={{
                          fontSize: '16px',
                          color: 'primary.light',
                          fontWeight: 600,
                          display: 'inline',
                        }}
                      >
                        {getStatus(order.product.status)}
                      </Typography>
                    </Typography>
                  </Box>
                ))}
              </Box>
            );
          })}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

{
  /* <Box
            key={order.orderProductId}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <Typography sx={{ fontSize: '20px' }}>
              Cliente: <strong>{order.clientName}</strong>
            </Typography>

            
          </Box> */
}
