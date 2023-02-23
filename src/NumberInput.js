// When scrolling, "number" type fields in the form change their value when highlighted and mouseover.
// This component's purpose is to prevent this from happening, constructing "number" fields as <NumberInput />

import React from "react";
import { TextField } from '@mui/material';

const NumberInput = (props) => {
  const handleWheel = (e) => {
    e.target.blur();
  };

  return (
    <TextField
      {...props}
      type="number"
      onWheel={handleWheel}
      variant="outlined"
      margin="normal"
    />
  );
};

export default NumberInput;
