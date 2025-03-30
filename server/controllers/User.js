const UserModel = require('../models/User')

module.exports.findUser = async (req, res) => {
  try {
    const rows = await UserModel.find();
    res.send(rows)
  } catch (error) {
    console.error(error);
    res.status(500).send('查找失败')
  }
}

module.exports.register = async (req, res) => {
  try {
    const user = new UserModel(req.body)
    await user.save()
    res.send(user)
  } catch (err) {
    console.error(err);
    res.status(500).send('注册失败')
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
    })
    
    if (user) {
      res.status(200).send({
        msg: "登录成功",
        row: {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullname: user.fullname,
          classes: user.classes
        }
      })
    } else {
      res.status(500).send('登录失败')
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('登录失败')
  }
}

module.exports.deleteAll = async (req, res) => {
  try {
    await UserModel.deleteMany({});
    res.send('删除成功')
  } catch (error) {
    console.error(error);
    res.status(500).send('删除失败')
  }
}

module.exports.updateUser = async (req, res) => {
  try {
    await UserModel.findOneAndUpdate(req.body);
    res.send('更新成功')
  } catch (error) {
    console.error(error);
    res.status(500).send('更新失败')
  }
}