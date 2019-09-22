// pages/grade/grade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  code:'',
  sid:'',
  score:'',
  cid:'',
  },
  userIdInput:function(e){
    this.data.sid = e.detail.value;
    return this.data.sid;
  },
  classNumberInput:function(e){
    this.data.cid = e.detail.value;
    return this.data.cid;
  },
  RequestData: function () {
   var that = this;
    if ((this.data.sid.length === 0)||(this.data.cid === 0)){
      this.setData({
        infoMess: '温馨提示：id或班号不能为空！'
      })
    } else {
        this.setData({
      infoMess: ''
    })
    
        wx.request({
        url:'http://www.csnoob.cn/api',
        header: {
        'content-type': 'application/json'
        // 默认值
      },
      data: {
        'sid':this.data.sid,
        'cid':this.data.cid,
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        // 操作json数据
      if(res.data.code === 0){
        that.setData({
          score: JSON.stringify(res.data.data.score)
        })
      }
      },
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
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