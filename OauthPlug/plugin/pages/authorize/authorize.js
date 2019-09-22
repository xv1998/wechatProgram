// plugin/pages/authorize/authorize.js
import regeneratorRuntime from '../../utils/third-party/runtime' // eslint-disable-line
import { wxRequest } from '../../utils/wxApi'
import { api } from '../../utils/api'
import { showError } from '../../utils/error'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        Oauthdata: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let res = JSON.parse(options.data)
        this.setData({
            Oauthdata: res
        })
    },
    // 授权函数，获取授权码
    authorize: async function () {
        try {
            let that = this
            let json = that.data.Oauthdata
            let oauthSession = wx.getStorageSync('oauthSession')
            console.log('oauthSession', oauthSession)
            if (!oauthSession) {
                await showError('授权失败')
            }
            else {
                let res = await wxRequest({
                    url: api.authorize,
                    data: {
                        'response_type': 'code',
                        'client_id': json.client_id,
                        'state': json.state,
                        'scope': json.scope,
                        'from': 'mini'
                    },
                    header: { cookie: `${oauthSession.oauthSessionKey}=${oauthSession.oauthSessionValue}` },
                    method: 'GET'
                })
                console.log(api.authorize, res)
                switch (res.data.code) {
                    case '0': {
                        wx.showToast({
                            title: '',
                            icon: 'success',
                            success: function () {

                                wx.setStorageSync('authorization_code', res.data.authorization_code)
                                wx.navigateBack({ delta: 1 })
                            }
                        })
                        break
                    }
                    default:
                        await showError('授权失败')
                        console.log('授权失败:错误码:', res.data.code)
                }
            }
        } catch (e) {
            await showError('授权失败')
            console.log('授权失败', e)
        }
    }
})

function getCode() {
    if (wx.getStorageSync('authorization_code')) {
        let code = wx.getStorageSync('authorization_code')
        return code
    }
}

module.exports = {
    getCode: getCode()
}
