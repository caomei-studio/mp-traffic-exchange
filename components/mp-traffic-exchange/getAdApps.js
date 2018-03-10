const requestPormises = {};
module.exports = function getAdApps(appId, force) {
    if (!appId) {
        return Promise.reject(new Error('appId不能为空'));
    }
    if (typeof appId !== 'string') {
        return Promise.reject(new Error('appId必须是字符串'));
    }
    if (force || !(appId in requestPormises)) {
        requestPormises[appId] = new Promise((resolve, reject) => {
            wx.request({
                url: 'https://www.xisole.cn/app/ma/list',
                data: {
                    appId,
                },
                success(res) {
                    const { data: { code, data } } = res;
                    if (+code !== 1) {
                        console.error(res.data);
                        requestPormises[appId] = null;
                        reject(new Error('获取推荐小程序失败'));
                        return;
                    }
                    resolve({
                        jumpAppId: data[0].jumpAppId,
                        apps: data,
                    });
                },
                fail(err) {
                    console.error(err);
                    requestPormises[appId] = null;
                    reject(new Error('获取推荐小程序失败'));
                },
            });
        });
    }
    return requestPormises[appId];
};
