// let data = require('./pages/authorize/authorize.js')

function login(res) {
    wx.navigateTo({
        url: 'plugin-private://wxc44210f342bb2758/pages/login/login?data=' + res,
        success: function (res) {
            console.log('res', res)
        },
        fail: function (e) {
            console.log('e:', e)
        }

    })
}

module.exports = {
    list: 'pages/login/login',
    login
}