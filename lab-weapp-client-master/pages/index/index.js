const lab = require('../../lib/lab');

Page({
    data: {
        labs: [
            { id: 'config', title: '妞宝确认' },
            { id: 'https', title: '妞宝配置' },
            { id: 'session', title: '妞宝登录' },
            { id: 'websocket', title: '妞宝聊天测试' },
            { id: 'game', title: '你是猪我是猪小游戏' }
        ],
        done: lab.getFinishLabs()
    },

    onShow() {
        this.setData({ done: lab.getFinishLabs() });
    },

    clear() {
        lab.clear();
        this.setData({ done: lab.getFinishLabs() });
    }
});