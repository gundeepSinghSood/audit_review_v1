import React from "react";
import { Button, Card, Container, Paper, Grid, Typography, CardContent, TextField } from '@material-ui/core';

const BasicInfo = props => {
  return(
    <Container>
      <Typography color="textSecondary" gutterBottom variant="h4">
          Basic Info
        </Typography>
        <Typography color="textSecondary" gutterBottom variant="p">
          Reviewer Details
        </Typography>
        <TextField
          id="outlined-full-width"
          label="Reviewer Name"
          fullWidth
          margin="normal"
          variant="outlined"
        />
    </Container>
  )
};


export default BasicInfo;