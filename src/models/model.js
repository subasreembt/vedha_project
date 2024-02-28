const mongoose = require('mongoose');


const studentSchema = mongoose.Schema({
  uid: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  message:{type: String, required: true},
  is_read: { type: Boolean,default: false },
  is_active: { type: Boolean, default: true, },
  is_deleted: { type: Boolean, default: false, },
  created_by: { type: String, default: null, },
  updated_by: { type: String, default: null, },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

studentSchema.pre('save', function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});






module.exports = {
  student: mongoose.model("student", studentSchema),
};
