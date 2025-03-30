const mongoose = require('mongoose')
const connection = mongoose.connect('mongodb://localhost/test')

mongoose.connection.on('open', () => {
  console.log('连接成功');
})

module.exports = connection;