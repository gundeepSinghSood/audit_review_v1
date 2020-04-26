const Project = require('../../models/projects');
const {user} = require('./common');


const transformProjects = project => {
  return {
    ...project._doc,
    // .populate('creator')
    creator: user.bind(this, project._doc.creator)
  };
}

module.exports = {
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
    
    project: async () => {
       try {
        const pro = await Project.find();
        return pro.map(project => {
          return transformProjects(project)
        });
       } catch (error) {
          throw err;
        }
    },
}