const mongoose = require('mongoose')
console.log("创建用户模型中...");

const UserSchema = new mongoose.Schema({
  username: { // 用户名
    type: String,
    required: true,
    unique: true
  },
  password: { // 密码
    type: String,
    required: true
  },
  email: {    // 邮箱
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    default: () => this.username
  },
  classes: [{
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    isManager: { type: Boolean, default: false },
    joinedAt: { type: Date, default: Date.now() }
  }],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
})

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;