const mongoose = require('mongoose');
const ClassModel = require('../models/ClassModel');
const UserModel = require('../models/UserModel');
const path = require('path')
const fs = require('fs')

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
    // 创建班级示例
    const new_class = new ClassModel(req.body);
    await new_class.save()

    const {
      createdBy
    } = req.body;
    // 创建者模型
    const user_doc = await UserModel.findById(createdBy)
    if (!user_doc) {
      return res.send({
        code: 500,
        msg: '不存在用户'
      })
    }
    // 在创建者的班级列表中加入对应的班级

    user_doc.classes.push({
      _id: new_class._id
    })
    await user_doc.save()


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
      const remove_idx = user_classes.findIndex(item => item._id = class_id);
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

// 清空班级成员
module.exports.clearClass = async (req, res) => {
  await ClassModel.deleteMany()
  res.send("清空班级成功")
}

// 添加通知
module.exports.addNotify = async (req, res) => {
  try {
    const {
      class_id,
      user_id,
      title,
      time,
      content,
      level,
      categories,
      postUrl
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
        categories,
        postUrl
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

// 修改通知
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
      categories,
      postUrl
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
        res.send({
          code: 500,
          msg: "修改失败"
        });
        return;
      }
      notify.title = title;
      notify.time = time
      notify.content = content
      notify.level = level
      notify.postUrl = postUrl
      notify.categories = categories
      await row.save();
      res.send({
        code: 200,
        msg: "修改成功",
        notify
      })
    } else {
      res.send({
        code: 500,
        msg: "修改失败"
      });
    }
  } catch (error) {
    console.error(error);
    res.send({
      code: 500,
      msg: "修改失败"
    });
  }
}

// 查询用户所有班级>所有班级下的通知
module.exports.listNotifyUser = async (req, res) => {
  try {
    const {
      user_id
    } = req.query;
    let user_doc = await UserModel.findById(user_id);
    const classIdList = user_doc.classes.map(item => item._id)
    let classList = await ClassModel.find({
      _id: {
        $in: classIdList
      }
    })
    let final_notify_list = [];
    for (let cla of classList) {
      final_notify_list = [...final_notify_list, ...cla.notifies]
    }
    res.send({
      code: 200,
      msg: '查询成功',
      rows: final_notify_list
    })
  } catch (error) {
    console.error(error);
    res.send({
      code: 500,
      msg: '查询失败'
    })
  }
}

// 查询班级下的通知
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

// 移除通知
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

// 查询通知详情
module.exports.notifyDetail = async (req, res) => {
  try {
    const {
      class_id,
      notify_id
    } = req.query;

    const class_doc = await ClassModel.findById(class_id);
    const notify = class_doc.notifies.find(item => item._id == notify_id);

    res.send({
      code: 200,
      msg: '查询成功',
      notify
    })
  } catch (error) {
    console.error(error);

    res.send({
      code: 500,
      msg: '查询失败'
    })
  }
}

// 获取班级成员
module.exports.classMembersGet = async (req, res) => {
  try {
    const {
      class_id
    } = req.query;
    const class_doc = await ClassModel.findOne({
      _id: class_id
    });

    const memberIdList = class_doc.members.map(item => item._id);

    const users = await UserModel.find({
      _id: {
        $in: memberIdList
      }
    }, {
      username: true
    })

    res.send({
      code: 200,
      msg: '获取成功',
      rows: users
    })
  } catch (error) {
    console.error(error);
    res.send({
      code: 500,
      msg: '获取成员失败'
    })
  }
}

// 添加班级成员
/**
 * ⚠️：多对多关系，需要在班级模型下添加用户信息，在用户模型下添加班级信息
 */
module.exports.classMemberAdd = async (req, res) => {
  try {
    const {
      class_id,
      user_id
    } = req.body;
    if (!class_id || !user_id) {
      res.send({
        code: 500,
        msg: '字段不能为空'
      })
      return;
    }

    const class_doc = await ClassModel.findById(class_id);

    const user_doc = await UserModel.findById(user_id);

    const hasUser = class_doc.members.find(item => item._id == user_id);
    
    if (!class_doc || !user_doc) {
      return res.send({
        code: 500,
        msg: '找不到班级或用户'
      })
    }

    if (hasUser) {
      return res.send({
        code: 500,
        msg: '不可重复加入班级'
      })
    }

    class_doc.members.push({
      _id: user_id
    })
    class_doc.save()

    user_doc.classes.push({
      _id: class_id
    })
    user_doc.save()



    res.send({
      code: 200,
      msg: '添加成功',
      rows: [
        user_doc,
        class_doc
      ]
    })
  } catch (error) {
    console.error(error);
    res.send({
      code: 500,
      msg: '添加失败'
    })
  }
}

