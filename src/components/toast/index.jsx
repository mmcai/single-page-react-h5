import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './layout.css';


export default {
  show: function (text) {
    let txt = text;
    let self = this;
    let toastDom = document.createElement("div");
    toastDom.setAttribute("id", "LoanToast");
    document.body.appendChild(toastDom);


    ReactDOM.render((
      <div className='loan-toast'>
        <div className="loan-toast-inner">
          <div className="loan-toast-txt">{txt}</div>
        </div>
      </div>
    ), document.getElementById('LoanToast'));

    window.setTimeout(function () {
      self.hide();
    }, 1000);
  },
  hide: function () {
    var toastDom = document.getElementById('LoanToast');
    if (toastDom) {
      toastDom.parentNode.removeChild(toastDom);
    }
  }
};


