var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResumeSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  education: {
    type: String
  }
});

var Resume = mongoose.model('Resume', ResumeSchema);
module.exports = Resume;
