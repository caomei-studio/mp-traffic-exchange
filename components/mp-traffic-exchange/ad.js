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
            }, 4e3); // 4s轮播
        },
        stopCarousel() {
            clearInterval(this.intervalId);
        },
        handleTap(e) {
            const { jumpAppId } = this.data;
            const { appId } = e.currentTarget.dataset;
            let ext = {
                appId: appId
            };
            console.log('jump to ', jumpAppId);
            console.log('appId ', appId);
            wx.navigateToMiniProgram({
                appId: jumpAppId,
                path: "pages/more/more",
                extraData: ext,
            });
        },
    },
    detached() {
        this.stopCarousel();
    },
});
