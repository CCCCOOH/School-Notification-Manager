const mongoose = require('mongoose');
const UserModel = require('../models/User')
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
    unique: true
  },
  description: {
    type: String
  },
  members: {
    type: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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
    default: function () {
      return [{
        userId: this.createdBy,
        assignedAt: Date.now()
      }]
    },
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: '创建的班级成员至少有一人'
    }
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
      title: {
        type: String,
        required: true
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

// 创建班级时在对应的用户中添加本班级
ClassSchema.post('save', async (doc, next) => {
  console.log("新的班级被创建：", doc);
  await UserModel.findByIdAndUpdate(doc.createdBy, {
    $push: {
      classes: {
        classId: doc._id,
        isManager: true,
      }
    }
  })
  next();
})

// 删除班级时在对应的用户所属班级列表删除此班级
ClassSchema.pre('remove', async (doc, next) => {
  console.log("班级被删除：", doc);
  await UserModel.updateMany({ 'classes.classId': doc._id }, {
    $pull: {
      classes: {
        classId: doc._id
      }
    }
  })
  next();
})

const ClassModel = mongoose.model('class', ClassSchema);

module.exports = ClassModel;