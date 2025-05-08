// import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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
              color: '#000',
              '& fieldset': {
                borderColor: "none",
                color: '#fff',
              },
              '&:hover fieldset': {
                borderColor: "none",
                color: '#fff',
              },
              '&.Mui-focused fieldset': {
                borderColor: "none",
                color: '#fff',
              },
            },
          }}
        />


      </div>
    </Box>
  );
}
