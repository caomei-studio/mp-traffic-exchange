# mp-traffic-exchange

小程序流量互换示例

## Usage

结合[微信自定义组件](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/), 参考 `pages/example` 使用

## 组件说明

1. 广告组件 `/components/mp-traffic-exchange/ad`

```json
{
    "usingComponents": {
        "mp-traffic-exchange-ad": "../components/mp-traffic-exchange/ad"
    }
}
```

```xml
<!-- 更多示例参考page/example.wxml -->
<mp-traffic-exchange-ad
    appId="wx957c50ff41081cf7"
    style="text-align: right; color: #0f3; background-color: #123;"
></mp-traffic-exchange-ad>
```

<img src="./screenshots/mp-traffic-exchange-ad.jpeg" alt="mp-traffic-exchange-ad.jpeg" width="375px" />

## Other

这项目只是示例, 也可以自己请求接口展示其它小程序广告.

约定以如下方式跳转推荐小程序

```js
 wx.navigateToMiniProgram({
    appId: jumpAppId, // 中间小程序appId, 接口返回
    extraData: {
        appId, // 推荐小程序appId, 接口返回
    },
});
```
