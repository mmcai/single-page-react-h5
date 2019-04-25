const url = window.SignInterfaceLink;
const shareConfig = window.ShareConfig;
const wx = window.wx;
export default (Axios) => {

    let req = Axios.get(url, {
        params: {
            url: encodeURIComponent(window.location.href)
        }
    });

    req.then(res => {
        console.log(res);
        if (res.status == 200) {
            if (res.data.success) {

                wx.config({
                    ...res.data.data,
                    debug: false
                });


                wx.ready(function () {
                    wx.onMenuShareTimeline({ ...shareConfig });
                    wx.onMenuShareAppMessage({ ...shareConfig });
                });
            }

        }
    })


}


