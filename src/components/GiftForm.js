import React, { Component } from 'react'
import classNames from 'classnames'
import HUYA from '../assets/js/Protocol.js'
import '../assets/sass/giftForm.scss'
import Helper from '../assets/js/helper.js'

const HUYASdk = window.HUYASdk

class GiftForm extends Component {

  constructor () {
    super();
    this.state = {
      showPB: false,
      showKB: false,
      giftNum: '1',
      authorInfo: {}
    }
  }

  componentWillMount () {
    const isLand = this.props.isLand

    if(isLand) {
      const sdk = this.props.sdkobj.sdk
      sdk.getAuthorInfo((authorInfo) => {
        this.setState({
          authorInfo: authorInfo
        })
      });
    }
  }

  sendGift () {
    const sdk = this.props.sdkobj.sdk
    const yyuid = this.getCookie('yyuid')

    if(!yyuid) {
      sdk.showLogin();
      return;
    }

    HUYASdk && HUYASdk.getCurrentUserInfo({
       complete : (resp) => {
        if(resp && resp.uid && resp.uid != 0) {
          this.setState({
            showKB: false,
            showPB: false,
            giftNum: this.state.giftNum || '1'
          })

          this.sendCardPackageItem();
        } else {
          sdk.showLogin();
        }
       }
    });
  }

  showPopbox () {
    const state = this.state

    if(state.showKB) {
      if(state.giftNum == '') state.giftNum = '1';
      state.showKB = false;
      return;
    }

    state.showPB = !state.showPB;
    this.setState(state);
  }

  showKeyboard () {
    this.setState({
      giftNum: '',
      showPB: false,
      showKB: true
    })
  }

  enterExactNum (num) {
    this.giftNum = num;
    this.showPB = false;

    this.setState({
      giftNum: num,
      showPB: false
    })
  }

  enterSingleNum (num) {
    const state = this.state

    if(state.giftNum == '' && num == 0) return;
    if(state.giftNum == '0') {
      state.giftNum = '1';
      return;
    }

    state.giftNum += String(num);
    if(parseInt(state.giftNum) >= 9999) state.giftNum = 9999;

    this.setState(state)
  }

  cancel () {
    const state = this.state
    const numString = String(state.giftNum), result = numString.slice(0, numString.length - 1);

    this.setState({
      giftNum: result ? result : (state.showKB ? '' : '1')
    })
  }

  confirm () {
    const state = this.state
    this.setState({
      giftNum: state.giftNum || '1',
      showKB: false
    })
  }

  getURLParam (name) {
    const value = window.location.search.match(new RegExp("[?&]" + name + "=([^&]*)(&?)", "i"));
    return value ? decodeURIComponent(value[1]) : value;
  }

  sendCardPackageItem () {
    const sdkobj = this.props.sdkobj,
          token = sdkobj.token,
          sdkInfo = sdkobj.sdkInfo,
          giftNum = this.state.giftNum,
          taf = this.props.tafOb;

    Helper.sendCardPackageItem(taf, giftNum,sdkInfo,token,HUYA)
  }

  getPayId () {
    var payStr = "";
    var date = new Date();
    var dateStr = this.numberFormat(date.getFullYear()) + this.numberFormat(date.getMonth() + 1) + this.numberFormat(date.getDate());
    var timeStr = this.numberFormat(date.getHours()) + this.numberFormat(date.getMinutes()) + this.numberFormat(date.getSeconds());
    var uid = this.createGUID([7]);
    payStr = dateStr + timeStr + "0005" + uid;
    return payStr.toUpperCase();
  }

  createGUID (value) {
    var uid = new Array();
    var chars = new Array(48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70);
    var separator = 45;
    var template = value || new Array(8, 4, 4, 4, 12);

    for (var a = 0; a < template.length; a++) {
      for (var b = 0; b < template[a]; b++) {
        uid.push(chars[Math.floor(Math.random() * chars.length)]);
      }
      if (a < template.length - 1) {
       uid.push(separator);
      }
    }
    return String.fromCharCode.apply(null, uid);
  }

