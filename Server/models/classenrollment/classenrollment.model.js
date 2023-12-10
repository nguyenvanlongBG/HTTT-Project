const mongoose = require('mongoose');

const ClassEnrollmentSchema = new mongoose.Schema({
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  status: {//1. Pending, 2: Đồng ý, 3: Từ chối
    type: Number,
    enum: [1, 2, 3],
    default: 1
  },
},{
  timestamps: true,
});

module.exports = ClassEnrollment = mongoose.model('ClassEnrollment', ClassEnrollmentSchema);;