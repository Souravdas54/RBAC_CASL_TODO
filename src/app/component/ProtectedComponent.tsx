'use client';

import { useRole } from '../contaxt/RoleContext';
import { defineAbilitiesFor } from '@/app/lib/ability';
import { Can } from '@casl/react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

const ProtectedComponent = () => {
  const { role } = useRole();
  const ability = defineAbilitiesFor(role);

  const [savename, setSaveName] = useState<string>('');
  const [isEditing, setIsEditing] = useState(null);
  const [showname, setShowName] = useState<string[]>([]);;

  // Save name to localStorage
  const handlesave = () => {
    if (savename.trim()) {
      const getdata = JSON.parse(localStorage.getItem('Name_save') || '[]');
      const newdata = { id: Date.now(), name: savename };
      const updateNewData = [...getdata, newdata];
      localStorage.setItem('Name_save', JSON.stringify(updateNewData));
      setShowName(updateNewData);
      setSaveName('');
    }
  };

  // Delete a name
  const handledelete = (id: string | number) => {
    const updatedData = showname.filter(item => item.id !== id);
    localStorage.setItem('Name_save', JSON.stringify(updatedData));
    setShowName(updatedData);
  };

  // Enable edit mode
  const handleEdit = (id:string) => {
    setIsEditing(id);
    const editItem = showname.find(item => item.id === id);
    if (editItem) setSaveName(editItem.name);
  };

  // Update a name
  const handleUpdate = (id) => {
    const updatedData = showname.map(item => item.id === id ? { ...item, name: savename } : item);
    localStorage.setItem('Name_save', JSON.stringify(updatedData));
    setShowName(updatedData);
    setIsEditing(null);
    setSaveName('');
  };

  // Load stored names from localStorage
  useEffect(() => {
    const storedName = JSON.parse(localStorage.getItem('Name_save') || '[]');
    setShowName(storedName);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaveName(e.target.value);
  };
  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Welcome, {role}
      </Typography>

      {/* User can only read */}
      <Can I="read" a="Todo" ability={ability}>
        <Grid container spacing={2} direction="column" alignItems="center">
          {showname.map((item) => (
            <Grid item key={item.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                {isEditing === item.id ? (
                  <TextField
                    type='text'
                    value={savename}
                    // onChange={(e) => setSaveName(e.target.value)}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography variant="h6">{item.name}</Typography>
                )}
              </Box>

              {/* Admin & Editor can edit/delete, User can only read */}
              <Can I="update" a="Todo" ability={ability}>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  {isEditing === item.id ? (
                    <Button variant="contained" color="primary" onClick={() => handleUpdate(item.id)}>Update</Button>
                  ) : (
                    <Button variant="contained" color="secondary" onClick={() => handleEdit(item.id)}>Edit</Button>
                  )}
                  <Can I="delete" a="Todo" ability={ability}>
                    <Button variant="contained" color="error" onClick={() => handledelete(item.id)}>Delete</Button>
                  </Can>
                </Box>
              </Can>
            </Grid>
          ))}
        </Grid>
      </Can>

      {/* Only Admin can create */}
      <Can I="create" a="Todo" ability={ability}>
        <Box sx={{ mt: 2 }}>
          <TextField label="Enter Name" type='text' value={savename} onChange={(e) => setSaveName(e.target.value)} variant="outlined" sx={{ mb: 2 }} />
          <Button variant="contained" color="primary" onClick={handlesave}>Create Todo</Button>
        </Box>
      </Can>
    </Box>
  );
};

export default ProtectedComponent;
