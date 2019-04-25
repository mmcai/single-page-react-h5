/*
 * @Description: 如果您的页面当中需要和后台相关的接口进行联调，您可以在这里配置接口列表
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-23 12:03:55
 * @LastEditTime: 2019-04-25 16:13:48
 */

const API = 'https://xxx.zhanhaijingji.cn';
export default {

    /*登陆*/
    /*提交登陆
     * login/sign/{cell}/{code}
     * login/login
     * */
    sign_insert: `${API}/client/insert`,
    /*获取登陆验证码
     * login/send/{cell}
     * */
    send_msg: `${API}/login/send`,

}