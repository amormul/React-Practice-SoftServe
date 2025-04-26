import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function  TextFields() {
  return (
    <Box
      component="form"
      sx={{ 
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-textarea"
          label="Comment" //User Coment Component ( or User Info )
          placeholder="Placeholder"
        />
      </div>
     
    </Box>
  );
}
