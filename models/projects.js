const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const projectSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  industryType: {
    type: String,
    require: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Project', projectSchema)