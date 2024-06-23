const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
  creator: {
    type: String,
    default: 'wzm'
  },
  // 标签名称
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // conflict
  conflict: {
    type: [String],
    default: []
  },
  color: {
    type: String,
    default: '#000000'
  },
  bgColor: {
      type: String,
      default: '#ffffff'
  },
  icon: {
    type: String,
    default: '' // svg
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  __v: {
    type: Number,
    select: false
  }
})

const Model = mongoose.model("Tag", ModuleSchema, 'tags');

module.exports = Model;