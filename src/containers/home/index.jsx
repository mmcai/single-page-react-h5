import React, { Component } from 'react';
import Axios from 'axios';
import Toast from '../../components/toast';
import './layout.css';
import API from '../../utils/Api';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countdown: 60,
            verifyTxt: "获取验证码",
            canSendCode: true,
            mobile: '',
            verifyCode: '',
            name: '',
            channel: null,
            img1: require('./imgs/bg.png'),
            img2: require('./imgs/btn-long.png'),
            img3: require('./imgs/btn-short.png')
        }
    }

    componentWillMount() {
        const sources = this.GetLocaltionParams('source');
        console.log(sources, '渠道');
        if (sources) {
            this.setState({
                channel: sources
            })
        }
    }

    GetLocaltionParams(name) {
        const channel = window.location.search.replace('?', '');
        let result = null;
        if (channel.length) {
            const channelArr = channel.split('&');
            channelArr.some(item => {
                const _item = item.split("=");
                if (_item[0] === name) {
                    result = _item[1]
                }
            })
        }

        return result;
    }


    ValidMobile(val) {
        return (/^1[3456789]\d{9}$/.test(val));
    }

    countdown() {
        let { countdown } = this.state;
        if (this.state.countdown === 1) {
            this.setState({
                verifyTxt: "获取验证码",
                canSendCode: true,
                countdown: 60,
            });
            return false;
        }
        else {
            this.setState({
                countdown: --countdown,
                canSendCode: false,
                verifyTxt: `${countdown}秒`
            })
        }
        if (this.TimeOutCount != null) clearTimeout(this.TimeOutCount);
        this.TimeOutCount = setTimeout(() => {
            this.countdown();
        }, 1000);
    }

    GetVerifyCode() {
        const { mobile } = this.state;
        if (!mobile) {
            Toast.show('请输入手机号码');
            return false;
        }
        if (!this.ValidMobile(mobile)) {
            Toast.show('请输入正确的手机号码');
            return false;
        }


        const req = Axios.get(`${API.send_msg}/${mobile}`, {
            // const req = Axios.get('https://www.easy-mock.com/mock/5bd913e61baba44579100308/api/send', {
            params: {
                cell: mobile
            }
        });

        req.then((res) => {
            const data = res.data;
            if (data.success) {
                Toast.show('验证码发送成功，请注意查收');
                this.countdown();
            } else {
                Toast.show('验证码发送失败');
            }
        }).catch(err => {
            Toast.show('验证码发送失败');
        });

    }


    submit() {
        const { name, mobile, verifyCode, channel } = this.state;
        if (!name) {
            Toast.show('请输入姓名');
            return false;
        }
        if (!mobile) {
            Toast.show('请输入手机号码');
            return false;
        }
        if (!this.ValidMobile(mobile)) {
            Toast.show('请输入正确的手机号码');
            return false;
        }

        if (!verifyCode && verifyCode.length !== 4) {
            Toast.show('请输入正确的验证码');
            return false;
        }


        /* Ajax 提交 */
        const req = Axios.post(API.sign_insert, {
            "clientCell": mobile,
            "clientName": name,
            "code": verifyCode,
            "source":channel
        });


        req.then((res) => {
            const data = res.data;
            if (data.success) {
                Toast.show('领取成功，请注意接收电话');
            } else {
                Toast.show(data.message);
            }
        }).catch(err => {
            Toast.show('领取失败');
        });

    }

    render() {
        const { mobile, name, verifyCode, verifyTxt, canSendCode } = this.state;
        return (
            <div className="main">
                <div className='form'>
                    <div className='f-item'>
                        <label className='f-label'>姓名</label>
                        <div className='f-input'>
                            <input
                                type='text'
                                value={name}
                                onChange={(event) => {
                                    this.setState({ name: event.target.value })
                                }}
                                placeholder='请输入姓名' className='input' />
                        </div>
                    </div>
                    <div className='f-item'>
                        <label className='f-label'>手机号</label>
                        <div className='f-input'>
                            <input
                                type='number'
                                pattern="[0-9]*"
                                onChange={(event) => {
                                    this.setState({ mobile: event.target.value })
                                }}
                                value={mobile} placeholder='请输入手机号' className='input' />
                        </div>
                    </div>
                    <div className='f-item f-item-verify'>
                        <label className='f-label'>验证码</label>
                        <div className='f-input f-input-verify'>
                            <input
                                type='number'
                                pattern="[0-9]*"
                                onChange={(event) => {
                                    this.setState({ verifyCode: event.target.value })
                                }}
                                value={verifyCode} placeholder='请输入验证码' className='input' />
                        </div>
                        <div
                            onClick={() => {

                                canSendCode && this.GetVerifyCode();
                            }}
                            className='f-btn-verify'>{verifyTxt}</div>
                    </div>
                    <div onClick={() => {
                        this.submit();
                    }} className='f-btn'>立即领取</div>
                </div>
                {/* 文字介绍 */}
                <div className='intro'>
                    <p>刷卡费率：0.65％+3，实时到账</p>
                    <p>1、全牌照(人民银行官网http://t.cn/RXEVOLk)</p>
                    <p>2、落地商户笔笔积分（Mcc码可查）</p>
                    <p>3、商户真实可查（红盾网可查）</p>
                    <p>4、稳定不跳码（银联95516可查）</p>
                </div>
            </div>
        );
    }
}

export default App;
