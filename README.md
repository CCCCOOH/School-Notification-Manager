# 启动说明

本仓库用于快速构建一个前后端分离的Express+ Vue程序，包含部分依赖，自行install.

方法：
- 进入`server`:
```sh
# 调试模式
nodemon app.js
# 正常启动
node app.jS
```

- 进入`client`：
```sh
npm run dev
```

本项目帮你集成好了以下内容：
> 前端：
- Vue
- TailwindCSS
- Pinia
- VueRouter
- axios

> 后端
- express
- sqlite3
- multer