import React from "react";
import { Button, Card, Container, Paper, Grid, Typography, CardContent, TextField } from '@material-ui/core';

const QuestionsInfo = props => {
  const {SetQuestions} = props;
  return(
    <Container>
      <Typography color="textSecondary" gutterBottom variant="h4">
          Questions
        </Typography>
        <Typography color="textSecondary" gutterBottom variant="p">
         What is you Name
        </Typography>
        <TextField
          // id="outlined-full-width"
          label="Enter answer"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={()=> SetQuestions([{Q:'Name?',A:'Aditi'},{Q:'Company?',A:'Publicis Sapient'}])}
        />
    </Container>
  )
};


export default QuestionsInfo;