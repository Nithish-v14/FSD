const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  attendance: {
    type: String,
    default: 'Present' // Set default value to 'Present'
}
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
