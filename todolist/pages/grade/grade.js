const app = getApp();
Page({
  data:{
    array: ['生活', '工作', '学习', '其他',''],
    index: 0,
    name:null,
    context:null,
    label:null,
    num:0,
    datalist:{}
  },
  onLoad:function(){
    this.data.datalist = app.globalData.datalist;
    this.data.num = this.data.datalist.num;
    console.log(this.data.num);
  },
  bindPickerChange: function (e) {
    let that = this;
    that.setData({
      index: e.detail.value
    })
  },
  taskName:function(e){
    let that = this;
    that.setData({
      name:e.detail.value
    })
   
  },
  taskContext:function(e){
    let that = this;
    that.setData({
      context:e.detail.value
    })
    
  },
  setDatalist:function(){
    var that = this;
    if(that.data.name==null){
      wx.showModal({
        title: '',
        content: '任务名不能为空哦！',
        confirmText: "确定",
        cancelText: "取消",

      });
    }
    else{
    var temp = {
      'name':that.data.name,
      "context":that.data.context,
      "label":that.data.array[that.data.index],
      "situation":1,
      "keyname":"task"+that.data.num,
      "num":that.data.num
    };
    var index = temp.keyname;
    that.data.datalist[index] = temp;
    that.data.num++;
    that.data.datalist.num = that.data.num;
    app.globalData.datalist = that.data.datalist;
    app.globalData.num = that.data.num;
    
    wx.setStorage({
      key: 'key',
      data: that.data.datalist,
      success: function (res) {
        wx.navigateTo({
          url: '../index/index',
        })
      }
    })
    }
  }
})
