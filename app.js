const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql'); 
const mongoose = require("mongoose");

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});


// query: to fetch data
// mutation to change data
// api can be anything eg. graphql
app.use('/api', graphqlHttp({
  schema: graphqlSchema,
  // its a javascript object, it will contain all the resolver function
  // the resolver function name should match to the schema names
  rootValue: graphqlResolver,
  graphiql: true,
}));

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@auditreview-b2u8a.mongodb.net/${process.env.MONGO_DB}?w=majority&retryWrites=true`)
  .then(() => {
  app.listen(5000);
  })
  .catch(err => {
  console.log(err);
  });