const app = getApp();
const config = app.config;
const wafer = require('../../vendors/wafer-client-sdk/index');
const lab = require('../../lib/lab');

wafer.setLoginUrl(`https://` + config.host + '/login');

Page({
  data: {
    status: 'waiting',
    url: 'https://' + config.host + '/me',
    requesting: false,
    hintLine1: '妞宝登录测试，',
    hintLine2: '让妞宝可以识别小程序会话'
  },
  request() {
    this.setData({
      requesting: true,
      status: 'waiting',
      hintLine1: '正在发送',
      hintLine2: '...'
    });
    wafer.request({
      login: true,
      url: this.data.url,
      method: 'GET',
      success: (res) => {
        if (+res.statusCode == 200) {
          if (res.data.openId) {
            this.setData({
              status: 'success',
              hintLine1: '成功获取妞宝',
              hintLine2: res.data.nickName,
              avatarUrl: res.data.avatarUrl
            });
            lab.finish('session');
          } else {
            this.setData({
              status: 'warn',
              hintLine1: '妞宝获取失败',
              hintLine2: '未获取到 openId'
            });
            console.error('妞宝获取失败', res.data);
          }
        } else {
          this.setData({
            status: 'warn',
            hintLine1: '响应错误',
            hintLine2: '响应码：' + res.statusCode
          });
        }
      },
      fail: (error) => {
        this.setData({
          status: 'warn',
          hintLine1: '获取失败',
          hintLine2: error.message
        });
      },
      complete: () => {
        this.setData({
          requesting: false
        });
      }
    });
  }
});