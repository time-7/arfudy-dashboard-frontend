import { Box } from '@mui/material';

import Orders from './components/orders';
import Tables from './components/tables';

export default function Home() {
    return (
        <Box sx={{ display: 'flex', maxHeight: '100%' }}>
            <Orders />
            <Tables />
        </Box>
    );
}
