const mongoose = require('mongoose');
const ClassModel = require('../models/Class')
const ObjectId = mongoose.Schema.Types.ObjectId

// 查询所有班级
module.exports.listClass = async (req, res) => {
  try {
    const rows = await ClassModel.find();
    res.send(rows)
  } catch (error) {
    console.error(error);
    res.status(500).send('查询所有班级失败')
  }
}
// 创建班级
module.exports.createClass = async (req, res) => {
  try {
    const new_class = await ClassModel(req.body)
    await new_class.save();
    res.send(new_class)
  } catch (error) {
    console.error(error);
    res.status(500).send('添加班级失败')
  }
}
// 移除班级
module.exports.removeClass = async (req, res) => {
  try {
    const {
      user_id,
      class_id
    } = req.query;

    const row = await ClassModel.findOneAndDelete({
      $and: [{
        createdBy: user_id
      }, {
        _id: class_id
      }]
    })
    
    if (row) {
      res.send({
        code: 200,
        msg: '删除成功',
        row
      })
      return;
    } else {
      res.status(500).send('删除失败')
      return;
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('删除失败')
  }
}

// 修改班级
module.exports.updateClass = async (req, res) => {
  try {
    const { user_id, class_id, className, description, updatedAt } = req.body;

    const row = await ClassModel.findOne({
      $and: [{
        createdBy: user_id
      }, {
        _id: class_id
      }]
    })

    if (row) {
      row.className = className;
      row.description = description;
      row.updatedAt = Date.now();
      await row.save();
      res.send({
        code: 200,
        msg: '更新成功',
        row
      })
      return;
    } else {
      res.status(500).send('删除失败')
      return;
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('删除失败')
  }
}

module.exports.clearClass = async (req, res) => {
  await ClassModel.deleteMany()
  res.send("清空班级成功")
}