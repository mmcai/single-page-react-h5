## single-page-react-h5
基于React的H5活动页面脚手架，助力你在1小时就可以完成一个H5活动页面，这里已经帮您做了如下几个基本事情
- 页面缩放，基于宽度为750px的视觉稿，当然您也可以自行修改
- 页面微信分享，只需要配置获取分享相关的签名接口，就可以实现
- ~~预加载loading，如果您需要，基于create.js 的 preload模块实现~~
- 包含了Axios，你可以直接使用Axios请求相关的接口


## 目录结构说明
``` 
|——build(代码编译后所在的文件目录)
|——config(webpack相关的配置目录)
|——node_modules
|——public(html模板，favicon及其他静态资源存放目录)
|——scripts(webpack各个环境脚本执行文件存放目录)
|——src(项目源码存放路径)
|   |——components(组件存放目录，如果有？)
|   |——containers(具体页面存放目录)
|   |——...(具体看代码)
|   |——public(一些第三方库包含的相关资源存放的目录，比如swiper，animate.css)
|   |——utils(工具函数存放目录)
|   |——index.js(webpack入口执行文件)
|   |——registerServiceWorker.js(生产环境中处理文件的缓存，用来加快页面访问速度的)
|
|——.gitingnore
|——LICENSE
|——package-lock.json
|——package.json
|——README.md

```

## 如何使用
```
确认您当前的系统是否具有以下相关环境（这里说的是window系统下）
- git
- node(npm)

为了确保下载npm的体验更好，您可以选择以下两种方式之一

1、安装cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org

2、修改npm下载源
npm config set registry https://registry.npm.taobao.org
```

### 第一步
npm install 或者 cnpm install 安装相关的依赖包

### 第二步
npm run start 启动项目

### 第三步
编写您的活动页面相关业务逻辑代码

### 第四步
npm run build 打包（编译项目）


## 其他
如果您的页面需要配置微信当中的分享，请保证与您联调的后台接口返回内容是如下格式的
```
{
    success: true,
    data: {
        "debug": true,
        "appId": "wxb17a5a75c9ad192b",
        "timestamp": "1533897246",
        "nonceStr": "b9aab9c2ii",
        "signature": "d1c126bbcaff2f48d415fd71e92684978c0e1a1c",
        "jsApiList": [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo",
            "onMenuShareQZone"
        ]
    }
}
```

或者您修改utils文件夹下面的Weixin.js文件

关于资源预加载
- 在config.js配置资源的根路径window.BaseUrl
- 在webpack的入口文件index.js里面配置资源列表Manifest
- 引入工具函数import PreLoad from './utils/PreLoad';
- 执行资源预加载函数，然后再回调函数里面初始化页面
