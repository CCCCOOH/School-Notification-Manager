const express = require('express');
const fs = require('fs');
const path = require('path');
const { resourceLimits } = require('worker_threads');

const router = express.Router();

router.post('/', (req, res) => {
    let result = [];
    for (let file of req.files) {
        const newFileName = new Date().getTime() + file.originalname.substring(file.originalname.indexOf('.'));
        const preFilePath = path.join(process.cwd(), '/public/uploads/temp/' + file.filename);
        const newFilePath = path.join(process.cwd(), '/public/uploads/' + newFileName);
        fs.renameSync(preFilePath, newFilePath)        
        result.push({
            filename: newFileName,
            url: '/uploads/' + newFileName
        })
    }
    res.send({
        code: 200,
        msg: '上传成功',
        res_img: result
    });
});

module.exports = router; 
