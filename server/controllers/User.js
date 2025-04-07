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
      row: user
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
      password,
    } = req.body;
    const user = await UserModel.findOne({
     email: username,
     password
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
    const {user_id, username, fullname, password} = req.body;
    const user_doc = await UserModel.findOne({
      _id: user_id,
    });

    if (!user_doc) {
      return res.send({
        code: 500,
        msg: '未找到用户'
      })
    }

    user_doc.username = username;
    user_doc.fullname = fullname;
    user_doc.password = password;

    await user_doc.save();

    res.send({
      code: 200,
      msg: '更新成功',
      row: user_doc
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
  try {
    const {
      user_id
    } = req.params;
    const rows = await UserModel.findById(user_id);
    if (!rows) {
      return res.send({
        code: 200,
        msg: '查询为空',
        rows: []
      })
    }
    const class_ids = rows.classes.map(item => item._id)
    const classes = await ClassModel.find({
      _id: {
        $in: class_ids
      }
    }, {
      __v: false
    })
    res.send({
      code: 200,
      msg: '查询成功',
      rows: classes
    })
  } catch (error) {
    console.error(error);
    res.send({
      code: 200,
      msg: '查询失败'
    })
  }
}