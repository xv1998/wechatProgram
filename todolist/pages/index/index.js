var base64 = require("images/base64");
Page({
   data: {
    showView: true,
    datalist:{}
  },
   onLoad: function(options){
    let datalist = getApp().globalData.datalist;
    this.setData({
      icon: base64.icon20,
      datalist: datalist
    });
  },
  onHide:function(){
    wx.setStorage({
      key: 'key',
      data:getApp().globalData.datalist,
      success: function (res) {
        console.log(getApp().globalData.datalist)
      }
    })
  },
   btn:function(){
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  }
  
});

