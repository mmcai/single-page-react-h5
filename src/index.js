import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './public/styles/animate.css';
import Index from './containers/home/index';
import Axios from 'axios';
import Request from './utils/Axios';
import WeiXin from './utils/Weixin';
import registerServiceWorker from './registerServiceWorker';
// import PreLoad from './utils/PreLoad';
// const BaseUrl = window.BaseUrl;

/* 在ajax 请求之前和之后需要做什么操作 */
Request(Axios);


/* 兼容苹果X的刘海问题 */
let viewport = document.querySelector('meta[name="viewport"]');
if (viewport) {
    viewport.setAttribute('viewport-fit', 'contain');
}

/* 如果页面需要在微信端分享的时候有ICON和自定义文案，请把注释去掉 */
// WeiXin(Axios);

/* 资源加载 */
/* 
const Manifest = [
    { id: "gif1", src: "1.gif" },
    { id: "gif2", src: "2.gif" }   
];
 */

/* 资源加载，一般情况下加载成功之后再渲染内容 */
// window.createJS = PreLoad({
//     BaseUrl: BaseUrl,//资源的url根路径
//     Manifest: Manifest,// 资源列表
//     callback: () => {

//         // 静态资源加载完成之后的回调函数
//         //     ReactDOM.render(<Index />, Root);
//         //     registerServiceWorker();
//         // 

//     }
// });

const Root = document.getElementById("root");
ReactDOM.render(<Index />, Root);
registerServiceWorker(); 