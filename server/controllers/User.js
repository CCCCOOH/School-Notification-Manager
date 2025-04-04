const ClassModel = require('../models/Class');
const UserModel = require('../models/User')

module.exports.findUser = async (req, res) => {
  try {
    const rows = await UserModel.find();
    res.send({
      code: 200,
      msg: '搜索成功',
      rows
    })
  } catch (error) {
    console.error(error);
    res.send({
      code: 500,
      msg: '查找失败'
    })
  }
}

module.exports.register = async (req, res) => {
  try {
    const user = new UserModel(req.body)
    await user.save()
    res.send({
      code: 200,
      msg: '注册成功',
      data: user
    })
  } catch (err) {
    console.error(err);
    res.send({
      code: 500,
      msg: '注册失败',
    })
  }
}

module.exports.login = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;
    const user = await UserModel.findOne({
      $and: [
        {username}, {password}
      ]
    }, {
      password: false
    })
    
    if (user) {
      res.send({
        code: 200,
        msg: "登录成功",
        row: user
      })
    } else {
      res.send({
        code: 500,
        msg: '登陆失败'
      })
    }
  } catch (err) {
    console.error(err);
    res.send({
      code: 500,
      msg: '登陆失败',
    })
  }
}

module.exports.deleteAll = async (req, res) => {
  try {
    await UserModel.deleteMany({});
    res.send({
      code: 200,
      msg: '删除成功'
    })
  } catch (error) {
    console.error(error);
    res.send({
      code: 500,
      msg: '删除失败'
    })
  }
}

module.exports.updateUser = async (req, res) => {
  try {
    await UserModel.findOneAndUpdate(req.body);
    res.send({
      code: 200,
      msg: '更新成功'
    })
  } catch (error) {
    console.error(error);
    res.send({
      code: 500,
      msg: '更新失败'
    })
  }
}

module.exports.listClasses = async (req, res) => {
  const { user_id } = req.params;
  const rows = await UserModel.findById(user_id)
  const class_ids = rows.classes.map(item => item.classId)
  const classes = await ClassModel.find({
    _id: {
      $in: class_ids
    }
  }, {
    __v: false
  })
  res.send(classes)
}