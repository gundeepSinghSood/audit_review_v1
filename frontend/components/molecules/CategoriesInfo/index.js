import React from "react";
import { Button, Card, Container, Paper, Grid, Typography, CardContent, TextField } from '@material-ui/core';

const CategoriesInfo = props => {
  const {SetCategories} = props;
  return(
    <Container>
      <Typography color="textSecondary" gutterBottom variant="h4">
          Categories
        </Typography>
        <Typography color="textSecondary" gutterBottom variant="p">
          Category Details
        </Typography>
        <TextField
          // id="outlined-full-width"
          label="Category Name"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={()=> SetCategories(['Category1','Category2','Category3','Category4'])}
        />
    </Container>
  )
};


export default CategoriesInfo;