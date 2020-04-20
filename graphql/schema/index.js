const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
    }
    
    type User {
      _id: ID!
      username: String!
      password: String
      relatedProjects: [Project!]
    }
    
    type Project {
      _id: ID!
      name: String!
      industryType: String!
      creator: User!
    }
    
    input EventInput {
      title: String!
      description: String!
      price: Float!
    }
    
    input UserInput {
      username: String!
      password: String!
    }
    
    input ProjectInput {
      name: String!
      industryType: String!
    }
    
    type RootQuery {
      events: [Event!]!
      project: [Project!]!
    }
    
    type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
      createProject(projectInput: ProjectInput): Project
    }
    
    schema {  
      query: RootQuery
      mutation: RootMutation
    }
  `)