// import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { red } from '@mui/material/colors';
export default function TextFields() {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>

        <TextField
          id="outlined-textarea"
          label="Comment"
          placeholder="Write a comment"
          maxRows={3}
          multiline
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fff',
              borderRadius: '10px',
              transition: '0.5s',
              color: '#000',
              '& fieldset': {
                borderColor: red[100],
                color: '#fff',
              },
              '&:hover fieldset': {
                borderColor: red[500],
                color: '#fff',
              },
              '&.Mui-focused fieldset': {
                borderColor: red[700],
                color: '#fff',
              },
            },
          }}
        />


      </div>
    </Box>
  );
}
