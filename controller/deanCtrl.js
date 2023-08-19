const { generateToken } = require("../config/jwtToken");
const Dean = require("../models/deanModel");
const Session = require("../models/sessionModel");
const bcrypt = require("bcrypt");

const deanRegister = async (req, res) => {
  const { universityID, password } = req.body;
  try {
    const existingDean = await Dean.findOne({ universityID });
    if (existingDean) {
      return res.status(400).json({ message: "Dean already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDean = new Dean({ universityID, password: hashedPassword });
    await newDean.save();

    res.status(201).json({ message: "Dean registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

const deanLogin = async (req, res) => {
  const { universityID, password } = req.body;

  try {
    const dean = await Dean.findOne({ universityID });

    if (!dean) {
      return res.status(401).json({ message: "Dean not found" });
    }

    const passwordMatch = await bcrypt.compare(password, dean.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(dean.universityID);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

const getAvailableSessions = async (req, res) => {
  try {
    const availableSessions = await Session.find({ status: "available" });
    res.status(200).json({ sessions: availableSessions });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

const createSession = async (req, res) => {
  const { time } = req.body;
  const deanUniversityID = req.user.universityID;
  
  try {
    const dean = await Dean.findOne({ universityID: deanUniversityID });
    if (!dean) {
      return res.status(404).json({ message: "Dean not found" });
    }
    
    const newSession = new Session({ dean: deanUniversityID, time, status: "available" });
    await newSession.save();

    res.status(201).json({ message: "Session created successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

const getDeanPendingSessions = async (req, res) => {
  const deanID = req.user.universityID;
  // console.log(req.user)

  try {
    const pendingSessions = await Session.find({
      dean: deanID,
      status: "booked",
    });
    res.status(200).json({ sessions: pendingSessions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const markSessionCompleted = async (req, res) => {
  const { sessionID } = req.body;

  try {
    const session = await Session.findOne({ _id: sessionID, status: "booked" });

    if (!session) {
      return res
        .status(404)
        .json({ message: "Session not found or not booked" });
    }

    session.status = "completed";
    await session.save();
    await Session.findOneAndDelete({ _id: sessionID, status: "completed" })
    res.status(200).json({ message: "Session marked as completed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = {
  getAvailableSessions,
  createSession,
  deanLogin,
  deanRegister,
  getDeanPendingSessions,
  markSessionCompleted,
};
