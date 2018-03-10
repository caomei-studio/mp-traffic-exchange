const getAdApps = require('./getAdApps');

Component({
    properties: {
        appId: String,
    },
    data: {
        jumpAppId: '',
        apps: [],
        current: 0,
        intervalId: 0,
    },
    attached() {
        getAdApps(this.data.appId)
            .then(({ apps, jumpAppId }) => {
                this.setData({
                    apps,
                    jumpAppId,
                });
                this.startCarousel();
            }, (err) => {
                console.error(err);
            });
    },
    methods: {
        startCarousel() {
            this.stopCarousel();
            this.intervalId = setInterval(() => {
                const { current, apps } = this.data;
                this.setData({
                    current: (current + 1) % apps.length,
                });
            }, 3e3); // 3s轮播
        },
        stopCarousel() {
            clearInterval(this.intervalId);
        },
        handleTap(e) {
            const { jumpAppId } = this.data;
            const { appId } = e.currentTarget.dataset;
            console.log('jump to %s with appId %s', jumpAppId, appId);
            wx.navigateToMiniProgram({
                appId: jumpAppId,
                extraData: {
                    appId,
                },
            });
        },
    },
    detached() {
        this.stopCarousel();
    },
});
