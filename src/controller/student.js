const crypto = require("crypto");
const Student = require("../models/model").student;

const getstudent = async (req, res) => {
  try {
    const students = await Student.find({ is_active: true, is_deleted: false ,is_read: false });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const seacrhstudent = async (req, res) => {
  try {
    const { query } = req.query;
    const searchQuery = {
      $or: [
        { firstname: { $regex: query, $options: "i" } },
        { lastname: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { message: { $regex: query, $options: "i" } },
      ],
      is_active: true,
      is_deleted: false,
    };

    const students = await Student.find(searchQuery);
    res.status(200).json(students);
  } catch (error) {
    console.error("Error searching for students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createstudent = async (req, res) => {
  if (!req.body.firstname) {
    return res.status(400).json({ message: "Firstname is Required." });
  }

  if (!req.body.lastname) {
    return res.status(400).json({ message: "Lastname is Required." });
  }

  if (!req.body.email) {
    return res.status(400).json({ message: "Email is Required." });
  }

  if (!req.body.message) {
    return res.status(400).json({ message: "Place is Required." });
  }

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const message = req.body.message;

  const uid = crypto.randomBytes(16).toString("hex");
  const studentData = {
    uid: uid,
    firstname: firstname,
    lastname: lastname,
    email: email,
    message: message,
  };
  try {
    const student = new Student(studentData);
    await student.save();
    res.status(201).json({ message: "Student Details Created Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatestudent = async (req, res) => {
  try {
    const studentUid = req.params.uid;

    if (!studentUid) {
      return res.status(400).json({ message: "Student UID is required" });
    }
    if (!req.body.firstname) {
      return res.status(400).json({ message: "Firstname is Required." });
    }

    if (!req.body.lastname) {
      return res.status(400).json({ message: "Lastname is Required." });
    }

    if (!req.body.email) {
      return res.status(400).json({ message: "Email-Id is Required." });
    }

    if (!req.body.message) {
      return res.status(400).json({ message: "Place is Required." });
    }

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const message = req.body.message;
    const updatedData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      message: message,
    };
    const student = await Student.findOneAndUpdate(
      { uid: studentUid },
      updatedData,
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student Updated Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletestudent = async (req, res) => {
  try {
    const studentUid = req.params.uid;
    if (!studentUid) {
      return res.status(400).json({ message: "Student UID is required" });
    }
    const student = await Student.findOneAndUpdate(
      { uid: studentUid },
      { is_deleted: true },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const message = async (req, res) => {
  try {
    const studentUid = req.params.uid;
    const updatedData = {
      is_read: true,
    };
    const student = await Student.findOneAndUpdate({ uid: studentUid }, updatedData, { new: true });
    if (!student) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task Updated Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getstudent: getstudent,
  seacrhstudent: seacrhstudent,
  createstudent: createstudent,
  updatestudent: updatestudent,
  deletestudent: deletestudent,
  message:message,
};