// 上传图片功能
module.exports.uploadImage = async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        code: 500,
        msg: '请上传文件'
      })
      return;
    } else {
      let files = req.files;
      let rows = [];
      for (let file of files) {
        const {
          originalname,
          filename,
          destination
        } = file;
        // 文件后缀
        const file_ext = `.` + originalname.split(".")[1]
        const origin_path = path.resolve(process.cwd(), 'public/upload/temp/', filename)
        const target_path = path.resolve(process.cwd(), 'public/upload/', filename + file_ext)
        console.log(origin_path, target_path);
        fs.renameSync(origin_path, target_path);
        rows.push('upload/' + filename + file_ext)
      }
      res.send({
        code: 200,
        msg: "上传成功",
        rows
      })
      return;
    }
  } catch (error) {
    console.error(error);
    res.send({
      code: 500,
      msg: "上传失败"
    })
  }
}

// 添加已读用户
module.exports.addRead = async (req, res) => {
  try {
    const {
      class_id,
      user_id,
      notify_id
    } = req.body;

    const classDoc = await ClassModel.findById(class_id);
    if (!classDoc) {
      res.send({
        code: 500,
        msg: '不存在该班级'
      })
      return;
    }

    const userDoc = await UserModel.findById(user_id)
    if (!userDoc) {
      res.send({
        code: 500,
        msg: '不存在用户'
      })
      return;
    }

    const notifyIndex = classDoc.notifies.findIndex(item => item._id == notify_id)
    if (notifyIndex == -1) {
      res.send({
        code: 500,
        msg: '不存在的通知'
      })
      return;
    }

    const hasUser = classDoc.notifies[notifyIndex].readList.find(user => user._id == user_id)
    if (hasUser) {
      res.send({
        code: 500,
        msg: '不可重复已读'
      })
      return;
    }

    classDoc.notifies[notifyIndex].readList.push({
      _id: user_id,
    })
    await classDoc.save();

    return res.send({
      code: 200,
      msg: '已读成功',
      row: classDoc
    })
  } catch (error) {
    console.error(error);
    res.send({
      code: 500,
      msg: '已读失败'
    })
  }
}

// 获取班级下对应通知的已读用户
module.exports.getRead = async (req, res) => {
  try {
    const {
      class_id,
      notify_id
    } = req.query;

    const classDoc = await ClassModel.findById(class_id);
    if (!classDoc) {
      return res.send({
        code: 500,
        msg: '不存在该班级'
      })
    }

    const notifyObj = classDoc.notifies.find(item => item._id == notify_id);
    if (!notifyObj) {
      return res.send({
        code: 500,
        msg: '不存在该通知'
      })
    }

    const readList = notifyObj.readList.map(item => item._id)

    const readUsers = await UserModel.find({
      _id: {
        $in: readList
      }
    }, {
      username: true,
      fullname: true
    })

    return res.send({
      code: 200,
      msg: '获取已读成功',
      rows: readUsers,
    })
  } catch (error) {
    console.error(error);
    return res.send({
      code: 500,
      msg: '获取已读失败'
    })
  }
}

// 用户退出班级
module.exports.leaveClass = async (req, res) => {
  try {
    const {user_id, class_id} = req.query;
    const userDoc = await UserModel.findById(user_id);
    const classDoc = await ClassModel.findById(class_id);

    if (!userDoc || !classDoc) {
      return res.send({
        code: 500,
        msg: '请确保用户或班级存在'
      })
    }

    if (!userDoc.classes.find(item => item._id == class_id)) {
      return res.send({
        code: 500,
        msg: '用户不在班级内'
      })
    }

    if (!classDoc.members.find(item => item._id == user_id)) {
      return res.send({
        code: 500,
        msg: '班级没有改成员'
      })
    }

    userDoc.classes = userDoc.classes.filter(item => item._id != class_id);
    await userDoc.save();

    classDoc.members = classDoc.members.filter(item => item._id != user_id);
    await classDoc.save();


    return res.send({
      code: 200,
      msg: '退出班级成功',
      userDoc,
      classDoc
    })
  } catch (error) {
    console.error(error);
    return res.send({
      code: 500,
      msg: '退出班级失败'
    })
  }
}