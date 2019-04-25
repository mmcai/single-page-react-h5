let preload = null;
let createjs = window.createjs;
export default (params) => {
    let {BaseUrl,Manifest, callback} = params;
    console.log(createjs.Sound);

    preload = new createjs.LoadQueue(true);
    //注意加载音频文件需要调用如下代码行
    preload.installPlugin(createjs.Sound);
    createjs.Sound.alternateExtensions = ["mp3"];
    preload.on("fileload", handleFileLoad);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.on("error", loadError);
    preload.loadManifest(Manifest, true, BaseUrl);

    /* 单个资源加载完成 */
    function handleFileLoad(event) {
        console.log("文件类型: " + event.item.type);
        if (event.item.id === "logo") {
            console.log("logo图片已成功加载");
        }
    }

    /* 所有资源的加载进度 */
    function handleFileProgress() {
        // 在这里您可以实现进度条相关的内容
        // ProgressDom.style.width = (preload.progress * 100 | 0) + "%";
        // ProgressText.innerHTML = (preload.progress * 100 | 0) + "%";
    }

    function loadComplete() {
        console.log("加载完成");
        //createjs.Sound.play('mp3');
        if (callback) callback();
    }

    function loadError() {
        console.log("加载出错");
    }

    return {
        Sound: createjs.Sound,
        Preload: preload
    }
}