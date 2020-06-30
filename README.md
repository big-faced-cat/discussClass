# smartclass.web

## 1. 项目简介
慧眼课堂Web前端项目

## 2. 技术选型

前端模块|技术选型
:-|:-
JavaScript 框架|`VUE`
UI 框架|`Element UI`
Js面向对象|`TypeScript`
Css|`Sass`
发布|`webpack`
包管理|`npm/bower/yarn`

## 3. 运行发布
### 3.1 CLI
```sh
npm install
npm run dev
```

### 3.2 Docker
#### 1) 测试
```sh
npm run build

docker run \
-it \
--rm \
-v $(pwd)/dist:/usr/share/nginx/html \
-p 80:8080 \
nginx:alpine
```

#### 2) 发布
```sh
npm run build

docker build -t xiaoyang/webapp:1.0 .
docker run \
-d \
--name webapp \
-p 80:8080 \
--restart always \
xiaoyang/webapp:1.0
```