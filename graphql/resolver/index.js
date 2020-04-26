

// const Event = require('../../models/event');

const userResolvver = require('./user')
const projectResolvver = require('./projects')

const rootResoler = {
  ...userResolvver,
  ...projectResolvver
}

module.exports = rootResoler;

// module.exports = {
//     events: () => {
//       return Event.find()
//         .then(events => {
//           return events.map(event => {
//             return {...event._doc};
//           });
//         })
//         .catch(err => {
//           throw err
//         })
//     },

//     createEvent: (args) => {
//       const event = new Event({
//           title: args.eventInput.title,
//           description: args.eventInput.description,
//           price: +args.eventInput.price
//       });
//       event
//         .save()
//         .then(res => {
//           return {...res._doc};
//         })
//         .catch(err => {
//           throw err
//           });
//       return event;
//     },

    
//   }