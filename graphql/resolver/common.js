const User = require('../../models/user');
const Project = require('../../models/projects');

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


exports.user = user;