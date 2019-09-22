Page({
  data: {
    datalist:{},
    options:'',
  },
  //事件处理函数
  onLoad: function (options) {
    var that = this;
    let datalist = getApp().globalData.datalist;
    that.setData({
      datalist: datalist,
      options:options.tasknum
    });
  },
  onHide: function () {
    wx.setStorage({
      key: 'task',
      data: getApp().globalData.datalist,
      success: function (res) {
       //
      }
    })
  },
  finish:function(e){
    var that = this;
    getApp().globalData.datalist[that.data.options].situation = 2;
    wx.navigateTo({
      url: '../index/index',
    })
 },
 delete:function(){
   var that = this;
   delete getApp().globalData.datalist[that.data.options];
   wx.navigateTo({
     url: '../index/index',
   })
   console.log(getApp().globalData.datalist)
 }
})
