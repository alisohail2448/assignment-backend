const { generateToken } = require("../config/jwtToken.js");
const Session = require("../models/sessionModel.js");
const Student = require("../models/studentModel.js");
const uuid = require('uuid');


const registerStudent = async (req, res) => {
  const { universityID, password, email } = req.body;
  // console.log(universityID, password)

  try {
    const existingUser = await Student.findOne({ universityID });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newStudent = new Student({ universityID, password, email });
    // console.log(newStudent)
    await newStudent.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'An error occurred' });
  }
};


const loginStudent = async (req, res) => {
  const { universityID, password } = req.body;

  try {
    const user = await Student.findOne({ universityID });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = uuid.v4();
    const authToken = generateToken(user.universityID);

    res.status(200).json({ token: authToken });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

const bookSession = async (req, res) => {
  const { sessionID } = req.body;
  const studentUniversityID = req.user.universityID; 
  // console.log(req.user)

  try {
    const session = await Session.findById(sessionID);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.status !== 'available') {
      return res.status(400).json({ message: 'Session is not available for booking' });
    }

    session.bookedByStudentId.push(studentUniversityID);
    session.status = 'booked';
    await session.save();

    res.status(200).json({ message: 'Session booked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};


module.exports = { registerStudent, loginStudent, bookSession };