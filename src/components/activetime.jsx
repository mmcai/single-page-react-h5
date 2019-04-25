import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import API from '../public/libs/api.js';
import Moment from 'moment';
import {Toast, WhiteSpace, WingBlank, Button} from 'antd-mobile';

class ActiveTime extends React.Component {
    constructor(props) {
        super(props);
        this.actid = props.id;
        this.countDownTimeOut = null;
        this.state = {
            state: "",
            stateTxt: "",
            sTime: "1",
            eTime: "2"
        }

    }

    countDowns(time) {
        var self = this;
        var theTime = parseInt(time); // 秒
        var theTime1 = "00"; // 分
        var theTime2 = "00"; // 小时
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
            }
        }

        var result = parseInt(theTime) > 9
            ? parseInt(theTime)
            : "0" + parseInt(theTime);
        if (theTime1 > 0) {
            result = (parseInt(theTime1) > 9
                ? parseInt(theTime1)
                : "0" + parseInt(theTime1)) + ":" + result;
        } else {
            result = "00:" + result;
        }
        if (theTime2 > 0) {
            result = (parseInt(theTime2) > 9
                ? parseInt(theTime2)
                : "0" + parseInt(theTime2)) + ":" + result;
        } else {
            result = "00:" + result;
        }
        if (time > 0) {
            this.state.stateTxt = "活动开始还有 " + result;
            this
                .props
                .callbackParent(this.state);
            this.setState(this.state);
        }
        time--;
        if (self.countDownTimeOut) 
            clearTimeout(self.countDownTimeOut);
        self.countDownTimeOut = setTimeout(function () {
            self.countDowns(time);
        }, 1000);
    }

    componentDidMount() {
        let self = this;
        let req = Axios.get(API.BaseInfo, {
            params: {
                topicId: self.actid
            }
        });
        req.then(res => {
            var data = res.data;
            if (data.success) {
                var {startTime, endTime, currentTime} = data.data;
                var stime = startTime * 1;
                var etime = endTime * 1;
                var ctime = currentTime * 1;

                if (ctime < stime) {
                    //  未开始
                    this.countDowns((stime - ctime) / 1000);
                    this.state.stateTxt = "活动开始还有 00:00:00";
                    this.state.state = 0;
                } else if (ctime >= stime && ctime <= etime) {
                    // 活动已结束
                    this.state.stateTxt = "火速抢投";
                    this.state.state = 1;
                } else if (ctime >= etime) {
                    // 活动已结束
                    this.state.stateTxt = "活动已结束";
                    this.state.state = 2;
                }

                this.state.sTime = Moment(stime).format("YYYY.MM.DD");
                this.state.eTime = Moment(etime).format("YYYY.MM.DD");
                this
                    .props
                    .callbackParent(this.state);

                this.setState(this.state);

            } else {
                Toast.info(data.data.error_msg);
            }
        });

    }

    render() {
        return (
            <span className="h-time">
                {this.state.sTime}
                ~ {this.state.eTime}
            </span>
        );
    }
}
ActiveTime.propTypes = {
    id: PropTypes.number
};

export default ActiveTime;