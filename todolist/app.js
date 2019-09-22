//app.js
App({
  onLaunch: function () {
    var that = this;
    wx.getStorage({
      key: 'key',
      success: function (res) {
        console.log("success")
        console.log(res.data)
        that.globalData.datalist = res.data;
        
        if (that.globalData.datalist.num == null) {
          that.globalData.datalist.num = 0;
        }
      },
      fail: function () {
        console.log('读取key发生错误')
      }
    })
  },
  onHide:function(){
    wx.setStorage({
      key: "key",
      data: this.globalData.datalist,
      success: function () {
        console.log('写入value1成功')
      },
      fail: function () {
        console.log('写入value1发生错误')
      }
    })
  }, 
  globalData: {
    datalist:{},
    num:0
  },

})