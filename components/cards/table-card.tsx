import { useState } from 'react';

import TableModal from '@/app/(pedidos)/components/table-modal';

import { TTable } from '@/types';
import { Box, Typography } from '@mui/material';

type TTableCard = {
    table: TTable;
};

export default function TableCard({ table }: TTableCard) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <>
            <TableModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                table={table}
            />

            <Box
                onClick={() => setIsModalOpen(true)}
                sx={{
                    width: 80,
                    height: 80,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'secondary.light',
                    border: '2px solid black',
                    borderRadius: '30px',
                    cursor: 'pointer'
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ color: 'secondary.dark', fontWeight: 500 }}
                >
                    {table.tableNum}
                </Typography>
            </Box>
        </>
    );
}
