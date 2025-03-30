require('./config/connectMongoDb')  // 连接数据库
require('./models/User')
const express = require('express')  // 创建app
const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.send("你好，世界!")
})
app.use('/user', require('./routes/User'))
app.use('/class', require('./routes/Class'))

app.listen(3000, () => {
    console.log("http://localhost:3000");
})