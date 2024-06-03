const Student = require('./studentModel');

const addStudent = async (req, res) => {
  const { name, rollNo, city, phone,attendance  } = req.body;

  try {
    const newStudent = new Student({
      name,
      rollNo,
      city,
      phone,
      attendance 
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addStudent, getStudents };
