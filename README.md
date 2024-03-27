<!--
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-03-27 09:03:07
 * @LastEditors: zhoulei && 910592680@qq.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/README.md
 *  
-->
# vue3_ts_three

本项目是使用vue3 + typescript + three.js 搭建的

项目结构
![项目结构](public/doc/image.png)
- App.ts 是初始化类
- views/home
  - HomeView.vue 示例主页
  - components 存放子组件
- use 是对应的views/下的主页存放通用逻辑
- components
  - helpers 存放了threejs的基础方法
## 安装依赖

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

## 开发说明
App.ts为程序入口，以实例化后的app拆封功能并为各个组件提供服务

## 参考
VBen
