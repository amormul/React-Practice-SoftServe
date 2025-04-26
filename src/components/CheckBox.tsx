import * as React from 'react';
import { red } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ColorCheckbox() {
  return (
    <div>
      <Checkbox
        {...label}
        defaultChecked
        sx={{
          color:red[600],
          '&.Mui-checked': {
            color: red[500],
          },
        }}
      />
    </div>
  );
}