'use client';

import { Box, Button, Typography } from '@mui/material';
import { useRole } from '../contaxt/RoleContext';

const RoleSwitcher = () => {
  const { role, setRole } = useRole();

  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Current Role {role}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="contained" color="primary" onClick={() => setRole('admin')}>
          Admin
        </Button>

        <Button variant="contained" color="success" onClick={() => setRole('editor')}>
          Editor
        </Button>
        
        <Button variant="contained" color="secondary" onClick={() => setRole('user')}>
          User
        </Button>
      </Box>
    </Box>
  );
};

export default RoleSwitcher;
