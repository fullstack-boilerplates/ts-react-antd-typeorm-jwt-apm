# ts-react-antd-typeorm-jwt
fullstack bolierplate with shack.js | 基于 shack.js 的全栈模板

![screenshot](./screenshot.gif)

## structure | 文件结构

```
+-- src
  +-- apis # each exported function in this folder is a backend api | 此文件夹下导出的函数都被用作后台接口
  +-- web # front end codes | 前端代码
  |     +-- index.tsx # entry | 前端代码入口
  +-- common # common codes | 公共代码
  +-- uploads # files uploaded | 上传的文件
+-- dist # compiled codes for production | 编译后用于产线的代码
```

## usage | 使用

*note:* replace `./private.key` with your own | 记得替换 `./private.key`

dev(hot-reload for frontend only) | 开发(热加载仅限前端代码)

```
npm run dev
```

production | 产线

```
npm run build
npm run start
```

docker-compose

```
docker-compose up
```