const app = getApp();
const config = app.config;
const lab = require('../../lib/lab');

const done = config.host != '<请配置访问域名>';


Page({
  data: {
    done,
    status: done ? 'success' : 'waiting',
    host: config.host,
    hintLine1: done ? '确认是妞宝' : '你不是妞宝！',
    hintLine2: done ? '妞宝已锁定' : '请重新配置妞宝！'
  },
  goBack() {
    wx.navigateBack();
  },
  onShow() {
    if (done) {
      lab.finish('config');
    }
  }
});