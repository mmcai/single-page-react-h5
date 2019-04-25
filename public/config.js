/* 
  微信签名接口地址 
* 接收1个参数url
* 接口返回内容
let ReturnParams = {
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

*/

/* 预加载的资源根路径 */
window.BaseUrl = '';

/* 获取微信分享签名的接口URL */
window.SignInterfaceLink = "https://maimai.cn/api/ent/web/get";


/* 分享内容的相关配置 */
window.ShareConfig = {
    title: "七夕这天，我是如何和100个人…",
    desc: "七夕这天，我约了100个人北京、深圳一起含情“脉脉”",
    link: window.location.href,
    imgUrl: "https://xxx.mmcai.cn/static/36/lg/imgs/icon.jpg"
}


