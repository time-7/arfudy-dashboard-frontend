import { Box, Typography } from '@mui/material';

import AddButton from '@/components/button/add-button';
import PageContainer from '@/components/containers/page-container';

import PratosGrid from './components/pratos-grid';

export default async function Pratos() {
    return (
        <PageContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4">Pratos</Typography>

                <AddButton
                    text="Novo prato"
                    variant="contained"
                    route="/pratos/form"
                />
            </Box>

            <PratosGrid />
        </PageContainer>
    );
}
