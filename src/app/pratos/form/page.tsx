import { Box, Button, TextField, Typography } from '@mui/material';

export default function PratosForm() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%' }}
    >
      <Typography variant="h4">Cadastrar Prato</Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <TextField sx={{ flex: 1 }} label="Nome"></TextField>
        <TextField sx={{ flex: 1 }} label="Não sei"></TextField>
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <TextField sx={{ flex: 1 }} label="Nome"></TextField>
        <TextField sx={{ flex: 1 }} label="Não sei"></TextField>
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <TextField sx={{ flex: 1 }} label="Nome"></TextField>
        <TextField sx={{ flex: 1 }} label="Não sei"></TextField>
      </Box>

      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" size="large">
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
