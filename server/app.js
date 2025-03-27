const multer = require('multer');
const express = require('express');
const app = express();

const upload = multer({ dest: './public/uploads/temp/' });


// 开放静态文件文件夹
app.use(express.static('./public'));
app.use(express.json());
app.use(upload.any())

// 开放临时上传服务

// 使用路由
app.use('/test', require('./router/Test'));
app.use('/upload', require('./router/Upload'));
app.use('/testDb', require('./router/TestDb'));

app.all('/', (req, res) => {
    res.send('首页');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 
