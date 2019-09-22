// plugin/pages/login/login.js
import regeneratorRuntime from '../../utils/third-party/runtime' // eslint-disable-line
import { wxRequest } from '../../utils/wxApi'
import { api } from '../../utils/api'
import { showError } from '../../utils/error'


Page({
    /**
     * 页面的初始数据
     */
    data: {
        account: '17jyzhong2',
        password: 'ASDqwe123',
        Oauthdata: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取Oauth相关参数
        let res = JSON.parse(options.data)
        this.setData({
            Oauthdata: res
        })
        console.log('传入的Oauth参数：', this.data.Oauthdata)
        this.clearStorage()
    },
    // 清除缓存
    clearStorage() {
        wx.removeStorageSync('oauthSession')
        wx.removeStorageSync('authorization_code')
    },
    //
    bindInput(e) {
        this.setData({
            [e.currentTarget.dataset.key]: e.detail.value
        })
    },
    // 账号密码登陆获取登陆接口cookie
    login: async function () {
        console.log('账号：', this.data.account, '密码：', this.data.password)
        let that = this
        let options = {
            url: api.login,
            data: {
                'account': that.data.account,
                'password': that.data.password
            },
            method: 'POST'
        }
        try {
            let res = await wxRequest(options)
            console.log('登陆接口返回信息：', api.login, res)
            switch (res.data.code) {
                case '0':
                    break
                default:
                    console.log('Oauth登录失败,错误码:', res.data.code)
            }
            let oauthSessionKey
            let oauthSessionValue
            let data = JSON.stringify(that.data.Oauthdata)
            try {
                if (res.cookies[0].name && res.cookies[0].value) {
                    oauthSessionKey = res.cookies[0].name
                    oauthSessionValue = res.cookies[0].value
                    console.log('login success')
                    wx.showToast({
                        title: '',
                        icon: 'success',
                        success: function () {
                            // 时效性，全局变量不持久，授权不需要这么久
                            wx.setStorageSync('oauthSession', { oauthSessionKey: oauthSessionKey, oauthSessionValue: oauthSessionValue })
                            wx.redirectTo({ url: 'plugin-private://wxc44210f342bb2758/pages/authorize/authorize?data=' + data })
                        }
                    })
                } else {
                    await showError('登陆失败')
                    console.log('获取session失败')
                }
            } catch (e) {
                await showError('登陆失败')
                console.log('获取session失败', e)
            }
        } catch (e) {
            await showError('登陆失败')
            console.log('Oauth请求失败：', e)
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})