const mongoose = require('mongoose');
const ClassModel = require('../models/Class');
const UserModel = require('../models/User');

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
    res.send({
      code: 200,
      msg: '创建成功',
      rows: new_class
    });
  } catch (error) {
    console.error(error);
    res.send({
      code: 500,
      msg: "创建失败"
    })
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
      const user_doc = await UserModel.findById(user_id);
      const user_classes = user_doc.classes;
      const remove_idx = user_classes.findIndex(item => item.classId = class_id);
      user_doc.classes.splice(remove_idx, 1);
      await user_doc.save();
      res.send({
        code: 200,
        msg: '删除成功',
        row
      })
    } else {
      res.send({
        code: 500,
        msg: '删除失败'
      })
      return;
    }
  } catch (err) {
    console.error(err);
    res.send({
      code: 500,
      msg: '删除失败'
    })
    return;
  }
}

// 修改班级
module.exports.updateClass = async (req, res) => {
  try {
    const {
      user_id,
      class_id,
      className,
      description,
      updatedAt
    } = req.body;

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
      res.send({
        code: 500,
        msg: '更新失败'
      })
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

module.exports.addNotify = async (req, res) => {
  try {
    const {
      class_id,
      user_id,
      title,
      time,
      content,
      level,
      categories
    } = req.body;
    const row = await ClassModel.findOne({
      $and: [{
          _id: class_id
        },
        {
          createdBy: user_id
        }
      ]
    });
    if (row) {
      row.notifies.push({
        title,
        time,
        content,
        level,
        categories
      })
      await row.save();
      res.send({
        code: 200,
        msg: "添加成功",
        row
      })
    } else {
      res.send({
        code: 500,
        msg: '添加失败'
      })
    }
  } catch (error) {
    console.error(error);
    res.send({
      code: 500,
      msg: '添加失败'
    })
  }
}

module.exports.modifyNotify = async (req, res) => {
  try {
    const {
      class_id,
      user_id,
      notify_id,
      title,
      time,
      content,
      level,
      categories
    } = req.body;
    const row = await ClassModel.findOne({
      $and: [{
          _id: class_id
        },
        {
          createdBy: user_id
        }
      ]
    });
    if (row) {
      let notify = row.notifies.find(notify => notify._id.equals(notify_id));
      if (!notify) {
        res.status(500).send("修改失败");
        return;
      }
      notify.title = title;
      notify.time = time
      notify.content = content
      notify.level = level
      notify.categories = categories
      await row.save();
      res.send({
        msg: "修改成功",
        notify
      })
    } else {
      res.status(500).send("修改失败")
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("修改失败")
  }
}

module.exports.listNotifyUser = async (req, res) => {
  try {
    const {
      user_id
    } = req.query;
    let user_info = await UserModel.findById(user_id);
    const user_classe_list = user_info.classes.map(item => item.classId);
    const classes = await ClassModel.find({
      _id: {
        $in: user_classe_list
      }
    })
    res.send({
      code: 200,
      msg: '查询成功',
      rows: classes
    })
  } catch (error) {
    console.error(error);
    res.send({
      code: 500,
      msg: '查询失败'
    })
  }
}

module.exports.listClassNotify = async (req, res) => {
  try {
    const {
      class_id
    } = req.query;
    const row = await ClassModel.findById(class_id, {
      notifies: true
    });
    res.send({
      code: 200,
      msg: '查询成功',
      row
    })
  } catch (error) {
    console.error(error);
    res.send({
      code: 500,
      msg: '查询失败'
    })
  }
}

module.exports.removeNotify = async (req, res) => {
  try {
    const {
      class_id,
      notify_id
    } = req.query;

    console.log(class_id, notify_id);

    const class_doc = await ClassModel.findById(class_id);
    const rmIdx = class_doc.notifies.findIndex(item => item._id == notify_id);
    class_doc.notifies.splice(rmIdx, 1);
    await class_doc.save();
    res.send({
      code: 200,
      msg: '删除成功',
      class_doc
    })
  } catch (error) {
    console.error(error);
    
    res.send({
      code: 500,
      msg: '删除失败'
    })
  }
}