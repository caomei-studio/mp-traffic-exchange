const getAdApps = require('./getAdApps');

Component({
    properties: {
        appId: String,
    },
    data: {
        apps: [],
        current: 0,
        intervalId: 0,
    },
    attached() {
        getAdApps(this.data.appId)
            .then((apps) => {
                this.setData({
                    apps,
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
    },
    detached() {
        this.stopCarousel();
    },
});
