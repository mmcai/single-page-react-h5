import Toast from '../components/toast';
export default (Axios) => {
    // Axios 请求拦截器
    Axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么    
        config.withCredentials = true;
        console.log(config);
        return config;
    }, function (error) {
        // 对请求错误做些什么    
        Toast.show('请求过程中发生了错误');
        return Promise.reject(error);
    });

    // 添加响应拦截器
    Axios.interceptors.response.use(function (response) {
        Toast.hide();
        // 对响应数据做点什么
        try {
            if (typeof (response.data.data) === "string") {
                var Data = JSON.parse(response.data.data);
                response.data.data = Data
            }
        } catch (e) {
            Toast.show("处理返回的数据发生异常~");
        }
        return response;
    }, function (error) {
        // 对响应错误做点什么
        console.log(error);
        Toast.hide();
        Toast.show("返回数据过程中发生了错误~");
        return Promise.reject(error);
    });
}