  numberFormat (value) {
    if (value < 10) {
      return "0" + value.toString();
    } else {
      return value.toString();
    }
  }

  getCookie (cookieName) {
      var cookieString = document.cookie;
    var cookies = cookieString.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var start = cookie.indexOf(cookieName + '=');
      if (start == -1 || start > 1) continue;
      start += cookieName.length + 1;
      return cookie.substring(start);
    }
    return null;
  }

  render () {
    const state = this.state
    const { isLand } = this.props 

    return (
      <section className="gift-form clearfix">
        <div className="gift-info">
          <p>赠送“门票”给主播</p>
          <p>换取粉丝喇叭助力主播</p>
        </div>
          <div className="g-stick"></div>
          <div className="gift-btns">
            <div className={classNames({
                "btn-first": true,
                "active": state.showPB || state.showKB
              })}
              onClick={this.showPopbox.bind(this)}>
             <span>{state.giftNum}</span><i></i>
            </div>
            <div className="btn-second" onClick={this.sendGift.bind(this)}>赠送</div>
            <div className="gift-line"></div>
          </div>
          {
            state.showPB && 
            <div className="gift-popbox">
              <div className="inner">
                <ul>
                  <li onClick={this.showKeyboard.bind(this)}>其他</li>
                  <li onClick={this.enterExactNum.bind(this, 1314)}>
                    <span className="gift-num">1314</span>
                    <span className="gift-des">一生一世</span>
                  </li>
                  <li onClick={this.enterExactNum.bind(this, 520)}>
                    <span className="gift-num">520</span>
                    <span className="gift-des">我爱你</span>
                  </li>
                  <li onClick={this.enterExactNum.bind(this, 188)}>
                    <span className="gift-num">188</span>
                    <span className="gift-des">要抱抱</span>
                  </li>
                  <li onClick={this.enterExactNum.bind(this, 66)}>
                    <span className="gift-num">66</span>
                    <span className="gift-des">一切顺利</span>
                  </li>
                  <li onClick={this.enterExactNum.bind(this, 30)}>
                    <span className="gift-num">30</span>
                    <span className="gift-des">想你</span>
                  </li>
                  <li onClick={this.enterExactNum.bind(this, 10)}>
                    <span className="gift-num">10</span>
                    <span className="gift-des">十全十美</span>
                  </li>
                  <li onClick={this.enterExactNum.bind(this, 1)}>
                    <span className="gift-num">1</span>
                    <span className="gift-des">一心一意</span>
                  </li>
                </ul>
              </div>
            </div>
          }
          {
            state.showKB && 
            <div className="keyboard">
              <ul className="clearfix">
                <li onClick={this.enterSingleNum.bind(this, 1)}>1</li>
                <li onClick={this.enterSingleNum.bind(this, 2)}>2</li>
                <li onClick={this.enterSingleNum.bind(this, 3)}>3</li>
                <li onClick={this.enterSingleNum.bind(this, 4)}>4</li>
                <li onClick={this.enterSingleNum.bind(this, 5)}>5</li>
                <li onClick={this.enterSingleNum.bind(this, 6)}>6</li>
                <li onClick={this.enterSingleNum.bind(this, 7)}>7</li>
                <li onClick={this.enterSingleNum.bind(this, 8)}>8</li>
                <li onClick={this.enterSingleNum.bind(this, 9)}>9</li>
                <li onClick={this.enterSingleNum.bind(this, 0)}>0</li>
                <li className="confirm" onClick={this.confirm.bind(this)}>确定</li>
                <li className="cancel-input" onClick={this.cancel.bind(this)}><i></i></li>
              </ul>
            </div>
          }
        </section>
    )
  }
}

export default GiftForm