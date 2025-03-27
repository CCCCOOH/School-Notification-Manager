const express = require('express');
const router = express.Router();
const db = require('../db/data');

router.get('/', (req, res) => {
  db.all("select * from Test", [], (err, rows) => {
    if (err != null) {
      console.log("报错");
    } else {
      console.log(rows);
    }
    console.log("数据库查询成功...");
  })

  console.log("发送响应...");

  res.send({
    code: 200,
    msg: '测试数据库连接成功',
  });
});

module.exports = router;