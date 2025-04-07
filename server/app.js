require('./config/connectMongoDb')  // 连接数据库
require('./models/User')
const cors = require('cors')
const express = require('express')  // 创建app
const app = express()
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send("你好，世界!")
})
app.use('/api/user', require('./routes/User'))
app.use('/api/class', require('./routes/Class'))

app.listen(8080, () => {
    console.log("http://localhost:8080");
})