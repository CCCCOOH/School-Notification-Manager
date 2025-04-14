const mongoose = require('mongoose');
const UserModel = require('./UserModel')
console.log("创建班级模型中...");

const ClassSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  className: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  members: {
    type: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      assignedAt: {
        type: Date,
        default: Date.now()
      },
      role: {
        type: String,
        default: 'member',
        enum: {
          values: ['manager', 'member'],
          message: '{VALUE}不是有效的角色'
        }
      }
    }],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  notifies: {
    type: [{
      readList: {
        type: [{
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
          },
          readAt: {
            type: Date,
            default: Date.now()
          },
        }],
        default: []
      },
      title: {
        type: String,
        required: true
      },
      postUrl: {
        type: String
      },
      content: String,
      time: {
        type: Date,
        default: Date.now()
      },
      level: {
        type: Number,
        default: 4
      },
      categories: {
        type: [String]
      }
    }]
  }
});


const ClassModel = mongoose.model('class', ClassSchema);

module.exports = ClassModel;