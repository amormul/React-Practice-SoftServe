import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


// export enum ButtonVariant {
//     Text = "text",
//     Take = "contained",
//     Later = "outlined",
//   }

export default function Buttons() {
  return (
    
    <Stack spacing={2} direction="row">


      <Button
  variant="contained"
  sx={{
    backgroundColor: '#FF0000',
    border: 'none',
    transition:'.4s',
    borderRadius:'15px',
    '&:hover': {
      backgroundColor: 'darkred',
      
    },
    '&:focus': {
      outline: 'none',
      backgroundColor: 'crimson',
      border: 'none', 
    },
    '&:active': {
      backgroundColor: 'red',
    }
  }}
>
  Movies
</Button>



      <Button variant="outlined" 
      sx={{
        borderColor: '#ff0000',
           borderRadius:'15px',
           color:'gray',
           transition:'.4s',
            '&:hover': {
                borderColor: '#ff0000',
                backgroundColor:'#ff0000',
                color:'#fff',
                 },
            '&:focus': {
                backgroundColor: '#ff0000',
                color:'#fff',
                 border: 'none',
                        },
      }}>Outlined</Button>
    </Stack>
  );
}
