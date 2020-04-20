const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const Project = require('../../models/projects');
const User = require('../../models/user')


const project = async projectIDs => {
  try {
    const projects = await Project.find({ _id: { $in: projectIDs }})
    projects.map(pro => {
      return {
        ...pro._doc,
        creator: user.bind(this, pro.creator)
        }
    })
    return projects;
  } catch (error) {
    throw err;
  }
}

const user = userId => {
  return User.findById(userId)
    .then(user => {
      return { 
        ...user._doc,
        relatedProjects: project.bind(this, user._doc.relatedProjects)
      }
    })
    .catch(err => {
      throw err;
    })
}

module.exports = {
    events: () => {
      return Event.find()
        .then(events => {
          return events.map(event => {
            return {...event._doc};
          });
        })
        .catch(err => {
          throw err
        })
    },
     project: async () => {
       try {
        const pro = await Project.find();
        return pro.map(project => {
          return {
            ...project._doc,
            // .populate('creator')
            creator: user.bind(this, project._doc.creator)
            };
        });
       } catch (error) {
          throw err;
        }
    },
    createEvent: (args) => {
      const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price
      });
      event
        .save()
        .then(res => {
          return {...res._doc};
        })
        .catch(err => {
          throw err
          });
      return event;
    },
    createProject: async (args) => {
      const project = new Project({
          name: args.projectInput.name,
          industryType: args.projectInput.industryType,
          creator: "5e9cb382c04ffc1d6b84bf70"
      });
      let createdProject;
      try {
        const res = await project.save()
          createdProject = {
            ...res._doc,
            creator: user.bind(this, res._doc.creator)
            };
          const userData = await User.findById("5e9cb382c04ffc1d6b84bf70")
          if(!userData) {
            // there is user present with same name
            throw new Error('user not found')
          }
          userData.relatedProjects.push(project);
          await userData.save()
          return createdProject;
        } catch (err) {
          throw err
        };
      return project;
    },
    createUser: args => {
      return User
        .findOne({username: args.userInput.username})
        .then(user => {
          if(user) {
            // there is user present with same name
            throw new Error('user exist')
          }
          return bcrypt.hash(args.userInput.password, 12)
        }).then(hashedPassword => {
          const user = new User({
            username: args.userInput.username,
            password: hashedPassword,
          });
          return user.save();
          })
        .then(res => {
          return {...res._doc, password: null};
        })
        .catch(err => {
          throw err;
        });
    }
  }