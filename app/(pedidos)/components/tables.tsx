'use client';

import { useEffect } from 'react';

import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import TableCard from '@/components/cards/table-card';
import { Api } from '@/lib/axios';
import { socketTable } from '@/lib/socket';
import { TGet, TTable } from '@/types';

export default function Tables() {
    const { data } = useQuery<TGet<TTable[]>>({
        queryKey: ['getTableList'],
        queryFn: () => Api.get('/tables').then((res) => res.data)
    });

    useEffect(() => {
        const onOrder = (value: TGet<TTable[][]>) => {
            console.log(value);
            // addOrder(value.data);
            // enqueueSnackbar('Novos pedidos chegaram', { variant: 'success' });
        };

        socketTable.on('onOrder', onOrder);

        return () => {
            socketTable.off('onOrder', onOrder);
        };
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: 'secondary.main',
                border: '2px solid black',
                borderRadius: 6,
                display: 'flex',
                flexDirection: 'column',
                paddingY: 2,
                paddingX: 4,
                margin: 1,
                gap: 2,
                alignItems: 'center',
                width: 336,
                zIndex: 100,
                position: 'fixed',
                bottom: 0,
                top: 76,
                right: 0
            }}
        >
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
                Mesas
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    justifyItems: 'center',
                    gap: 2,
                    width: 272
                }}
            >
                {data?.data.map((item) => (
                    <TableCard key={item.id} table={item} />
                ))}
            </Box>
        </Box>
    );
}
