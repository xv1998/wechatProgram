import regeneratorRuntime from '../../utils/third-party/runtime' // eslint-disable-line
import { wxRequest } from '../../utils/wxApi'
import { showError } from '../../utils/error'

const myPlugin = requirePlugin('myPlugin')

const app = getApp()

Page({
    data: {
        Oauthdata: '',
        info: ''
    },
    // Oauth查询认证，获取相关参数
    async getOauthData() {
        try {
            let res = await wxRequest({
                url: 'http://139.199.224.230:7002/user/get_oauth_data',
                data: { from: 'mini' },
                method: 'GET'
            })
            console.log('Oauth相关参数：', 'http://139.199.224.230:7002/user/get_oauth_data', res)
            switch (res.data.code) {
                case '0':
                    break
                default:
                    console.log('获取Oauth信息失败,错误码:', res.data.code)
                    await showError('查询认证失败')
            }
            let stateKey
            let stateValue
            try {
                if (res.cookies[0].name && res.cookies[0].value) {
                    stateKey = res.cookies[0].name
                    stateValue = res.cookies[0].value
                    console.log('getOauthData success')
                }
                else {
                    console.log('查询认证获取syllabusSession失败：')
                    await showError('查询认证失败')
                }
            } catch (e) {
                console.log('获取认证接口认证失败：', e)
                await showError('查询认证失败')
            }
            app.globalData.syllabusSession = { stateKey, stateValue }
            return {
                state: res.data.state,
                client_id: res.data.client_id,
                scope: res.data.scope,
                redirect_uri: res.data.redirect_uri
            }
        } catch (e) {
            console.log('查询认证失败：', e)
            await showError('查询认证失败')
        }
    },
    // 重定向url 获得skey
    async getSkey(code, redirect_uri, state) {
        try {
            let res = await wxRequest({
                url: redirect_uri,
                method: 'GET',
                data: { code: code, state: state, from: 'mini' },
                header: { cookie: `${app.globalData.syllabusSession.stateKey}=${app.globalData.syllabusSession.stateValue}` },
            })
            if (res.data.code === '0') {
                return { skey: res.data.skey, refresh_key: res.data.refresh_key }
            }
            else {
                await showError('授权失败')
            }
        } catch (e) {
            await showError('授权失败')
            console.log('获取skey失败：', e)
        }
    },
    // 跳转到登陆插件
    CampusLogin: async function () {
        let res = await this.getOauthData()
        if (res) {
            this.setData({ Oauthdata: res })
            myPlugin.login(JSON.stringify(res))
        } else {
            await showError('查询认证失败')
        }
    },
    // todo 获取code后立刻换skey
    // 获取code 换skey
    async getcode() {

    },
    // 获取用户信息
    async getInfo() {
        let code = myPlugin.getcode
        console.log('authorization_code', code)
        if (!code) {
            await showError('请先登陆')
        } else {
            try {
                let key = await this.getSkey(code, this.data.Oauthdata.redirect_uri, this.data.Oauthdata.state)
                console.log('skey', key)
                let res = await wxRequest({
                    url: 'http://139.199.224.230:7002/user/info',
                    method: 'POST',
                    header: { skey: key }
                })
                if (res.data.code === '0') {
                    this.setData({ info: res.data.user_info })
                }
                else {
                    await showError('获取用户信息失败')
                }
            } catch (e) {
                await showError('获取用户信息失败')
                console.log('获取用户信息失败：', e)
            }
        }
    }
})