const mongoose = require("mongoose")

const ModuleSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  // 富文本 可作说明复盘等
  description: {
    type: String,
    default: ''
  },
  // 重要性
  completed: {
    type: Boolean,
    default: false
  },
  importance: {
    type: String,
    enums: ['low', 'medium', 'high'],
    default: 'low'
  },
  // 紧急性
  urgency: {
    type: String,
    enums: ['low', 'medium', 'high'],
    default: 'low'
  },
  // 是否提醒
  tip: {
    type: Boolean,
    default: false
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

const Model = mongoose.model("Todo", ModuleSchema, 'todos');

module.exports = Model;