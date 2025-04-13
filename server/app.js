require('./config/connectMongoDb')  // 连接数据库
require('./models/User')
const path = require('path')
const multer = require("multer")
const cors = require('cors')
const express = require('express')  // 创建app
const app = express()

const upload = multer({
    dest: './public/upload/temp'
})

app.use(upload.any())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.get('/', (req, res) => {
    res.send("你好，世界!")
})
app.use('/api/user', require('./routes/User'))
app.use('/api/class', require('./routes/Class'))

app.listen(8080, () => {
    console.log("http://localhost:8080");
})

// /www/wwwroot/Node.js-Blog/server/public