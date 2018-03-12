const requestPormises = {};

/**
 * 获取需要展示的小程序
 * @param {String} appId appId 必填
 * @param {Boolean} force 是否强制请求，如果不填或是false，则使用缓存
 * @return {Promise} 结果, resolve 结果如下
 * {
 *   jumpAppId: '', // 跳转中间小程序
 *   apps: [{ // 需要展示的小程序
 *     appName: '', // 小程序名字
 *     avatarUrl: '', // 小程序logo
 *     appId: '', // 小程序appId
 *   }]
 * }
 */
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
                url: 'https://www.xisole.cn/app/ma/recommend_list',
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
                    console.log("data: ", data);
                    resolve({
                        jumpAppId: data.jumpAppID,
                        apps: data.wxAppVOs,
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
